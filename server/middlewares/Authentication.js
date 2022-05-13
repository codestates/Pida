const { verify } = require('jsonwebtoken');
const { User } = require('../models/Index');
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      //사용자 댓글 수정 삭제 권한을 제한
      if (
        req.originalUrl.includes('/interiors/') &&
        req.route.stack[0].method === 'get'
      ) {
        req.id = 'notLoggedin';
        return next();
      }

      return res.status(401).json({ message: '권한이 없습니다' });
    }
    const decoded = verify(accessToken, process.env.ACCESS_SECRET);

    const userInfo = await User.findByPk(decoded.id);

    if (userInfo) {
      //토큰 검증에 성공. 사용자 정보 존재
      //만약에 id가 1이 아니고 path가 /plant/이고 메서드가 get이 아니면 관리자 권한이 없습니다 처리
      req.id = userInfo.dataValues.id;
      if (
        req.id !== parseInt(process.env.DB_ADMIN_ID) &&
        req.originalUrl === '/plants' &&
        req.route.stack[0].method !== 'get'
      ) {
        return res.status(401).json({ message: '관리자 권한이 없습니다' });
      }
      return next();
    } else {
      return res.status(401).json({ message: '권한이 없습니다' });
    }
  } catch (e) {
    //토큰 검증에 실패!
    return res.status(500).json({ message: '서버가 토큰 검증에 실패했습니다' });
  }
};
