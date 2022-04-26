const { User } = require('../models/Index');
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUNDS);

module.exports = {
  //회원가입
  signup: async (req, res) => {
    try {
      //사용자 이메일, 닉네임, 패스워드 가지고 온다
      const { email, nickname, password } = req.body;
      //이메일, 닉네임, 패스워드 하나라도 빠진 경우(유효한 양식이 아닌경우),
      //회원 가입에 실패했다고 응답을 보낸다.
      if (!email || !nickname || !password) {
        return res.status(400).json({ message: '회원가입에 실패하였습니다.' });
      }
      //이메일을 받아서, DB에서 사용자가 존재하는지 확인한다,
      const userInfo = await User.findOne({ where: { email } });
      if (userInfo) {
        return res
          .status(409)
          .json({ message: '이미 사용중인 이메일이 존재합니다' });
      } else {
        console.log('정보없음');
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(hashedPassword, '암호화된비번');
        const newUser = await User.create({
          email,
          password: hashedPassword,
          nickname,
        });
        delete newUser.dataValues.password;
        return res
          .status(201)
          .json({ data: newUser, message: '회원가입에 성공했습니다' });
      }
    } catch (e) {
      //서버 에러 처리
      console.error(e);
      return res
        .status(500)
        .json({ message: '서버가 회원 가입 처리에 실패했습니다' });
    }
  },
  // //회원정보조회
  // getInfo: async (req, res) => {},
  // //닉네임수정
  // editNickname: async (req, res) => {},
  // //비번수정
  // editPassword: async (req, res) => {},
  //탈퇴
  withdraw: async (req, res) => {
    try {
      //이전의 미들웨어에서 토큰으로 사용자 인증에 성공을 했다.
      //req.id로 사용자 pk 받아서 이거로 해당 사용자 정보를 삭제한다.
      await User.destroy({
        where: {
          id: req.id,
        },
      });
      return res.status(204).json({ message: '회원탈퇴에 성공했습니다' });
    } catch (e) {
      //서버 에러 처리
      console.error(e);
      return res
        .status(500)
        .json({ message: '서버가 회원 탈퇴 처리에 실패했습니다' });
    }
  },
};
