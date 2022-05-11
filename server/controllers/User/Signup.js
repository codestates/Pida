const { User } = require('../../models/Index');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const saltRounds = parseInt(process.env.SALT_ROUNDS);

module.exports = async (req, res) => {
  try {
    //사용자 이메일, 닉네임, 패스워드 가지고 온다
    const { email, nickname, password } = req.body;
    //이메일, 닉네임, 패스워드 하나라도 빠진 경우(유효한 양식이 아닌경우),
    //회원 가입에 실패했다고 응답을 보낸다.
    if (!email || !nickname || !password) {
      return res.status(400).json({ message: '회원가입에 실패하였습니다.' });
    }

    console.log('가입가능');
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword, '암호화된비번');
    await User.update(
      {
        password: hashedPassword,
        nickname,
        emailAuthCode: null,
      },
      { where: { email } },
    );
    const newUser = await User.findOne({ where: { email } });
    delete newUser.dataValues.password;
    delete newUser.dataValues.emailAuthCode;
    console.log(newUser, '누구니?');
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
