import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UDContainer } from '../components/Container';
import { SignButton, ConfirmButton } from '../components/Button';
import { SignInput } from '../components/Input';
import { Error } from '../components/Error';
import { Modal } from '../components/Modal';
import {
  emailValidator,
  pwValidator,
  pwMatchValidator,
} from '../utils/validator';

function Signup() {
  const history = useHistory();

  /* 완료 모달 */
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  /* 회원가입 */
  const [signupInfo, setSignupInfo] = useState({
    email: '',
    password: '',
    rePassword: '',
    nickname: '',
  });
  const [errorMessage1, setErrorMessage1] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
  const [errorMessage3, setErrorMessage3] = useState('');
  const [errorMessage4, setErrorMessage4] = useState('');

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
      if (signupInfo.nickname.length === 0) {
        setErrorMessage4('닉네임을 적어주세요');
      }
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/users/signup`,
          {
            nickname: signupInfo.nickname,
            email: signupInfo.email,
            password: signupInfo.password,
          },
          { withCredentials: true },
        )
        .then(res => {
          setIsOpen(true); // 성공 모달
          history.replace('/');
          // window.location.reload();
        })
        .catch(() => {
          setErrorMessage1('이미 존재하는 이메일입니다');
          setErrorMessage2('');
          setErrorMessage3('');
        });
    }
  };

  return (
    <UDContainer>
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
        <SignInput
          type="text"
          placeholder="nickname"
          onChange={handleInputValue('nickname')}
        />
        <Error>{errorMessage4}</Error>
      </div>
      <div>
        <SignButton onClick={handleSignup}>회원가입</SignButton>
      </div>
      <div>
        <SignButton>Google로 회원가입</SignButton>
      </div>
      {isOpen ? (
        <Modal handleModal={handleModal}>
          <h3>회원가입에 성공했습니다</h3>
          <ConfirmButton onClick={handleModal}>확인</ConfirmButton>
        </Modal>
      ) : null}
    </UDContainer>
  );
}
export default Signup;
