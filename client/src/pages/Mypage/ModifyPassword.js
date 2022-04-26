import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UDContainer } from '../../components/Container';
import { SignInput } from '../../components/Input';
import { ConfirmButton, SignButton } from '../../components/Button';
import { Modal, Modal2 } from '../../components/Modal';

function ModifyPassword({ handleModifyPasswordModal }) {
  const history = useHistory();

  /* 완료 모달 */
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => {
    handleModifyPasswordModal(false); // 비밀번호 변경 모달 닫기 (안에 있는 완료 모달도 닫힘)
  };

  /* 비밀번호 변경 */
  const handleModifyPassword = () => {
    //  password가 형식맞는지
    // password랑 repassword랑 같은지
    // 통과라면?
    // axios
    setIsOpen(true); // 완료 모달
  };

  return (
    <UDContainer>
      <div>
        <SignInput type="password" placeholder="password" />
      </div>
      <div>
        <SignInput type="password" placeholder="newpassword" />
      </div>
      <div>
        <SignInput type="password" placeholder="retype" />
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
