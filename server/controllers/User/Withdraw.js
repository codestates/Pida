const { User } = require('../../models/Index');

module.exports = async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.id,
      },
    });
    return res
      .cookie('accessToken', null, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        domain: '.server.pida.link',
        path: '/',
        maxAge: 0,
      })
      .status(204)
      .json({ message: '회원탈퇴에 성공했습니다' });
  } catch (e) {
    //서버 에러 처리
    console.error(e);
    return res
      .status(500)
      .json({ message: '서버가 회원 탈퇴 처리에 실패했습니다' });
  }
};
