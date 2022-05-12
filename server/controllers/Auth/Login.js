const { User } = require('../../models/Index');
const bcrypt = require('bcrypt');
const {
  generateAccessToken,
  sendAccessToken,
} = require('../../middlewares/TokenFunctions');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res) => {
  try {
    // 로그인에 필요한 정보를 받아와서 정의
    const { email, password } = req.body;

    // 400: 필요 정보 누락 여부에 대한 처리
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: '이메일과 비밀번호를 모두 입력해주세요' });
    }

    // 로그인 시도 유저의 정보가 존재하는지 여부에 대한 쿼리
    const userInfo = await User.findOne({ where: { email } });

    // 404: 로그인 시도 유저의 정보가 없는 경우에 대한 처리
    if (!userInfo) {
      return res
        .status(404)
        .json({ message: '해당 유저가 없습니다' });
    }

    // db 상의 비밀번호와 입력값의 매칭 여부 확인
    const match = await bcrypt.compare(
      password,
      userInfo.dataValues.password,
    );

    // 401: db 상의 비밀번호와 입력값이 불일치할 때의 처리
    if (!match) {
      return res
        .status(401)
        .json({ message: '비밀번호가 일치하지 않습니다' });
    }

    //소셜 로그인 계정인데 로그인 창에 회원정보 입력한건 아닌지 확인.
    if (userInfo.dataValues.platformType !== 0) {
      return res
        .status(403)
        .json({ message: '소셜 계정입니다' });
    }

    // 상기 모든 조건을 통과한 경우,
    // 우선 토큰을 발급하고 cors 옵션을 적용
    const accessToken = generateAccessToken(userInfo.dataValues.id);

    //쿠키 전송
    sendAccessToken(res, accessToken);

    // 201: 최종적으로, 발급한 토큰과 옵션을 메시지와 함께 반환
    return res.status(201).json({
      data: { userId: userInfo.dataValues.id },
      message: '로그인에 성공했습니다',
    });
  } catch (e) {
    // 서버 에러 처리
    console.error(e);
    return res
      .status(500)
      .json({ message: '서버가 로그인 처리에 실패했습니다' });
  }
};
