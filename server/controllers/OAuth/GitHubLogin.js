require('dotenv').config();
const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const axios = require('axios');
const {
  generateAccessToken,
  sendAccessToken,
} = require('../../middlewares/TokenFunctions');
const { User } = require('../../models/Index');

module.exports = async (req, res) => {
  try {
    // 바디에 authorization 없으면 400 응답
    const { authorizationCode } = req.body;
    if (!authorizationCode) {
      return res
        .status(400)
        .json({ message: '회원가입 및 로그인에 실패했습니다' });
    }
    // 깃허브 인가 서버에 토큰 요청
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

    // 받은 토큰으로 깃허브 사용자 정보 요청
    const userInfo = await axios.get('https://api.github.com/user', {
      headers: {
        authorization: `Bearer ${response.data.access_token}`,
      },
    });

    // 사용자 정보
    const { login } = userInfo.data;
    const user = await User.findOne({
      where: { email: `${login}@github.com` },
    });

    // 위 정보가 현재 사용자 테이블에 존재하지 않을 경우 회원 가입 처리, 로그인 처리
    if (!user) {
      // 닉네임 중복 검사 후 같은 닉네임 존재 시, 닉네임 뒤에 숫자 2 붙이기
      const sameNickUser = await User.findOne({ where: { nickname: login } });
      const newUser = await User.create({
        // 깃허브 계정의 경우 이메일이 없는 경우도 있다.
        // 해당 유저는 소셜 로그인 버튼만 있으면 되므로,
        // 임의 저장 후 마이페이지에서는 생략
        email: `${login}@github.com`,
        nickname: sameNickUser ? `${login}2` : login,
        password: null,
        platformType: 1, //깃허브
        emailVerified: 1,
      });

      // 회원정보 등록 완료했으니 바로 로그인 처리 위해 토큰 발급
      const accessToken = generateAccessToken(newUser.id);

      // 쿠키 전송
      sendAccessToken(res, accessToken);

      // 토큰, 옵션, 메시지 반환
      return res
        .status(201)
        .json({
          data: { userId: newUser.id },
          message: '회원가입 및 로그인에 성공했습니다',
        });
    }

    // 해당 정보가 테이블에 이미 존재할 경우, 즉시 토큰 발급 및 로그인 처리
    const accessToken = generateAccessToken(user.dataValues.id);

    // 쿠키 전송
    sendAccessToken(res, accessToken);

    // 토큰, 옵션, 메시지 반환
    return res
      .status(200)
      .json({
        data: { userId: user.dataValues.id },
        message: '로그인에 성공했습니다',
      });
  } catch (e) {
    // 서버 에러 처리
    console.error(e);
    return res
      .status(401)
      .json({ message: '회원가입 및 로그인에 실패했습니다' });
  }
};
