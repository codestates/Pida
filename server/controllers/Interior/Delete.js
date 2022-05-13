const { Interior } = require('../../models/Index');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res, next) => {
  try {
    //id가 없으면 삭제 거부
    const { id: postId } = req.params;
    if (!postId) {
      return res
        .status(400)
        .json({ message: '인테리어 게시글 삭제에 실패했습니다' });
    }

    //id가 주어졌다면 DB 테이블에서 삭제 진행한다.
    //이때 이미지 주소로부터, 삭제할 파일 이름을 알아내야 한다.
    const imageUrl = await Interior.findByPk(postId, {
      attributes: ['image'],
    });

    //이미지 주소에서 마지막 슬래시 이후의 문자열이 파일 이름이 된다.
    req.fileName = imageUrl.image.split('.com/')[1];
    //테이블 상에서 삭제
    await Interior.destroy({ where: { id: postId } });
    next();
  } catch (e) {
    //서버 에러 처리
    console.error(e);
    return res
      .status(500)
      .json({ message: '서버가 인테리어 게시글 삭제에 실패했습니다' });
  }
};
