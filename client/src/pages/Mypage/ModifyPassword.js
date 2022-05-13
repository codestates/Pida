import React, { useState } from 'react';
import axios from 'axios';
import { SignButton } from '../../components/Button';
import { Error } from '../../components/Div';
import { SignInput } from '../../components/Input';
import { Modal } from '../../components/Modal';
import { pwValidator, pwMatchValidator } from '../../utils/validator';

function ModifyPassword({ handleModifyPasswordModal }) {
  /* 완료 모달 */
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => {
    handleModifyPasswordModal(false); // 비밀번호 변경 모달 닫기 (안에 있는 완료 모달도 닫힘)
  };

  /* 비밀번호 변경 */
  const [modifyPwInfo, setModifyPwInfo] = useState({
    password: '',
    newPassword: '',
    reNewPassword: '',
  });
  const [errorMessage1, setErrorMessage1] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
  const [errorMessage3, setErrorMessage3] = useState('');

  const handleInputValue = key => e => {
    setModifyPwInfo({ ...modifyPwInfo, [key]: e.target.value });
  };

  const handleModifyPassword = () => {
    if (
      modifyPwInfo.password.length === 0 ||
      pwValidator(modifyPwInfo.newPassword) === false ||
      pwMatchValidator(modifyPwInfo.newPassword, modifyPwInfo.reNewPassword) ===
        false
    ) {
      if (modifyPwInfo.password.length === 0) {
        setErrorMessage1('현재 비밀번호를 입력해 주세요');
      }
      if (
        modifyPwInfo.newPassword.length === 0 ||
        pwValidator(modifyPwInfo.newPassword) === false
      ) {
        setErrorMessage2(
          '새 비밀번호는 영어, 숫자 포함 8자 이상 16자 이하로 작성해 주세요',
        );
      }
      if (
        modifyPwInfo.newPassword.length === 0 ||
        pwMatchValidator(
          modifyPwInfo.newPassword,
          modifyPwInfo.reNewPassword,
        ) === false
      ) {
        setErrorMessage3('새 비밀번호가 일치하지 않습니다');
      }
    } else {
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/users/password`,
          {
            oldPassword: modifyPwInfo.password,
            newPassword: modifyPwInfo.newPassword,
          },
          { withCredentials: true },
        )
        .then(res => {
          setIsOpen(true); // 완료 모달
        })
        .catch(() => {
          setErrorMessage1('현재 비밀번호가 일치하지 않습니다');
        });
    }
  };

  return (
    <>
      <div>
        <SignInput
          type="password"
          placeholder="password"
          onChange={handleInputValue('password')}
        />
        <Error>{errorMessage1}</Error>
      </div>
      <div>
        <SignInput
          type="password"
          placeholder="newpassword"
          onChange={handleInputValue('newPassword')}
        />
        <Error>{errorMessage2}</Error>
      </div>
      <div>
        <SignInput
          type="password"
          placeholder="retype"
          onChange={handleInputValue('reNewPassword')}
        />
        <Error>{errorMessage3}</Error>
      </div>
      <div>
        <SignButton onClick={handleModifyPassword}>비밀번호 변경</SignButton>
      </div>
      {isOpen ? (
        <Modal handleModal={handleModal}>비밀번호가 변경되었습니다</Modal>
      ) : null}
    </>
  );
}
export default ModifyPassword;
