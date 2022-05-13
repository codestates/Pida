const { sign } = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  // 토큰 생성
  generateAccessToken: userId => {
    const accessToken = sign({ id: userId }, process.env.ACCESS_SECRET, {
      expiresIn: '3d',
    });
    return accessToken;
  },
  // 토큰 전달
  sendAccessToken: (res, accessToken) => {
    const options_dev = {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    };

    const options_prod = {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      domain: '.server.pida.link',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    };

    return res.cookie(
      'accessToken',
      accessToken,
      process.env.DEV_PORT ? options_dev : options_prod,
    );
  },
};
