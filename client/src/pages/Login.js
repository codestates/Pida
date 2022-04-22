import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SignContainer } from '../components/Container';
import { SignButton } from '../components/Button';
import { SignInput } from '../components/Input';
import { Error } from '../components/Error';
import axios from 'axios';

axios.defaults.withCredentials = true;

function Login() {
  const history = useHistory();
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
      // axios
      //   .post(
      //     `${process.env.REACT_APP_API_URL}/user/login`,
      //     { email: loginInfo.email, password: loginInfo.password },
      //     { withCredentials: true },
      //   )
      // .then(res => {
      history.replace('/');
      alert(`로그인 완료`);
      // })
      // .catch(() => {
      //   setErrorMessage('이메일과 비밀번호를 다시 확인해주세요');
      //   setLoginInfo({
      //     email: '',
      //     password: '',
      //   });
      // });
    }
  };

  return (
    <SignContainer>
      <div>
        <div>
          <SignInput
            type="email"
            placeholder="email"
            onChange={handleLoginInputValue('email')}
          />
        </div>
        <div>
          <SignInput
            type="password"
            placeholder="password"
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
    </SignContainer>
  );
}
export default Login;
