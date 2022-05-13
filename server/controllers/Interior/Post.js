const { User, Interior } = require('../../models/Index');

module.exports = async (req, res) => {
  try {
    const { id: plantId } = req.params;
    const { content } = req.body;

    if (!plantId || !req.file.location || !content) {
      return res
        .status(400)
        .json({ message: '인테리어 게시글 업로드에 실패했습니다' });
    }

    //게시글 생성
    const newPost = Interior.create({
      userId: req.id,
      plantId,
      content,
      image: req.file.location,
    });

    //사용자 닉네임
    const { nickname } = User.findByPk(req.id, { attributes: ['nickname'] });

    Promise.all([newPost, nickname])
      .then(([{ id, userId, image, content, createdAt }, nickname]) => {
        return res.status(201).json({
          data: {
            id,
            userId,
            image,
            content,
            createdAt,
            nickname,
            isliked: false,
          },
          message: '인테리어 게시글 업로드에 성공했습니다',
        });
      })
      .catch(console.log);
  } catch (e) {
    //서버 에러 처리
    console.error(e);
    return res
      .status(500)
      .json({ message: '서버가 인테리어 게시글 업로드에 실패했습니다' });
  }
};
