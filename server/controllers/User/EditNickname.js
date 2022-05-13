const { User } = require('../../models/Index');

module.exports = async (req, res) => {
  try {
    const { newNickname } = req.body;

    if (!regexp.test(newNickname)) {
      return res.status(400).json({
        message:
          '닉네임 변경에 실패했습니다. 1자 이상 8자 이하의 닉네임인지 다시 확인해주세요. 특수문자가 포함되면 안 됩니다',
      });
    }

    const user = await User.findOne({ where: { nickname: newNickname } });
    if (user) {
      return res.status(409).json({
        message: '이미 사용중인 닉네임이 존재합니다',
      });
    }

    await User.update({ nickname: newNickname }, { where: { id: req.id } });

    return res.status(204).json({
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
};
