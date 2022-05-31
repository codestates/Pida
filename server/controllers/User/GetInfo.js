const Sequelize = require('sequelize');
const { User, Interior, Interior_like } = require('../../models/Index');

module.exports = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.id },
      attributes: ['id', 'email', 'nickname', 'platformType'],
    });

    // 해당 유저가 존재하지 않음
    if (!user) {
      return res.status(404).json({ message: '회원 정보 조회에 실패했습니다' });
    }

    //사용자가 업로드한 글
    const uploads = Interior.findAll({
      attributes: ['id', 'image'],
      where: { userId: req.id },
      order: [['createdAt', 'DESC']],
    });

    //사용자가 좋아요한 글
    const likes = Interior.findAll({
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
      order: [
        [Sequelize.literal('`Users->Interior_likes`.`createdAt`'), 'DESC'],
      ],
    });
    
    //회원정보 응답
    Promise.all([uploads, likes]).then(([uploads, likes]) => {
      const { id, email, nickname, platformType } = user;

      return res.status(200).json({
        data: {
          id,
          email,
          nickname,
          platformType,
          uploads,
          likes: likes.map(el => el.dataValues),
        },
        message: '회원 정보 조회에 성공했습니다',
      });
    });
  } catch (e) {
    //서버 에러 처리
    console.error(e);
    return res
      .status(500)
      .json({ message: '서버가 회원 정보 조회에 실패했습니다' });
  }
};
