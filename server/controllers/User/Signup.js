const { User } = require('../../models/Index');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const saltRounds = parseInt(process.env.SALT_ROUNDS);

module.exports = async (req, res) => {
  try {
    //사용자 이메일, 닉네임, 패스워드
    const { email, nickname, password } = req.body;

    //이메일, 닉네임, 패스워드 하나라도 빠진 경우 회원 가입에 실패
    if (!email || !nickname || !password) {
      return res.status(400).json({ message: '회원가입에 실패하였습니다.' });
    }

    //이메일 미인증시 가입 불가
    const user = await User.findOne({ where: { email } });
    if (user.emailVerified === 0) {
      return res.status(400).json({ message: '이메일이 인증되지 않았습니다' });
    }

    //모든 조건 다 통과 시 가입
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await User.update(
      {
        password: hashedPassword,
        nickname,
        emailAuthCode: null,
      },
      { where: { email } },
    );

    const { dataValues: newUser } = await User.findOne({ where: { email } });
    delete newUser.password;
    delete newUser.emailAuthCode;

    return res
      .status(201)
      .json({ data: newUser, message: '회원가입에 성공했습니다' });
  } catch (e) {
    //서버 에러 처리
    console.error(e);
    return res
      .status(500)
      .json({ message: '서버가 회원 가입 처리에 실패했습니다' });
  }
};
