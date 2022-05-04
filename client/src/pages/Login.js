import React, { useState } from 'react';
import axios from 'axios';
import { SignButton, ConfirmButton } from '../components/Button';
import { UDContainer } from '../components/Container';
import { Error } from '../components/Div';
import { SignInput } from '../components/Input';
import { Modal } from '../components/Modal';
axios.defaults.withCredentials = true;

function Login(props) {
  /* 완료 모달 */
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => {
    props.setIsLoginModalOpen(false); // 로그인 모달 닫기 (완료 모달도 닫힘)
  };

  /* 로그인 */
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginInputValue = key => e => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

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
          setIsOpen(true); // 성공 모달
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
    <UDContainer>
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
      <div>
        <SignButton onClick={handleLogin}>로그인</SignButton>
      </div>
      <div>
        <SignButton>Google로 로그인</SignButton>
      </div>
      {isOpen ? (
        <Modal handleModal={handleModal}>
          <h3>로그인에 성공했습니다</h3>
          <ConfirmButton onClick={handleModal}>확인</ConfirmButton>
        </Modal>
      ) : null}
    </UDContainer>
  );
}
export default Login;
