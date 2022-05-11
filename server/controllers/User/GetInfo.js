const { User, Interior, Interior_like } = require('../../models/Index');

module.exports = async (req, res) => {
  try {
    // Users: 특정 유저 선택 쿼리
    const userInfo = await User.findOne({
      where: { id: req.id },
      attributes: ['id', 'email', 'nickname', 'platformType'],
    });

    //사용자가 업로드한 글 모아보기
    const uploads = await Interior.findAll({
      attributes: ['id', 'image'],
      where: { userId: req.id },
    });
    console.log(
      uploads.map(el => el.dataValues),
      '업로드한글',
    );
    //사용자가 좋아요한 글 모아보기
    const likes = await Interior.findAll({
      attributes: ['id', 'image'],
      include: [
        {
          model: User,
          attributes: [],
        },
        {
          model: User,
          attributes: [],
          through: Interior_like,
          where: { id: req.id },
        },
      ],
    });
    const { id, email, nickname, platformType } = userInfo;

    // 해당 유저가 존재하지 않는 경우
    if (!userInfo) {
      return res.status(404).json({ message: '회원 정보 조회에 실패했습니다' });
    } else {
      // 해당 유저가 존재할 경우
      return res.status(200).json({
        data: {
          id,
          email,
          nickname,
          platformType,
          uploads,
          //문제의 코드 수정
          likes: likes.map(el => el.dataValues),
        },
        message: '회원 정보 조회에 성공했습니다',
      });
    }
  } catch (e) {
    //서버 에러 처리
    console.error(e);
    return res.status(500).json({ message: '서버가 회원 정보 조회 서버 에러' });
  }
};
