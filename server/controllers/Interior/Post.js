const { User, Interior } = require('../../models/Index');

const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res) => {
  try {
    //만약에 게시글과 넘어온 파일링크가 하나라도 없으면 작성거부: 클라에서 사전에 차단.
    //문제점: 클라에서 이거 안해줄 경우엔 실패해도 s3에 이미지 올라감..
    const { id: plantId } = req.params;
    const { content } = req.body;
    console.log(
      '식물:',
      plantId,
      '이미지주소',
      req.file.location,
      '내용',
      content,
    );
    if (!plantId || !req.file.location || !content) {
      return res
        .status(400)
        .json({ message: '인테리어 게시글 업로드에 실패했습니다' });
    }
    //다 있을 경우 201	인테리어 게시글 업로드에 성공했습니다.
    //게시글 아이디 및 생성시각
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
            isliked: false, //처음 생성한 게시물이니 좋아요는 초기상태로.
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
