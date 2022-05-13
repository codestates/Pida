const { Comment } = require('../../models/Index');

module.exports = async (req, res) => {
  try {
    const { id: commentId } = req.params;

    if (!commentId) {
      return res.status(400).json({ message: '댓글 삭제에 실패했습니다' });
    }

    //현재 댓글에 있는 사용자의 아이디가 주어진 id와 다른 경우 권한 없음
    const userId = await Comment.findByPk(commentId, {
      attributes: ['userId'],
    });

    if (req.id !== userId.dataValues.userId) {
      return res.status(401).json({ message: '권한이 없습니다' });
    }

    await Comment.destroy({ where: { id: commentId } });

    return res.status(204).json({ message: '댓글 삭제를 성공했습니다' });
  } catch (e) {
    //서버 에러 처리
    console.error(e);
    return res.status(500).json({ message: '서버가 댓글 삭제에 실패했습니다' });
  }
};
