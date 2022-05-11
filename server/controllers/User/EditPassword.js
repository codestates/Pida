const { User } = require('../../models/Index');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const saltRounds = parseInt(process.env.SALT_ROUNDS);

module.exports = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    //만약에 두 값이 모두 주어지지 않았다면 둘 다 달라고 응답
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: '현재 비밀번호와 새 비밀번호 모두 입력해주세요' });
    }
    //두 값 모두 주어졌다.
    //기존의 비밀번호가 DB 상의 비번이랑 일치하지 않는다: 비번 다시 입력하라고 응답
    const userInfo = await User.findOne({ where: { id: req.id } });
    const match = await bcrypt.compare(
      oldPassword,
      userInfo.dataValues.password,
    );

    if (!match) {
      return res
        .status(400)
        .json({ message: '기존 비밀번호가 일치하지 않습니다' });
    }

    //기존 비번 올바르게 입력했음.
    //새로운 비번도 형식에 맞는지 확인한다
    //형식에 맞지 않으면 맞게 입력해달라고 할 것
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    if (!pattern.test(newPassword)) {
      return res
        .status(400)
        .json({ message: '비밀번호를 형식에 맞게 입력해주세요' });
    }
    //형식에 맞으면 업데이트하고 성공 응답 보낼것
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    await User.update(
      { password: hashedPassword },
      {
        where: {
          id: req.id,
        },
      },
    )
      .then(result => {
        console.log('응답 메세지 찍히나??');
        return res
          .status(204)
          .json({ message: '비밀번호 변경에 성공했습니다' });
      })
      .catch(console.log);
  } catch (e) {
    //서버 에러 처리
    console.error(e);
    return res
      .status(500)
      .json({ message: '서버가 비밀번호 변경에 실패했습니다' });
  }
};
