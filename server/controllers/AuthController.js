const { User } = require('../models/Index');
const { sign } = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  login: async (req, res) => {
    try {
      // 로그인에 필요한 정보를 받아와서 정의
      const { email, password } = req.body;

      // 400: 필요 정보 누락 여부에 대한 처리
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: '이메일과 비밀번호를 모두 입력해주세요' });
      }

      // 로그인 시도 유저의 정보가 존재하는지 여부에 대한 쿼리
      const userInfo = await User.findOne({ where: { email } });

      // 404: 로그인 시도 유저의 정보가 없는 경우에 대한 처리
      if (!userInfo) {
        return res.status(404).json({ message: '해당 유저가 없습니다' });
      }

      // db 상의 비밀번호와 입력값의 매칭 여부 확인
      const match = await bcrypt.compare(
        password,
        userInfo.dataValues.password,
      );

      // 401: db 상의 비밀번호와 입력값이 불일치할 때의 처리
      if (!match) {
        return res
          .status(401)
          .json({ message: '비밀번호가 일치하지 않습니다' });
      } else {
        // 상기 모든 조건을 통과한 경우,
        // 우선 토큰을 발급하고 cors 옵션을 적용
        const accessToken = sign(
          { id: userInfo.dataValues.id },
          process.env.ACCESS_SECRET,
          { expiresIn: '3d' },
        );
        const options = {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
          domain: '.server.pida.link',
          path: '/',
          // 1 week
          maxAge: 1000 * 60 * 60 * 24 * 7,
        };

        // 201: 최종적으로, 발급한 토큰과 옵션을 메시지와 함께 반환
        return res
          .status(201)
          .cookie('accessToken', accessToken, options)
          .json({
            data: { userId: userInfo.dataValues.id },
            message: '로그인에 성공했습니다',
          });
      }
    } catch (e) {
      // 서버 에러 처리
      console.error(e);
      return res
        .status(500)
        .json({ message: '서버가 로그인 처리에 실패했습니다' });
    }
  },
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
