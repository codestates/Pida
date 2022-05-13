const { User } = require('../../models/Index');

module.exports = async (req, res) => {
  try {
    const { emailAuthCode } = req.body;

    //인증코드가 없는 경우
    if (!emailAuthCode) {
      return res.status(400).json({ message: '인증 코드가 없습니다' });
    }

    // 해당 인증 코드를 가진 유저를 먼저 찾아옴
    const tempUser = await User.findOne({
      where: { emailAuthCode },
    });

    //위 유저의 이메일 찾기
    const { email } = await User.findOne({
      attributes: ['email'],
      where: { emailAuthCode },
    });

    //이메일 인증 기록하기
    await User.update({ emailVerified: 1 }, { where: { email } });

    //인증 받고도 아무것도 안하면 20분 이후 삭제
    setTimeout(async () => {
      await User.findOne({ where: { emailAuthCode } }).then(async data => {
        if (data) {
          await User.destroy({ where: { emailAuthCode } });
        }
      });
    }, 20 * 60 * 1000);

    if (tempUser) {
      return res.status(200).json({
        data: { email },
        message: '이메일이 인증 되었습니다',
      });
    } else {
      res.status(401).json({ message: '이메일 인증코드가 유효하지 않습니다' });
    }
  } catch (e) {
    //서버 에러
    console.error(e);
    return res
      .status(500)
      .json({ message: '서버가 이메일 인증 처리에 실패했습니다' });
  }
};
