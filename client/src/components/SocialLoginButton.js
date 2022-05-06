import React from 'react';
import styled from 'styled-components';
import { SignButton } from './Button';

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GithubLogin = props => {
  const handleGithubLogin = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=2aeb9caabb8cf90ca89c`,
    );
  };

  return (
    <>
      <SignButton
        onClick={handleGithubLogin}
        style={{ backgroundColor: 'black' }}
      >
        <ButtonDiv>
          <img
            src="../images/github.png"
            alt="github"
            style={{ width: '3rem', marginRight: '1rem' }}
          />
          <span>깃허브 로그인</span>
        </ButtonDiv>
      </SignButton>
    </>
  );
};

export const NaverLogin = props => {
  const handleNaverLogin = () => {};

  return (
    <SignButton
      onClick={handleNaverLogin}
      style={{ backgroundColor: '#03C75A' }}
    >
      <ButtonDiv>
        <img
          src="../images/naver.png"
          alt="naver"
          style={{ width: '3rem', marginRight: '1rem' }}
        />
        <span>네이버 로그인</span>
      </ButtonDiv>
    </SignButton>
  );
};
