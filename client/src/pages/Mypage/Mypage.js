import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { MypageButton, MypageButton2, TButton } from '../../components/Button';
import { ContainerRow, Container, Form } from '../../components/Container';
import { Modal, Modal2 } from '../../components/Modal';
import Bye from './Bye';
import Likes from './Likes';
import ModifyPassword from './ModifyPassword';
import Uploads from './Uploads';

const Info = styled.span`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;
const ModiInfo = styled.input`
  font-size: 1.4rem;
  width: 10rem;
  height: 2rem;
  align-items: center;
  margin-bottom: 0.65rem;
`;

function Mypage() {
  const history = useHistory();

  /* 페이지 로드 */
  const [userInfo, setUserInfo] = useState({
    id: '',
    email: '',
    nickname: '',
  });
  const [uploadsArray, setUploadsArray] = useState([]);
  const [likesArray, setLikesArray] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/users`, { withCredentials: true })
  //     .then(res => {
  //       setUserInfo({
  //         ...userInfo,
  //         id: res.data.data.id,
  //         email: res.data.data.email,
  //         nickname: res.data.data.nickname,
  //       });
  //       setUploadsArray(res.data.data.uploads);
  //       setLikesArray(res.data.data.likes);
  //     });
  // });

  /* 닉네임 변경 */
  const [isModifyNickname, setIsModifyNickname] = useState(false);
  const handleModifyNicknameStart = () => {
    setIsModifyNickname(true);
  };
  const handleInputValue = e => {
    setUserInfo({
      ...userInfo,
      nickname: e.target.value,
    });
  };
  const handleModifyNicknameEnd = () => {
    setIsModifyNickname(false);
    // axios.patch(
    //   `${process.env.REACT_APP_API_URL}/users/nickname`,
    //   {
    //     newNickname: userInfo.nickname,
    //   },
    //   { withCredentials: true },
    // );
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

  /* 업로드한 사진 / 좋아요한 사진 각각 보여주기 */
  const [isUploads, setIsUploads] = useState(true);
  const handleUploads = () => {
    setIsUploads(true);
  };
  const handleLikes = () => {
    setIsUploads(false);
  };

  return (
    <Container>
      <Form>
        <div style={{ paddingTop: '2rem' }}>
          <span style={{ display: 'inline-block' }}>
            {isModifyNickname ? (
              <ContainerRow>
                <ModiInfo
                  value={userInfo.nickname}
                  onChange={handleInputValue}
                />
                <TButton onClick={handleModifyNicknameEnd}>확인</TButton>
              </ContainerRow>
            ) : (
              <ContainerRow>
                <Info>{userInfo.nickname}</Info>
                <TButton onClick={handleModifyNicknameStart}>
                  <img
                    src="../../images/modify.png"
                    alt=""
                    style={{ width: '0.8rem', padding: '0.5rem 0 0 0.2rem' }}
                  />
                </TButton>
              </ContainerRow>
            )}
            <Info style={{ fontSize: '1.2rem', color: 'rgb(163, 163, 163)' }}>
              ooo@ooo.com{userInfo.email}
            </Info>
          </span>

          <span
            style={{ display: 'inline-block', display: 'flex', float: 'right' }}
          >
            <MypageButton onClick={handleModifyPassword}>
              비밀번호변경
            </MypageButton>
            {isModifyPasswordModalOpen ? (
              <Modal2 handleModal={handleModifyPasswordModal}>
                <ModifyPassword
                  handleModifyPasswordModal={handleModifyPasswordModal}
                />
              </Modal2>
            ) : null}
            <MypageButton onClick={handleBye}>회원탈퇴</MypageButton>
            {isByeModalOpen ? (
              <Modal handleModal={handleByeModal}>
                <Bye handleByeModal={handleByeModal} />
              </Modal>
            ) : null}
          </span>
        </div>

        <ContainerRow
          style={{ justifyContent: 'center', marginBottom: '3rem' }}
        >
          <MypageButton2 onClick={handleUploads}>나의 인테리어</MypageButton2>
          <MypageButton2 onClick={handleLikes}>관심 인테리어</MypageButton2>
        </ContainerRow>
        <div>
          {isUploads ? (
            <Uploads uploadsArray={uploadsArray} />
          ) : (
            <Likes likesArray={likesArray} />
          )}
        </div>
      </Form>
    </Container>
  );
}
export default Mypage;
