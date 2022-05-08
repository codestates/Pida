import React, { useState } from 'react';
import axios from 'axios';
import { SignButton, ConfirmButton, CheckButton } from '../components/Button';
import { ContainerRow, UDContainer } from '../components/Container';
import { Error, Message } from '../components/Div';
import { SignupInput, SignupInput2 } from '../components/Input';
import { Modal } from '../components/Modal';
import {
  emailValidator,
  pwValidator,
  pwMatchValidator,
  nicknameValidator,
} from '../utils/validator';
import styled from 'styled-components';

const Div = styled.div`
  border: solid;
  border-radius: 1.6rem;
  padding: 0;
  margin: 0.5rem 0 0.5rem 0;

  @media screen and (max-width: 760px) {
    margin: 0.2rem 0 0.2rem 0;
    border: 0.1rem solid;
  }
`;

function Signup(props) {
  /* 완료 모달 */
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => {
    props.setIsSignupModalOpen(false); // 회원가입 모달 닫기 (완료 모달도 닫힘)
  };

  /* 경고 메세지 */
  const [errorMessage1, setErrorMessage1] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
  const [errorMessage3, setErrorMessage3] = useState('');
  const [errorMessage4, setErrorMessage4] = useState('');

  /* 회원가입 정보 */
  const [signupInfo, setSignupInfo] = useState({
    email: '',
    password: '',
    rePassword: '',
    nickname: '',
  });
  const handleInputValue = key => e => {
    setSignupInfo({ ...signupInfo, [key]: e.target.value });
  };

  /* 이메일, 닉네임 중복체크 */
  const [emailCheck, setEmailCheck] = useState(false);
  const [nicknameCheck, setNicknameCheck] = useState(false);
  const handleEmailCheck = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/users/signup/email`,
        {
          email: signupInfo.email,
        },
        { withCredentials: true },
      )
      .then(res => {
        setEmailCheck(true);
        setErrorMessage1('사용 가능한 이메일입니다');
      })
      .catch(err => {
        setErrorMessage1('사용 불가능한 이메일입니다');
      });
  };
  const handleNicknameCheck = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/users/signup/nickname`,
        {
          nickname: signupInfo.nickname,
        },
        { withCredentials: true },
      )
      .then(res => {
        setNicknameCheck(true);
        setErrorMessage2('사용 가능한 닉네임입니다');
      })
      .catch(err => {
        setErrorMessage2('사용 불가능한 닉네임입니다');
      });
  };

  /* 회원가입 요청 */
  const handleSignup = () => {
    setErrorMessage1('');
    setErrorMessage2('');
    setErrorMessage3('');
    setErrorMessage4('');
    if (
      emailCheck === false ||
      nicknameCheck === false ||
      emailValidator(signupInfo.email) === false ||
      nicknameValidator(signupInfo.nickname) === false ||
      pwValidator(signupInfo.password) === false ||
      pwMatchValidator(signupInfo.password, signupInfo.rePassword) === false
    ) {
      if (emailCheck === false) {
        setErrorMessage1('이메일 중복체크를 해주세요');
      }
      if (nicknameCheck === false) {
        setErrorMessage2('닉네임 중복체크를 해주세요');
      }
      if (emailValidator(signupInfo.email) === false) {
        setErrorMessage1('이메일 형식을 다시 확인해 주세요');
      }
      if (nicknameValidator(signupInfo.nickname) === false) {
        setErrorMessage2(
          '닉네임은 공백 없이 1자 이상 8자 이하로 작성해 주세요',
        );
      }
      if (pwValidator(signupInfo.password) === false) {
        setErrorMessage3(
          '비밀번호는 공백 없이 영어, 숫자 포함 8자 이상 16자 이하로 작성해 주세요',
        );
      }
      if (
        pwMatchValidator(signupInfo.password, signupInfo.rePassword) === false
      ) {
        setErrorMessage4('비밀번호가 일치하지 않습니다');
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
        })
        .catch(err => {
          setErrorMessage4('catch');
        });
    }
  };

  return (
    <>
      <div>
        <Div>
          <ContainerRow>
            <SignupInput
              type="email"
              placeholder="email"
              onChange={handleInputValue('email')}
            />
            <CheckButton onClick={handleEmailCheck}>중복 체크</CheckButton>
          </ContainerRow>
        </Div>
        {emailCheck ? (
          <Message>{errorMessage1}</Message>
        ) : (
          <Error>{errorMessage1}</Error>
        )}
      </div>
      <div>
        <Div>
          <ContainerRow>
            <SignupInput
              type="text"
              placeholder="nickname"
              onChange={handleInputValue('nickname')}
            />
            <CheckButton onClick={handleNicknameCheck}>중복 체크</CheckButton>
          </ContainerRow>
        </Div>
        {nicknameCheck ? (
          <Message>{errorMessage2}</Message>
        ) : (
          <Error>{errorMessage2}</Error>
        )}
      </div>
      <div>
        <Div>
          <ContainerRow>
            <SignupInput2
              type="password"
              placeholder="password"
              onChange={handleInputValue('password')}
            />
          </ContainerRow>
        </Div>
        <Error>{errorMessage3}</Error>
      </div>
      <div>
        <Div>
          <ContainerRow>
            <SignupInput2
              type="password"
              placeholder="retype"
              onChange={handleInputValue('rePassword')}
            />
          </ContainerRow>
        </Div>
        <Error>{errorMessage4}</Error>
      </div>
      <div>
        <SignButton onClick={handleSignup}>회원가입</SignButton>
      </div>
      {isOpen ? (
        <Modal handleModal={handleModal}>
          <h3>회원가입에 성공했습니다</h3>
          <ConfirmButton onClick={handleModal}>확인</ConfirmButton>
        </Modal>
      ) : null}
    </>
  );
}
export default Signup;
