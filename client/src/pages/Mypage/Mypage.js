import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { MypageButton, MypageButton2, TButton } from '../../components/Button';
import {
  Container1,
  Container2,
  ContainerRow,
} from '../../components/Container';
import { Error } from '../../components/Div';
import { Modal2, CCModal } from '../../components/Modal';
import Likes from './Likes';
import ModifyPassword from './ModifyPassword';
import Uploads from './Uploads';
import { nicknameValidator } from '../../utils/validator';

const Info = styled.span`
  margin-bottom: 0.5rem;
  font-size: 2rem;
  font-weight: 600;
`;
const ModiInfo = styled.input`
  align-items: center;
  margin-bottom: 0.65rem;
  width: 10rem;
  height: 2rem;
  font-size: 1.4rem;
`;

function Mypage() {
  const history = useHistory();

  const [userInfo, setUserInfo] = useState({
    id: 0,
    email: '',
    nickname: '',
    platformType: 0, // 0이면 일반로그인회원, 1이면 소셜로그인회원
  });
  const [uploadsArray, setUploadsArray] = useState([]);
  const [likesArray, setLikesArray] = useState([]);

  /* 페이지 로드 */
  useEffect(() => {
    getMypage();
  }, []);

  const getMypage = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users`, { withCredentials: true })
      .then(res => {
        setUserInfo({
          ...userInfo,
          id: res.data.data.id,
          email: res.data.data.email,
          nickname: res.data.data.nickname,
          platformType: res.data.data.platformType,
        });
        setUploadsArray(res.data.data.uploads);
        setLikesArray(res.data.data.likes);
      })
      .catch(err => {
        console.log(err);
      });
  };

  /* 닉네임 변경 */
  const [isModifyNickname, setIsModifyNickname] = useState(false);
  const [newNickname, setNewNickname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleModifyNicknameStart = () => {
    setIsModifyNickname(true);
    setNewNickname(userInfo.nickname);
  };
  const handleInputValue = e => {
    setNewNickname(e.target.value);
  };
  const handleModifyNicknameEnd = () => {
    setErrorMessage('');
    if (
      nicknameValidator(newNickname) === false ||
      userInfo.nickname === newNickname
    ) {
      if (nicknameValidator(newNickname) === false) {
        setErrorMessage('공백 없이 1자 이상 12자 이하로 작성해 주세요');
      }
      if (userInfo.nickname === newNickname) {
        setIsModifyNickname(false); // 닉네임 변경사항이 없는 경우 그냥 모달 닫기
      }
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/users/signup/nickname`,
          {
            nickname: newNickname,
          },
          { withCredentials: true },
        )
        .then(res => {
          axios
            .patch(
              `${process.env.REACT_APP_API_URL}/users/nickname`,
              {
                newNickname: newNickname,
              },
              { withCredentials: true },
            )
            .then(res => {
              setUserInfo({
                ...userInfo,
                nickname: newNickname,
              });
              setIsModifyNickname(false);
            });
        })
        .catch(err => {
          setErrorMessage('이미 사용 중인 닉네임입니다');
        });
    }
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
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const handleWithdrawalModal = () => {
    setIsWithdrawalModalOpen(!isWithdrawalModalOpen);
  };
  /* 회원 탈퇴 */
  const handleWithdrawal = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/users`, {
        withCredentials: true,
      })
      .then(res => {
        localStorage.removeItem('loginUserId');
        history.replace('/');
      });
  };

  /* 업로드한 사진 / 좋아요한 사진 각각 보여주기 */
  const [isUploads, setIsUploads] = useState(true);
  const handleUploads = () => {
    setIsUploads(true);
    getMypage();
  };
  const handleLikes = () => {
    setIsUploads(false);
    getMypage();
  };

  return (
    <Container1>
      <Container2>
        <div style={{ paddingTop: '2rem' }}>
          <span style={{ display: 'inline-block' }}>
            {isModifyNickname ? (
              <ContainerRow>
                <ModiInfo value={newNickname} onChange={handleInputValue} />
                <TButton onClick={handleModifyNicknameEnd}>확인</TButton>
                <Error style={{ fontSize: '0.8rem', padding: '0.9rem 0 0 0' }}>
                  {errorMessage}
                </Error>
              </ContainerRow>
            ) : (
              <ContainerRow>
                <Info>{userInfo.nickname}</Info>
                <TButton onClick={handleModifyNicknameStart}>
                  <img
                    src="../../images/modify.png"
                    alt=""
                    style={{
                      width: '0.8rem',
                      padding: '0.5rem 0 0 0.2rem',
                    }}
                  />
                </TButton>
              </ContainerRow>
            )}
            {userInfo.platformType === 0 ? (
              <Info style={{ fontSize: '1.2rem', color: 'rgb(163, 163, 163)' }}>
                {userInfo.email}
              </Info>
            ) : (
              <Info />
            )}
          </span>

          <span
            style={{
              display: 'inline-block',
              display: 'flex',
              float: 'right',
            }}
          >
            {userInfo.platformType === 0 ? (
              <MypageButton onClick={handleModifyPassword}>
                비밀번호변경
              </MypageButton>
            ) : null}
            {isModifyPasswordModalOpen ? (
              <Modal2 handleModal={handleModifyPasswordModal}>
                <ModifyPassword
                  handleModifyPasswordModal={handleModifyPasswordModal}
                />
              </Modal2>
            ) : null}
            <MypageButton onClick={handleWithdrawalModal}>
              회원탈퇴
            </MypageButton>
            {isWithdrawalModalOpen ? (
              <CCModal
                handleModal={handleWithdrawalModal}
                handleAction={handleWithdrawal}
              >
                정말로 탈퇴하시겠습니까?
              </CCModal>
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
            <Uploads uploadsArray={uploadsArray} getMypage={getMypage} />
          ) : (
            <Likes likesArray={likesArray} getMypage={getMypage} />
          )}
        </div>
      </Container2>
    </Container1>
  );
}
export default Mypage;
