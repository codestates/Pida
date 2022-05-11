import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { ConfirmButton } from '../../../components/Button';
import { Modal } from '../../../components/Modal';

function DeletePlant(props) {
  const history = useHistory();

  /* 완료 모달 */
  // const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => {
    props.handleDeletePlantModal(false); // 식물 삭제 모달 닫기
  };

  /* 식물 삭제 */
  const handleDeletePlant = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/plants/${props.id}`, {
        withCredentials: true,
      })
      .then(res => {
        // setIsOpen(true);
        alert('식물 삭제 완료');
        history.replace('/search');
      });
  };

  return (
    <>
      <h3>정말로 삭제하시겠습니까?</h3>
      <span>
        <ConfirmButton onClick={handleModal}>취소</ConfirmButton>
        <ConfirmButton onClick={handleDeletePlant}>삭제</ConfirmButton>
        {/* {isOpen ? (
          <Modal handleModal={handleModal}>
            <h3>삭제되었습니다</h3>
            <ConfirmButton onClick={handleModal}>확인</ConfirmButton>
          </Modal>
        ) : null} */}
      </span>
    </>
  );
}
export default DeletePlant;
