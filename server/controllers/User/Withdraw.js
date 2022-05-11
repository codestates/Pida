const { User } = require('../../models/Index');

module.exports = async (req, res) => {
  try {
    //이전의 미들웨어에서 토큰으로 사용자 인증에 성공을 했다.
    //req.id로 사용자 pk 받아서 이거로 해당 사용자 정보를 삭제한다.
    await User.destroy({
      where: {
        id: req.id,
      },
    });
    return res
      .cookie('accessToken', null, { maxAge: 0 })
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
