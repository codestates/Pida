const {
  User,
  Interior,
  Comment,
  Interior_like,
} = require('../../models/Index');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res) => {
  try {
    const { id: postId } = req.params;

    //만약에 아이디가 주어지지 않는다면 에러 메세지 응답
    if (!postId) {
      return res
        .status(400)
        .json({ message: '인테리어 게시글 조회에 실패했습니다' });
    }

    const { id, userId, image, content, totalLikes, createdAt, updatedAt } =
      await Interior.findByPk(postId);

    //닉네임
    const user = User.findByPk(userId, {
      attributes: ['nickname'],
    });

    //수정 삭제 가능 여부
    const interior = Interior.findByPk(postId, {
      attributes: ['userId'],
    });

    //좋아요 여부
    const isLiked = Interior_like.findOne({
      where: { userId: req.id, interiorId: postId },
    });

    //댓글 목록 전체
    let comments = Comment.findAll({
      attributes: ['id', 'userId', 'comment', 'createdAt'],
      include: [
        {
          model: Interior,
          attributes: [],
          required: true,
          where: { id: postId },
        },
        {
          model: User,
          attributes: ['nickname'],
          required: true,
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    Promise.all([user, interior, isLiked, comments]).then(
      ([{ nickname }, interior, isLiked, comments]) => {
        comments = comments.map(el => {
          const { id, userId, comment, User } = el;
          return {
            id,
            userId,
            comment,
            nickname: User.dataValues.nickname,
            isEditable: userId === req.id ? true : false,
            createdAt,
            updatedAt,
          };
        });

        return res.status(200).json({
          data: {
            id,
            isEditable: interior.userId === req.id ? true : false,
            isLiked: !!isLiked,
            userId,
            nickname,
            totalLikes,
            image,
            content,
            createdAt,
            updatedAt,
            comments,
          },
          message: '게시글과 댓글을 가져왔습니다',
        });
      },
    );
  } catch (e) {
    //서버 에러 처리
    console.error(e);
    return res
      .status(500)
      .json({ message: '서버가 인테리어 게시글과 댓글 조회에 실패했습니다' });
  }
};
