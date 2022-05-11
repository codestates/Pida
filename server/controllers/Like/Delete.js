const { Interior_like } = require('../../models/Index');

module.exports = async (req, res) => {
  try {
    const { id: interiorId } = req.params;
    if (!interiorId) {
      return res
        .status(400)
        .json({ message: '플랜테리어 게시글 좋아요 취소에 실패했습니다' });
    }
    await Interior_like.destroy({
      where: { userId: req.id, interiorId },
    });
    return res
      .status(204)
      .json({ message: '플랜테리어 게시글 좋아요를 취소했습니다' });
  } catch (e) {
    //서버 에러 처리
    console.error(e);
    return res.status(500).json({
      message: '서버가 플랜테리어 게시글 좋아요 취소처리에 실패했습니다',
    });
  }
};
