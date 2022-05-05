const { sign } = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  //토큰을 생성하는 함수
  generateAccessToken: userId => {
    const accessToken = sign({ id: userId }, process.env.ACCESS_SECRET, {
      expiresIn: '3d',
    });
    return accessToken;
  },
  //토큰을 쿠키로 보내주는 함수
  sendAccessToken: (res, accessToken) => {
    const options = {
      // httpOnly: true,
      // sameSite: 'none',
      // secure: true,
      // domain: '.server.pida.link',
      path: '/',
      // 1 week
      maxAge: 1000 * 60 * 60 * 24 * 7,
    };
    return res.cookie('accessToken', accessToken, options);
  },
};
