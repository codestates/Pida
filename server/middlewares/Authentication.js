const { verify } = require('jsonwebtoken');
const { User } = require('../models/Index');
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {

    // const accessToken = req.headers.authorization.split(' ')[1]; //토큰을 요청 헤더에 담아 줄 경우
    // console.log(req.headers.authorization, '헤더');

    const { accessToken } = req.cookies;
    if (!accessToken) {
      return res.status(400).json({ message: '토큰이 존재하지 않습니다' });
    }
    const decoded = verify(accessToken, process.env.ACCESS_SECRET);
    const userInfo = await User.findByPk(decoded.id);
    if (userInfo) {
      //토큰 검증에 성공. 사용자 정보 존재
      req.id = userInfo.dataValues.id;
      return next();
    } else {
      return res.status(400).json({ message: '유효하지 않은 토큰입니다' });
    }
  } catch (e) {
    //토큰 검증에 실패!
    return res.status(400).json({ message: '유효하지 않은 토큰입니다' });
  }
};