const { User, Interior, Comment, Interior_like } = require('../../models/Index');
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res) => {
  try {
    // 어떤 게시글을 조회할건지 알아야한다
    const { id: postId } = req.params;
    //만약에 아이디가 주어지지 않는다면 에러 메세지 응답
    if (!postId) {
      return res
        .status(400)
        .json({ message: '인테리어 게시글 조회에 실패했습니다' });
    }
    console.log(req.id, '사용자 아이디');
    console.log(postId, '게시물아이디');

    //편집 가능 여부,
    const Author = await Interior.findByPk(postId, {
      attributes: ['userId'],
    });
    let isEditable = Author.userId === req.id ? true : false;

    //좋아요 여부,
    const isLiked = await Interior_like.findOne({
      where: { userId: req.id, interiorId: postId },
    });

    //게시물에서 게시물 아이디, 유저아이디, 닉네임, 이미지, 내용, 작성시각, 좋아요개수 가지고오기
    const post = await Interior.findAll({
      attributes: {
        include: [
          [
            Sequelize.fn('COUNT', Sequelize.col('Interior_likes.userId')),
            'totalLikes',
          ],
        ],
      },
      include: [
        {
          model: Interior_like,
          attributes: [],
        },
      ],
      group: ['Interior.id'],
      where: { id: postId },
    });

    const nickname = await User.findByPk(post[0].dataValues.userId, {
      attributes: ['nickname'],
    });
    console.log(nickname, '글쓴이 별명');
    //댓글 목록 전체: 현재 댓글에 존재하는 userId가 req.id와 다른 경우, 수정 삭제 권한 없다고 알려주자.: api 수정 필요
    let comments = await Comment.findAll({
      attributes: ['id', 'userId', 'comment'],
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
    });
    comments = comments.map(el => {
      const { id, userId, comment, User } = el;
      return {
        id,
        userId,
        comment,
        nickname: User.dataValues.nickname,
        //댓글 수정 삭제 가능여부
        isEditable: userId === req.id ? true : false,
      };
    });

    res.status(200).json({
      data: {
        id: post[0].dataValues.id,
        isEditable,
        isLiked: !!isLiked,
        userId: post[0].dataValues.userId,
        nickname: nickname.nickname,
        totalLikes: post[0].dataValues.totalLikes,
        image: post[0].dataValues.image,
        content: post[0].dataValues.content,
        createdAt: post[0].dataValues.createdAt,
        comments,
      },
      message: '게시글과 댓글을 가져왔습니다',
    });
  } catch (e) {
    //서버 에러 처리
    console.error(e);
    return res
      .status(500)
      .json({ message: '서버가 인테리어 게시글과 댓글 조회에 실패했습니다' });
  }
}