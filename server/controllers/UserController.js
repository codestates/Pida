const { User, Interior, Interior_like } = require('../models/Index');
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
      //이메일을 받아서, DB 에서 사용자가 존재하는지 확인한다,
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
  getInfo: async (req, res) => {
    try {
      // 401: 유저 인증 통과 여부에 따른 처리
      // if (!유저인증) {
      //   return res
      //     .status(401)
      //     .json({message: '로그인 인증에 실패했습니다'});
      // }

      // console.log('req -----------');
      // console.log(req);

      console.log('id -----------');
      console.log(req.id);


      // Users: 특정 유저 선택 쿼리
      const userInfo = await User.findOne({
        where: { id: req.id },
        attributes: ['id', 'email', 'nickname'],
      });

      /*
      Users - Interiors Join
      어떤 유저(id)인지? + interiors 테이블의 id, image
      const uploads = await User.findAll({
        where: { id: req.id },
        include: [{
          model: Interior,
          attributes: ['id', 'image'],
          required: true,
        }],
      });

      Users - Interior_likes Join
      어떤 유저(id)인지? + interior_likes 테이블의 id, image
      const likes = await User.findAll({
        where: { id: req.id },
        include: [{
          model: Interior_like,
          attributes: ['id', 'image'],
          required: true,
        }],
      });
      */

      /*
      const uploads = await Interior.findAll({
        attributes: ['id', 'image'],
        include: [{
          model: User,
          attributes: ['id'],
          where: {id: req.id},
          required: true,
        }],
      });

      const likes = await Interior_like.findAll({
        attributes: ['id', 'userId', 'interiorId'],
        include: [{
          model: User,
          attributes: ['id'],
          where: {id: req.id},
          required: true,
        }],
      });
      */

      const uploads = await Interior.findAll({
        where: {id: req.id},
        attributes: [],
        include: [{
          model: User,
          attributes: ['id', 'image'],
          through: {
            attributes: ['id'],
          },
          required: true,
        }]
      });

      const likes = await User.findAll({
        where: {id: req.id},
        attributes: [],
        include: [{
          model: Interior,
          attributes: ['id', 'image'],
          through: {
            attributes: ['id'],
          },
          required: true,
        }]
      });

      const { id, email, nickname } = userInfo;

      // 해당 유저가 존재하지 않는 경우
      if (!userInfo) {
        return res
          .status(404)
          .json({ message: '회원 정보 조회에 실패했습니다' });
      } else {
        // 해당 유저가 존재할 경우
        return res
          .status(200)
          .json({
            data: {
              id, email, nickname, uploads, likes,
            },
            message: '회원 정보 조회에 성공했습니다',
          });
      }
    } catch (e) {
      //서버 에러 처리
      console.error(e);
      return res
        .status(500)
        .json({ message: '서버가 회원 정보 조회 서버 에러' });
    }
  },
  // //닉네임수정
  editNickname: async (req, res) => {
    try {
      const { newNickname } = req.body;


      console.log('req ---------------------->')
      console.log(req.id)

      // newNickname 이 정규표현식을 통과하지 못 한다면,
      // 400 을 돌려주고 정지

      // 정규표현식 이스케이프
      const regNickname = /^[^!@#$%\^&*(\)\-_+={\}[\]\\|:;"'<>?/]{1,8}$/;

      if (!regNickname.test(newNickname)) {
        return res
          .status(400)
          .json({ message: '닉네임 변경에 실패했습니다. 8자 이하의 닉네임인지 다시 확인해주세요. 특수문자가 포함되면 안 됩니다.' });
      }

      await User.update(
        { nickname: newNickname },
        { where: { id: req.id } },
      );

      return res
        .status(204)
        .json({
          data: { newNickname },
          message: '닉네임 변경에 성공했습니다',
        });
    } catch (e) {
      //서버 에러 처리
      console.error(e);
      return res
        .status(500)
        .json({ message: '서버가 닉네임 변경에 실패했습니다' });
    }
  },
  // 비번수정
  editPassword: async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;

      if (!oldPassword || !newPassword) {
        return res
          .status(400)
          .json({ message: '기존 비밀번호와 새 비밀번호 모두 입력해주세요' });
      }

      const userPasswordInfo = await User.findOne({
        where: { id: req.id }
      });

      const match = await bcrypt.compare(
        oldPassword,
        userPasswordInfo.dataValues.password
      );

      if (!match) {
        return res
          .status(401)
          .json({ message: '현재 비밀번호를 다시 확인해주세요'});
      }

      const regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;

      if (!regPassword.test(newPassword)) {
        return res
          .status(400)
          .json({ message: '유효하지 않은 비밀번호 양식입니다'});
      }

      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      await User.update(
        { password: hashedPassword },
        { where: { id: req.id } },
      );

      return res
        .status(204)
        .json({message: '비밀번호 변경에 성공했습니다'});

    } catch (e) {
      //서버 에러 처리
      console.error(e);
      return res
        .status(500)
        .json({ message: '서버가 닉네임 변경에 실패했습니다' });
    }
  },
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