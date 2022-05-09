require('dotenv').config();
const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const axios = require('axios');
const {
  generateAccessToken,
  sendAccessToken,
} = require('../middlewares/TokenFunctions');
const { User } = require('../models/Index');

module.exports = {
  //깃허브 로그인 및 회원가입
  githubLogin: async (req, res) => {
    console.log('깃허브 로그인 요청 들어왔습니따');
    try {
      //바디에 authorization 있는지 먼저 확인한다. 없으면 400 응답 코드를 보낸다.
      const { authorizationCode } = req.body;
      console.log(authorizationCode, '깃허브에게 보낼 권한코드');
      if (!authorizationCode) {
        return res
          .status(400)
          .json({ message: '로그인 및 회원가입에 실패했습니다.' });
      }
      //깃허브 인가 서버에 토큰 요청
      const response = await axios.post(
        `https://github.com/login/oauth/access_token`,
        {
          client_id: clientID,
          client_secret: clientSecret,
          code: authorizationCode,
        },
        {
          headers: {
            accept: `application/json`,
          },
        },
      );
      //받은 토큰으로 깃허브 사용자 정보 요청
      const userInfo = await axios.get('https://api.github.com/user', {
        headers: {
          authorization: `Bearer ${response.data.access_token}`,
        },
      });
      //사용자 정보 구조분해 할당
      console.log(userInfo, '깃헙에서 받은 사용자정보');
      const { login } = userInfo.data;
      const user = await User.findOne({
        where: { email: `${login}@github.com` },
      });

      //위 정보가 현재 사용자 테이블에 존재하지 않을 경우 회원 가입 처리, 로그인 처리
      if (!user) {
        //닉네임 중복 검사 후 같은 닉네임 존재 시, 닉네임 뒤에 숫자 2 붙이자.
        const sameNickUser = await User.findOne({ where: { nickname: login } });
        console.log(
          sameNickUser,
          '기존 가입자 중 같은 닉넴 가진 사용자가 있니?',
        );
        const newUser = await User.create({
          email: `${login}@github.com`, //이메일이 있는 경우도 있고, 없는 경우도 있다. 그렇지만, 깃허브 사용자는 소셜 로그인 버튼만 있으면 되니까 임의로 저장하고 마이페이지에선 정보 생략하자.
          nickname: sameNickUser ? `${login}2` : login,
          password: null,
          platformType: 1, //깃허브
        });
        console.log(newUser, '등록된 사용자 정보');
        //회원정보 등록 완료했으니 바로 토큰 발급해주자.
        const accessToken = generateAccessToken(newUser.id);
        //쿠키 전송
        sendAccessToken(res, accessToken);

        // 201: 최종적으로, 발급한 토큰과 옵션을 메시지와 함께 반환
        return res.status(201).json({
          data: { userId: newUser.id },
          message: '회원가입 및 로그인에 성공했습니다',
        });
      }

      console.log('기존에 등록된 소셜계정사용자', user);
      //위 정보가 테이블에 존재하고 있을 경우에는 바로 자체 토큰 발급, 로그인 처리
      const accessToken = generateAccessToken(user.dataValues.id);

      //쿠키 전송
      sendAccessToken(res, accessToken);

      // 200: 최종적으로, 발급한 토큰과 옵션을 메시지와 함께 반환
      return res.status(200).json({
        data: { userId: user.dataValues.id },
        message: '로그인에 성공했습니다',
      });
    } catch (e) {
      // 서버 에러 처리
      console.error(e);
      return res
        .status(401)
        .json({ message: '로그인 및 회원가입에 실패했습니다' });
    }
  },
  //네이버 로그인 및 회원가입
  kakaoLogin: async (req, res) => {
    try {
      // 카카오 로그인 사용을 위한 설정
      const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
      const KAKAO_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
      const redirectUri = 'https://pida.ga/kakaocallback';
      const grantType = 'authorization_code';

      // authorization 확인
      const { authorizationCode } = req.body;
      console.log('kakao login auth code -----------> ', authorizationCode);

      if (!authorizationCode) {
        return res
          .status(400)
          .json({ message: '로그인 및 회원가입에 실패했습니다.' });
      }

      // 카카오에 인가 코드 요청
      const response = await axios.post(
        `https://kauth.kakao.com/oauth/token?code=${authorizationCode}&client_id=${KAKAO_CLIENT_ID}&client_secret=${KAKAO_CLIENT_SECRET}&redirect_uri=${redirectUri}&grant_type=${grantType}`,
        {
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
        },
      );

      // 카카오 토큰 데이터 받아오기
      const userInfo = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
        headers: {
          authorization: `Bearer ${response.data.access_token}`,
        },
      });

      console.log('카카오 로그인 유저 --------------> ', userInfo);

      const { email } = userInfo.data.kakao_account;
      const { nickname } = userInfo.data.properties;
      const user = await User.findOne({ where: { email } });
      console.log(email, nickname, '사용자 이메일 닉네임');
      if (!user) {
        const sameNickUser = await User.findOne({ where: { nickname } });
        console.log(
          sameNickUser,
          '기존 가입자 중 같은 닉넴 가진 사용자가 있니?',
        );

        const newUser = await User.create({
          email: email,
          nickname: sameNickUser ? `${nickname}2` : nickname,
          password: null,
          platformType: 2,
        });

        // note: 카카오 닉네임 이모티콘 등 다른 언어 설정이 필요할 수도 있어 (enb 84?)

        const accessToken = generateAccessToken(newUser.id);
        sendAccessToken(res, accessToken);

        return res.status(201).json({
          data: { userId: newUser.id },
          message: '회원가입 및 로그인에 성공했습니다',
        });
      }

      console.log('기존에 등록된 소셜계정사용자', user);
      //위 정보가 테이블에 존재하고 있을 경우에는 바로 자체 토큰 발급, 로그인 처리
      const accessToken = generateAccessToken(user.dataValues.id);

      //쿠키 전송
      sendAccessToken(res, accessToken);

      // 200: 최종적으로, 발급한 토큰과 옵션을 메시지와 함께 반환
      return res.status(200).json({
        data: { userId: user.dataValues.id },
        message: '로그인에 성공했습니다',
      });
    } catch (e) {
      // 서버 에러 처리
      console.error(e);
      return res
        .status(401)
        .json({ message: '로그인 및 회원가입에 실패했습니다' });
    }
  },
};
