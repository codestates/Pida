const { User } = require('../models/Index');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  //로그인
  login: async (req, res) => {},
  //로그아웃
  logout: async (req, res) => {
    try {
      return res
        .status(200)
        .cookie('accessToken', null, { maxAge: 0 })
        .json({ message: '로그아웃에 성공했습니다' });
    } catch (e) {
      console.error(e);
      return res
        .status(500)
        .json({ message: '서버가 로그아웃 요청 처리에 실패했습니다' });
    }
  },
};
