const { User, Interior } = require('../../models/Index');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res, next) => {
  try {
    const { id: postId } = req.params;
    if (!postId) {
      return res
        .status(400)
        .json({ message: '인테리어 게시글 수정에 실패했습니다' });
    }
    const { content: newContent } = req.body;

    //만약에 기존 이미지는 안 바꾸고 글만 수정요청을 보냈다면 글만 업데이트 하고 돌려보낸다.
    if (req.body.image && req.file === undefined) {
      console.log('이미지 안 바꾸고 글만 바꿔서 보냄');
      await Interior.update(
        {
          content: newContent,
        },
        { where: { id: postId } },
      );

      const { id, userId, nickname, image, content, createdAt } =
        await Interior.findByPk(postId, {
          include: [{ model: User, attributes: ['nickname'] }],
        });

      return res.status(200).json({
        data: {
          id,
          userId,
          nickname,
          image,
          content,
          createdAt,
          isliked: false,
        },
        message: '인테리어 게시글 수정에 성공했습니다',
      });
    }

    //완전 새 이미지로 교체하는 경우 처리.
    //기존에 존재하는 이미지 파일의 이름을 알아낸다.
    const imageUrl = await Interior.findByPk(postId, {
      attributes: ['image'],
    });

    //이미지 주소에서 마지막 슬래시 이후의 문자열이 파일 이름이 된다.
    console.log(imageUrl, '파일주소');
    req.fileName = imageUrl.image.split('.com/')[1];

    //이제 DB테이블 업데이트 해도 된다.
    await Interior.update(
      {
        content: newContent,
        image: req.file.location,
      },
      { where: { id: postId } },
    );

    const { id, userId, nickname, image, content, createdAt } =
      await Interior.findByPk(postId, {
        include: [{ model: User, attributes: ['nickname'] }],
      });

    const data = {
      id,
      userId,
      nickname,
      image,
      content,
      createdAt,
      isliked: false,
    };

    req.data = data;
    next();
  } catch (e) {
    //서버 에러 처리
    console.error(e);
    return res
      .status(500)
      .json({ message: '서버가 인테리어 게시글 수정에 실패했습니다' });
  }
};
