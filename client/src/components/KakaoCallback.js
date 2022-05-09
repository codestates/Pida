import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { UDContainer } from './Container';

const KakaoCallback = () => {
  const history = useHistory();

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
    console.log(authorizationCode);
    if (authorizationCode) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/oauth/kakao`,
          { authorizationCode },
          { withCredentials: true },
        )
        .then(res => {
          window.localStorage.setItem('loginUserId', res.data.data.userId); // 아이디 localStorage에 저장
          history.push('/');
          window.location.reload();
        })
        .catch(err => {
          console.log(err);
          console.log('소셜로그인 실패!!');
        });
    }
  }, []);

  return (
    <>
      <UDContainer>
        <img src="../../images/loading.gif" style={{ width: '6rem' }} />
      </UDContainer>
    </>
  );
};

export default KakaoCallback;
