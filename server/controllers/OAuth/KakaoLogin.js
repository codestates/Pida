require('dotenv').config();
const axios = require('axios');
const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
const KAKAO_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const emojiRegex = require('emoji-regex');

const {
  generateAccessToken,
  sendAccessToken,
} = require('../../middlewares/TokenFunctions');
const { User } = require('../../models/Index');

module.exports = async (req, res) => {
  try {
    // 카카오 로그인 사용을 위한 설정
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
    let plainNickname = nickname.replace(emojiRegex(), '');
    const user = await User.findOne({ where: { email } });
    console.log(email, nickname, '사용자 이메일 닉네임');
    if (!user) {
      const sameNickUser = await User.findOne({ where: { nickname: plainNickname } });
      console.log(sameNickUser, '기존 가입자 중 같은 닉넴 가진 사용자가 있니?');

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
};
