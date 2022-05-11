const { User } = require('../../models/Index');

module.exports = async (req, res) => {
  try {
    const { newNickname } = req.body;
    console.log('사용자닉네임', newNickname, '닉네임');

    // newNickname 이 정규표현식을 통과하지 못 한다면,
    // 400 을 돌려주고 정지
    // 정규표현식 이스케이프
    const regNickname = /^[^!@#$%\^&*(\)\-_+={\}[\]\\|:;"'<>?/]{1,8}$/;

    if (!regNickname.test(newNickname)) {
      return res.status(400).json({
        message:
          '닉네임 변경에 실패했습니다. 8자 이하의 닉네임인지 다시 확인해주세요. 특수문자가 포함되면 안 됩니다.',
      });
    }

    const nickname = await User.findOne({ where: { nickname: newNickname } });
    if (nickname) {
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
