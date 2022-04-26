import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { UDContainer } from '../../components/Container';
import { ConfirmButton, SignButton } from '../../components/Button';
import { Modal, Modal2 } from '../../components/Modal';
import {
  GridImage,
  PlantImage,
  PlantName,
  GroupPlant,
} from '../../components/Grid';
import ModifyPassword from './ModifyPassword';
import Bye from './Bye';

function Mypage() {
  const history = useHistory();

  /* 닉네임 변경 모달 */
  const [isModifyNicknameModalOpen, setIsModifyNicknameModalOpen] =
    useState(false);
  const handleModifyNicknameModal = () => {
    setIsModifyNicknameModalOpen(!isModifyNicknameModalOpen);
  };
  const handleModifyNickname = () => {
    setIsModifyNicknameModalOpen(true);
  };

  /* 비밀번호 변경 모달 */
  const [isModifyPasswordModalOpen, setIsModifyPasswordModalOpen] =
    useState(false);
  const handleModifyPasswordModal = () => {
    setIsModifyPasswordModalOpen(!isModifyPasswordModalOpen);
  };
  const handleModifyPassword = () => {
    setIsModifyPasswordModalOpen(true);
  };

  /* 회원 탈퇴 모달 */
  const [isByeModalOpen, setIsByeModalOpen] = useState(false);
  const handleByeModal = () => {
    setIsByeModalOpen(!isByeModalOpen);
  };
  const handleBye = () => {
    setIsByeModalOpen(!isByeModalOpen);
  };

  return (
    <div>
      <MyData>
        <MyName>김코딩</MyName>
        {/* 버튼 누르면 닉네임 변경 모달 뜨게 */}
        <MyEmail>kimcoding@gmail.com</MyEmail>
      </MyData>
      <MyDataButton>
        <MypageButton onClick={handleModifyPassword}>비밀번호수정</MypageButton>
        {isModifyPasswordModalOpen ? (
          <Modal2 handleModal={handleModifyPasswordModal}>
            <ModifyPassword
              handleModifyPasswordModal={handleModifyPasswordModal}
            />
          </Modal2>
        ) : null}

        <MypageButton onClick={handleBye}>회원탈퇴</MypageButton>
        {/* 회원탈퇴 여부 묻고, 탈퇴시 홈으로 보냄 */}
        {isByeModalOpen ? (
          <Modal handleModal={handleByeModal}>
            <Bye handleByeModal={handleByeModal} />
          </Modal>
        ) : null}
      </MyDataButton>

      <UDContainer>
        <ul>
          <MypageHandler>업로드한 사진</MypageHandler>
          <MypageHandler>좋아요</MypageHandler>
        </ul>
        <div>
          <GridImage>
            <GroupPlant>
              <PlantImage src="../images/plant1.png" alt=""></PlantImage>
              <PlantName>빨간꽃</PlantName>
            </GroupPlant>
          </GridImage>
        </div>
      </UDContainer>
    </div>
  );
}
export default Mypage;

const MyData = styled.span`
  display: inline-block;
  margin-bottom: 3rem;
  margin-left: 8rem;
`;
const MyDataButton = styled(MyData)`
  display: flex;
  float: right;
`;

const MyName = styled.div`
  padding-top: 3rem;
  font-size: 2rem;
  font-weight: 600;
`;

const MyEmail = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: rgb(163, 163, 163);
`;

const MypageButton = styled.button`
  background-color: white;
  border-color: transparent;
  border: none;
  padding-top: 3rem;
  padding-right: 2rem;
  font-size: 1rem;
  color: rgb(163, 163, 163);
  font-weight: 600;
  :focus {
    color: black;
  }
`;

const MypageHandler = styled(MypageButton)`
  font-size: 1.2rem;
  padding-right: 7rem;
  padding-left: 7rem;
`;
