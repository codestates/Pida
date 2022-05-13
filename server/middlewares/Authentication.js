const { verify } = require('jsonwebtoken');
const { User } = require('../models/Index');
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      // 사용자 댓글 수정 삭제 권한을 제한
      if (
        req.originalUrl.includes('/interiors/') &&
        req.route.stack[0].method === 'get'
      ) {
        req.id = 'notLoggedin';
        return next();
      }
      return res
        .status(401)
        .json({ message: '권한이 없습니다' });
    }

    const decoded = verify(accessToken, process.env.ACCESS_SECRET);
    const userInfo = await User.findByPk(decoded.id);

    if (userInfo) {
      req.id = userInfo.dataValues.id;
      if (
        // 관리자 권한 검증: 특정 id 값인지, 지정된 path 인지, 지정한 메서드인지
        req.id !== parseInt(process.env.DB_ADMIN_ID) &&
        req.originalUrl === '/plants' &&
        req.route.stack[0].method !== 'get'
      ) {
        return res
          .status(401)
          .json({ message: '관리자 권한이 없습니다' });
      }
      return next();
    } else {
      return res
        .status(401)
        .json({ message: '권한이 없습니다' });
    }
  } catch (e) {
    // 토큰 검증 실패
    return res
      .status(500)
      .json({ message: '서버가 토큰 검증에 실패했습니다' });
  }
};
