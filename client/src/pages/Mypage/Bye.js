import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { ConfirmButton } from '../../components/Button';
import { Modal } from '../../components/Modal';
function Bye({ handleByeModal }) {
  const history = useHistory();

  /* 완료 모달 */
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => {
    handleByeModal(false); // 회원 탈퇴 모달 닫기 (안에 있는 완료 모달도 닫힘)
  };

  /* 회원 탈퇴 */
  const handleBye = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/users`, {
        withCredentials: true,
      })
      .then(res => {
        axios.post(
          `${process.env.REACT_APP_API_URL}/users/logout`,
          {},
          { withCredentials: true },
        );
      })
      .then(res => {
        setIsOpen(true); // 완료 모달
        history.replace('/');
      });
  };

  return (
    <>
      <h3>정말로 탈퇴하시겠습니까?</h3>
      <span>
        <ConfirmButton onClick={handleModal}>취소</ConfirmButton>
        <ConfirmButton onClick={handleBye}>탈퇴</ConfirmButton>
        {isOpen ? (
          <Modal handleModal={handleModal}>
            <h3>탈퇴되었습니다</h3>
            <ConfirmButton onClick={handleModal}>확인</ConfirmButton>
          </Modal>
        ) : null}
      </span>
    </>
  );
}
export default Bye;
