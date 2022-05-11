const { Comment, User } = require('../../models/Index');

module.exports = async (req, res) => {
  try {
    //어떤 댓글을 수정할지, 어떻게 수정할건지 내용을 받는다
    const { id: commentId } = req.params;
    const { comment } = req.body;
    if (!commentId || !comment || content.trim() === '') {
      return res.status(400).json({ message: '댓글 수정에 실패했습니다' });
    }

    // //수정 권한 확인: 클라단에서 화면에 버튼 안보이게 하자
    // const userId = await Comment.findByPk(commentId, {
    //   attributes: ['userId'],
    // });
    // console.log(userId.dataValues.userId, '댓글쓴사용자아이디');
    // //현재 댓글에 있는 사용자의 아이디가 주어진 id와 다른 경우 권한 없음
    // if (req.id !== userId.dataValues.userId) {
    //   return res.status(401).json({ message: '댓글 수정 권한이 없습니다' });
    // }

    //수정
    await Comment.update({ comment }, { where: { id: commentId } });

    const { dataValues: modifiedComment } = await Comment.findOne({
      where: { id: commentId },
      attributes: ['userId', 'comment'],
      include: {
        model: User,
        attributes: ['nickname'],
        required: true,
      },
    });

    console.log(modifiedComment, '수정된 댓글의 내용');

    return res.status(200).json({
      data: {
        commentId,
        userId: modifiedComment.userId,
        nickname: modifiedComment.User.dataValues.nickname,
        comment: modifiedComment.comment,
      },
      message: '댓글 수정에 성공했습니다',
    });
  } catch (e) {
    //서버 에러
    console.error(e);
    return res
      .status(500)
      .json({ message: '서버가 댓글 수정에 실패했습니다' });
  }
}