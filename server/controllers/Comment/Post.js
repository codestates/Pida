const { User, Comment } = require('../../models/Index');

module.exports = async (req, res) => {
  try {
    const { id: interiorId } = req.params;
    const { comment: newComment } = req.body;

    if (!interiorId || !newComment) {
      return res.status(400).json({ message: '댓글 달기에 실패했습니다' });
    }

    const { nickname } = await User.findByPk(req.id, {
      attributes: ['nickname'],
    });

    const { id, userId, comment, createdAt, updatedAt } = await Comment.create({
      userId: req.id,
      interiorId,
      comment: newComment,
    });

    return res.status(201).json({
      data: {
        id,
        userId,
        nickname,
        comment,
        createdAt,
        updatedAt,
      },
      message: '댓글 달기에 성공했습니다',
    });
  } catch (e) {
    //서버 에러
    console.error(e);
    return res.status(500).json({ message: '서버가 댓글 작성에 실패했습니다' });
  }
};
