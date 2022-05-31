const { Interior, Interior_like } = require('../../models/Index');

module.exports = async (req, res) => {
  try {
    const { id: interiorId } = req.params;

    if (!interiorId) {
      return res
        .status(400)
        .json({ message: '인테리어 게시글 좋아요에 실패했습니다' });
    }
    Interior.increment('totalLikes', {
      by: 1,
      where: { id: interiorId },
    });

    await Interior_like.create({ userId: req.id, interiorId });

    return res
      .status(204)
      .json({ message: '플랜테리어 게시글 좋아요에 성공했습니다' });
  } catch (e) {
    //서버 에러 처리
    console.error(e);
    return res.status(500).json({
      message: '서버가 인테리어 게시글 좋아요에 실패했습니다',
    });
  }
};
