import React, { useState } from 'react';
import axios from 'axios';
import { GithubLogin, KakaoLogin } from './SocialLoginButton';
import { SignButton } from '../Button';
import { Error } from '../Div';
import { SignInput } from '../Input';
import { Modal, Modal2 } from '../Modal';

axios.defaults.withCredentials = true;

function Login(props) {
  /* 완료 모달 */
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => {
    props.setIsLoginModalOpen(false); // 로그인 모달 닫기 (완료 모달도 닫힘)
  };

  /* 메세지 */
  const [errorMessage, setErrorMessage] = useState('');

  /* 로그인 정보 */
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const handleLoginInputValue = key => e => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  /* 로그인 요청 */
  const handleLogin = () => {
    if (loginInfo.email === '' || loginInfo.password === '') {
      setErrorMessage('이메일과 비밀번호를 입력하세요');
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/users/login`,
          { email: loginInfo.email, password: loginInfo.password },
          { withCredentials: true },
        )
        .then(res => {
          window.localStorage.setItem('loginUserId', res.data.data.userId); // 아이디 localStorage에 저장
          setIsOpen(true); // 완료 모달 열기
        })
        .catch(() => {
          setErrorMessage('이메일과 비밀번호를 다시 확인해주세요');
          setLoginInfo({
            email: '',
            password: '',
          });
        });
    }
  };

  return (
    <>
      <Modal2 handleModal={props.handleModal}>
        <div>
          <div>
            <SignInput
              type="email"
              placeholder="email"
              value={loginInfo.email}
              onChange={handleLoginInputValue('email')}
            />
          </div>
          <div>
            <SignInput
              type="password"
              placeholder="password"
              value={loginInfo.password}
              onChange={handleLoginInputValue('password')}
            />
          </div>
          <Error>{errorMessage}</Error>
        </div>

        <SignButton onClick={handleLogin}>로그인</SignButton>
        {isOpen ? (
          <Modal handleModal={handleModal}>로그인에 성공했습니다</Modal>
        ) : null}

        <KakaoLogin />
        <GithubLogin />
      </Modal2>
    </>
  );
}
export default Login;
