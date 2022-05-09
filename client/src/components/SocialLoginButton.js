import React from 'react';
import styled from 'styled-components';
import { SignButton } from './Button';
import { SocialImage } from './Image';

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GithubLogin = () => {
  const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;

  const handleGithubLogin = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${clientId}`,
    );
  };

  return (
    <>
      <SignButton
        onClick={handleGithubLogin}
        style={{ backgroundColor: 'black' }}
      >
        <ButtonDiv>
          <SocialImage src="../images/github.png" alt="github" />
          <span>깃허브 로그인</span>
        </ButtonDiv>
      </SignButton>
    </>
  );
};

export const KakaoLogin = () => {
  const restApiKey = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const redirectUrl = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  const handleKakaoLogin = () => {
    window.location.assign(
      `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUrl}&response_type=code`,
    );
  };

  return (
    <SignButton
      onClick={handleKakaoLogin}
      style={{ backgroundColor: '#F9E000' }}
    >
      <ButtonDiv>
        <SocialImage src="../images/kakao.png" alt="kakao" />
        <span>카카오 로그인</span>
      </ButtonDiv>
    </SignButton>
  );
};
