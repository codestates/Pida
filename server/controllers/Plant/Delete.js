const { Plant } = require('../../models/Index');

module.exports = async (req, res, next) => {
  try {
    const { id: plantId } = req.params;
    if (!plantId) {
      return res
        .status(400)
        .json({ message: '식물 상세정보 삭제에 실패했습니다' });
    }
    const imageUrl = await Plant.findByPk(plantId, {
      attributes: ['image'],
    });
    //이미지 주소에서 마지막 슬래시 이후의 문자열이 파일 이름이 된다.
    console.log(imageUrl, '파일주소');
    req.fileName = imageUrl.image.split('.com/')[1];
    await Plant.destroy({ where: { id: plantId } });
    next();
  } catch (e) {
    //서버 에러
    console.error(e);
    return res
      .status(500)
      .json({ message: '서버가 식물 상세정보 삭제에 실패했습니다.' });
  }
};
