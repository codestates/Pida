const { Comment, User } = require('../../models/Index');

module.exports = async (req, res) => {
  try {
    const { id: commentId } = req.params;
    const { comment } = req.body;

    if (!commentId || !comment || comment.trim() === '') {
      return res.status(400).json({ message: '댓글 수정에 실패했습니다' });
    }

    //현재 댓글에 있는 사용자의 아이디가 주어진 id와 다른 경우 권한 없음
    const commentToModify = await Comment.findByPk(commentId, {
      attributes: ['userId'],
    });

    if (req.id !== commentToModify.userId) {
      return res.status(401).json({ message: '권한이 없습니다' });
    }

    //수정
    await Comment.update({ comment }, { where: { id: commentId } });

    const {
      userId,
      comment: newComment,
      User: { nickname },
      createdAt,
      updatedAt,
    } = await Comment.findOne({
      where: { id: commentId },
      attributes: ['userId', 'comment', 'createdAt', 'updatedAt'],
      include: [
        {
          model: User,
          attributes: ['nickname'],
          required: true,
        },
      ],
    });

    return res.status(200).json({
      data: {
        commentId,
        userId,
        nickname,
        comment: newComment,
        createdAt,
        updatedAt,
      },
      message: '댓글 수정에 성공했습니다',
    });
  } catch (e) {
    //서버 에러
    console.error(e);
    return res.status(500).json({ message: '서버가 댓글 수정에 실패했습니다' });
  }
};
