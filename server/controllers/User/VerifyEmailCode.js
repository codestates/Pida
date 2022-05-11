const { User } = require('../../models/Index');

module.exports = async (req, res) => {
  try {
    // eac 받아옴
    const { emailAuthCode } = req.body;

    // 있긴 함? 없으면 400 컷
    if (!emailAuthCode) {
      return res.status(400).json({ message: '인증 코드가 없습니다' });
    }

    // 해당 인증 코드를 가진 가가입 유저를 먼저 찾아옴
    const tempUser = await User.findOne({
      where: { emailAuthCode },
    });

    // 그 친구의 이메일 <- 리턴해줄 수 있도록
    const { email } = await User.findOne({
      attributes: ['email'],
      where: { emailAuthCode },
    });

    if (tempUser) {
      return res.status(200).json({
        data: { email },
        message: '이메일이 인증 되었습니다',
      });
    } else {
      console.log('유저 없어 돌아가 ----------------> ');
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
