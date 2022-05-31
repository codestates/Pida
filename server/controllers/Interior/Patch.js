const { User, Interior } = require('../../models/Index');

module.exports = async (req, res, next) => {
  try {
    const { id: postId } = req.params;
    const { content: newContent } = req.body;

    if (!postId || !newContent) {
      return res
        .status(400)
        .json({ message: '인테리어 게시글 수정에 실패했습니다' });
    }

    //작성자와 현재 게시글 보고 있는 사람의 id값이 다르면 수정 거부
    const author = await Interior.findByPk(postId, { attributes: ['userId'] });

    if (author.userId !== req.id) {
      return res.status(401).json({ message: '권한이 없습니다' });
    }

    //만약에 기존 이미지는 안 바꾸고 글만 수정요청을 보냈다면 글만 업데이트 하고 돌려보낸다.
    if (req.body.image && req.file === undefined) {
      await Interior.update(
        {
          content: newContent,
        },
        { where: { id: postId } },
      );

      const {
        id,
        userId,
        nickname,
        image,
        content,
        totalLikes,
        createdAt,
        updatedAt,
      } = await Interior.findByPk(postId, {
        include: [{ model: User, attributes: ['nickname'] }],
      });

      return res.status(200).json({
        data: {
          id,
          userId,
          nickname,
          image,
          content,
          totalLikes,
          createdAt,
          updatedAt,
          isliked: false,
        },
        message: '인테리어 게시글 수정에 성공했습니다',
      });
    }

    //이미지도 교체하는 경우

    //예외처리
    if (!req.file.location) {
      return res
        .status(400)
        .json({ message: '인테리어 게시글 수정에 실패했습니다' });
    }

    //기존에 존재하는 이미지 파일의 이름을 알아낸다.
    const imageUrl = await Interior.findByPk(postId, {
      attributes: ['image'],
    });

    //이미지 주소에서 마지막 슬래시 이후의 문자열이 파일 이름이 된다.
    req.fileName = imageUrl.image.split('.com/')[1];

    //이제 DB테이블 업데이트 해도 된다.
    await Interior.update(
      {
        content: newContent,
        image: req.file.location,
      },
      { where: { id: postId } },
    );

    const {
      id,
      userId,
      nickname,
      image,
      content,
      totalLikes,
      createdAt,
      updatedAt,
    } = await Interior.findByPk(postId, {
      include: [{ model: User, attributes: ['nickname'] }],
    });

    const data = {
      id,
      userId,
      nickname,
      image,
      content,
      totalLikes,
      createdAt,
      updatedAt,
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
