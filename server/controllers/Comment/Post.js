const { User, Comment } = require('../../models/Index');


module.exports = async (req, res) => {
  try {
    //어떤 게시글에 댓글을 다는지 알아내기
    const { id: commentId } = req.params;
    const { comment: content } = req.body;
    if (!commentId || !content || content.trim() === '') {
      return res.status(400).json({ message: '댓글 달기에 실패했습니다' });
    }
    //사용자 아이디 알아내서, 닉네임 가지고오기
    const nickname = await User.findByPk(req.id, {
      attributes: ['nickname'],
    });

    const newComment = await Comment.create({
      userId: req.id,
      interiorId: commentId,
      comment: content,
    });

    const { id, userId, comment } = newComment.dataValues;
    return res.status(201).json({
      data: {
        id,
        userId,
        nickname: nickname.nickname,
        comment,
      },
      message: '댓글 달기에 성공했습니다',
    });
  } catch (e) {
    //서버 에러
    console.error(e);
    return res
      .status(500)
      .json({ message: '서버가 댓글 작성에 실패했습니다' });
  }
}