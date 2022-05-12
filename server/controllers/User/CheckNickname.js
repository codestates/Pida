const { User } = require('../../models/Index');

module.exports = async (req, res) => {
  try {
    const { nickname } = req.body;
    if (!nickname) {
      return res.status(400).json({ message: '닉네임 값이 없습니다' });
    }

    //닉네임 형식 유효성 검사
    // const regexp = /^[^!@#$%\^&*(\)\-_+={\}[\]\\|:;"'<>?/]{1,8}$/;
    // if (!regexp.test(nickname)) {
    //   return res.status(400).json({
    //     message:
    //       '형식에 맞지 않습니다. 1자 이상 8자 이하의 닉네임인지 다시 확인해주세요. 특수문자가 포함되면 안 됩니다',
    //   });
    // }

    //닉네임을 받아서, DB 에서 사용자가 존재하는지 확인한다,
    const user = await User.findOne({ where: { nickname } });
    if (user) {
      return res
        .status(409)
        .json({ message: '이미 사용중인 닉네임이 존재합니다' });
    }

    return res.status(200).json({ message: '닉네임 중복체크를 통과했습니다.' });
  } catch (e) {
    //서버 에러
    console.error(e);
    return res
      .status(500)
      .json({ message: '서버가 닉네임 중복체크 처리에 실패했습니다' });
  }
};
