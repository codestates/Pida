import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { SignContainer } from '../components/Container';
import { SignButton } from '../components/Button';
import { SignInput } from '../components/Input';
import { Error } from '../components/Error';
import {
  emailValidator,
  pwValidator,
  pwMatchValidator,
} from '../utils/validator';

function Signup() {
  const history = useHistory();
  const [signupInfo, setSignupInfo] = useState({
    email: '',
    password: '',
    rePassword: '',
  });
  const [errorMessage1, setErrorMessage1] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
  const [errorMessage3, setErrorMessage3] = useState('');

  const handleInputValue = key => e => {
    setSignupInfo({ ...signupInfo, [key]: e.target.value });
  };

  const handleSignup = () => {
    if (
      emailValidator(signupInfo.email) === false ||
      pwValidator(signupInfo.password) === false ||
      pwMatchValidator(signupInfo.password, signupInfo.rePassword) === false
    ) {
      if (
        signupInfo.email.length === 0 ||
        emailValidator(signupInfo.email) === false
      ) {
        setErrorMessage1('이메일을 다시 확인해 주세요');
      }
      if (
        signupInfo.password.length === 0 ||
        pwValidator(signupInfo.password) === false
      ) {
        setErrorMessage2(
          '비밀번호는 영어, 숫자 포함 8자 이상 16자 이하로 작성해 주세요',
        );
      }
      if (
        signupInfo.rePassword.length === 0 ||
        pwMatchValidator(signupInfo.password, signupInfo.rePassword) === false
      ) {
        setErrorMessage3('비밀번호가 일치하지 않습니다');
      }
    } else {
      // axios
      //   .post(
      //     `${process.env.REACT_APP_API_URL}/users/signup`,
      //     {
      //       email: signupInfo.email,
      //       password: signupInfo.password,
      //     },
      //     { withCredentials: true },
      //   )
      //   .then(res => {
      history.replace('/');
      window.location.reload(); // 저번엔 그냥 됐는데??
      alert('회원가입이 완료되었습니다'); // 모달로 변경하기
      // })
      // .catch(() => {
      //   setErrorMessage1("이미 존재하는 이메일입니다");
      //   setErrorMessage2("");
      //   setErrorMessage3("");
      // });
    }
  };

  return (
    <SignContainer>
      <div>
        <SignInput
          type="email"
          placeholder="email"
          onChange={handleInputValue('email')}
        />
        <Error>{errorMessage1}</Error>
      </div>
      <div>
        <SignInput
          type="password"
          placeholder="password"
          onChange={handleInputValue('password')}
        />
        <Error>{errorMessage2}</Error>
      </div>
      <div>
        <SignInput
          type="password"
          placeholder="retype"
          onChange={handleInputValue('rePassword')}
        />
        <Error>{errorMessage3}</Error>
      </div>
      <div>
        <SignButton onClick={handleSignup}>회원가입</SignButton>
      </div>
      <div>
        <SignButton>Google로 회원가입</SignButton>
      </div>
    </SignContainer>
  );
}
export default Signup;
