const { verify } = require('jsonwebtoken');
const { User } = require('../models/Index');
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    console.log(accessToken, '토큰');
    if (!accessToken) {
      //사용자 댓글 수정 삭제 권한을 제한하기 위함
      if (
        req.originalUrl.includes('/interiors/') &&
        req.route.stack[0].method === 'get'
      ) {
        console.log('로그인 안한 상태에서 게시물과 댓글 조회 요청 들어갑니다');
        req.id = 'notLoggedin';
        return next();
      }
      return res.status(401).json({ message: '권한이 없습니다' });
    }
    const decoded = verify(accessToken, process.env.ACCESS_SECRET);
    console.log(decoded, '해독');
    const userInfo = await User.findByPk(decoded.id);
    console.log(userInfo, '사용자정보');
    if (userInfo) {
      //토큰 검증에 성공. 사용자 정보 존재
      console.log(decoded, accessToken, '토큰검증성공');
      //만약에 id가 1이 아니고 path가 /plant/이고 메서드가 get이 아니면 관리자 권한이 없습니다 처리
      req.id = userInfo.dataValues.id;
      console.log(req.id, '아이디');
      if (
        req.id !== parseInt(process.env.DB_ADMIN_ID) &&
        req.originalUrl.includes('/plants') &&
        req.route.stack[0].method !== 'get'
      ) {
        console.log('관리자 권한 아니야');
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
