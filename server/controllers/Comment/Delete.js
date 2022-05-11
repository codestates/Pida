const { Comment } = require('../../models/Index');

module.exports = async (req, res) => {
  try {
    //사용자로부터 어떤 댓글을 지울지에 대한 정보를 받아야 한다.
    //댓글의 아이디 값을 받는다.
    const { id: commentId } = req.params;
    if (!commentId) {
      return res.status(400).json({ message: '댓글 삭제에 실패했습니다' });
    }

    // //삭제 권한 확인: 클라단에서 화면에 버튼 안보이게 하자
    // const userId = await Comment.findByPk(commentId, {
    //   attributes: ['userId'],
    // });
    // console.log(userId.dataValues.userId, '댓글쓴사용자아이디');
    // //현재 댓글에 있는 사용자의 아이디가 주어진 id와 다른 경우 권한 없음
    // if (req.id !== userId.dataValues.userId) {
    //   return res.status(401).json({ message: '댓글 삭제 권한이 없습니다' });
    // }

    await Comment.destroy({ where: { id: commentId } });
    return res.status(204).json({ message: '댓글 삭제를 성공했습니다' });
  } catch (e) {
    //서버 에러 처리
    console.error(e);
    return res
      .status(500)
      .json({ message: '서버가 댓글 삭제에 실패했습니다' });
  }
}