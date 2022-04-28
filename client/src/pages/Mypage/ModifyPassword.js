import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UDContainer } from '../../components/Container';
import { SignInput } from '../../components/Input';
import { ConfirmButton, SignButton } from '../../components/Button';
import { Modal, Modal2 } from '../../components/Modal';
import { pwValidator, pwMatchValidator } from '../../utils/validator';

function ModifyPassword({ handleModifyPasswordModal }) {
  const history = useHistory();

  /* 완료 모달 */
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => {
    handleModifyPasswordModal(false); // 비밀번호 변경 모달 닫기 (안에 있는 완료 모달도 닫힘)
  };

  /* 비밀번호 변경 */
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retype, setRetype] = useState('');
  const handlePassword = e => {
    setPassword(e.target.value);
  };
  const handleNewPassword = e => {
    setNewPassword(e.target.value);
  };
  const handleRetype = e => {
    setRetype(e.target.value);
  };
  const handleModifyPassword = () => {
    if (password.length === 0 || pwValidator(password) === false) {
      // setErrorMessage2(
      //   '비밀번호는 영어, 숫자 포함 8자 이상 16자 이하로 작성해 주세요',
      // );
    }
    if (
      newPassword.length === 0 ||
      pwMatchValidator(newPassword, retype) === false
    ) {
      //setErrorMessage3('비밀번호가 일치하지 않습니다');
    }
    //  password가 형식맞는지
    // password랑 repassword랑 같은지
    // 통과라면?
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/users/password`,
        { password: password, newPassword: newPassword },
        { withCredentials: true },
      )
      .then(res => {
        setIsOpen(true); // 완료 모달
      });
  };

  return (
    <UDContainer>
      <div>
        <SignInput
          type="password"
          placeholder="password"
          onChange={handlePassword}
        />
      </div>
      <div>
        <SignInput
          type="password"
          placeholder="newpassword"
          onChange={handleNewPassword}
        />
      </div>
      <div>
        <SignInput
          type="password"
          placeholder="retype"
          onChange={handleRetype}
        />
      </div>
      <div>
        <SignButton onClick={handleModifyPassword}>비밀번호 변경</SignButton>
      </div>
      {isOpen ? (
        <Modal handleModal={handleModal}>
          <h3>비밀번호가 변경되었습니다</h3>
          <ConfirmButton onClick={handleModal}>확인</ConfirmButton>
        </Modal>
      ) : null}
    </UDContainer>
  );
}
export default ModifyPassword;
