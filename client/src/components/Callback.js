import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Callback = () => {
  const history = useHistory();

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
    console.log(authorizationCode);
    if (authorizationCode) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/oauth/github`,
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

  return <>로딩중</>;
};

export default Callback;
