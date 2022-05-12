const Sequelize = require('sequelize');
const {
  Plant,
  Interior,
  Plant_size,
  Plant_space,
  Plant_specie,
} = require('../../models/Index');

module.exports = async (req, res) => {
  try {
    //사용자로부터 게시글에 대한 아이디 정보를 얻는다
    const { id: plantId } = req.params;
    const { order } = req.query;

    //만약에 식물 아이디와 정렬 기준 없으면 400응답
    if (!plantId || !order) {
      return res
        .status(400)
        .json({ message: '식물 상세정보 로딩에 실패했습니다' });
    }

    //식물 아이디, 이름, 이미지, 설명
    const plantInfo = Plant.findByPk(plantId);
    //식물 크기정보
    //식물 공간정보
    //식물 종류정보
    const size = Plant_size.findAll({ where: { plantId } });
    const space = Plant_space.findAll({ where: { plantId } });
    const species = Plant_specie.findAll({ where: { plantId } });

    //인테리어 아이디, 이미지
    const totalLike =
      '(SELECT COUNT(*) FROM Interior_likes WHERE Interior_likes.interiorId = Interior.id)';
    const interiors = Interior.findAll({
      attributes: ['id', 'image'],
      include: {
        model: Plant,
        attributes: [],
        required: true,
        where: { id: plantId },
      },
      order: [
        order === 'likes'
          ? [Sequelize.literal(totalLike), 'DESC']
          : ['createdAt', 'DESC'],
      ],
    });

    Promise.all([plantInfo, interiors, size, space, species])
      .then(([plantInfo, interiors, size, space, species]) => {
        const {
          dataValues: { id, name, description, image },
        } = plantInfo;
        return res.status(200).json({
          data: {
            id,
            plantName: name,
            plantImage: image,
            plantDescription: description,
            plantSize: size.map(el => el.dataValues.sizeId),
            plantSpace: space.map(el => el.dataValues.spaceId),
            plantSpecies: species.map(el => el.dataValues.speciesId),
            interiorsArray: interiors.map(el => el.dataValues),
          },
          message: '식물 상세 정보를 성공적으로 가져왔습니다',
        });
      })
      .catch(console.log);
  } catch (e) {
    // 서버 에러 처리
    console.error(e);
    return res
      .status(500)
      .json({ message: '서버가 식물 상세정보 조회에 실패했습니다' });
  }
};
