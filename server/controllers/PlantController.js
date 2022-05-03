const Sequelize = require('sequelize');
const { Plant, Interior } = require('../models/Index');

module.exports = {
  //식물 상세정보 조회: 권한이 없어도 된다.
  get: async (req, res) => {
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
      //두개는 동시에 찾을 수 있도록: 다른 것들도 개선 필요함
      Promise.all([plantInfo, interiors])
        .then(value => {
          const [plantData, interiorData] = value;
          console.log(
            interiorData.map(el => el.dataValues),
            '인테리어 결과물',
          );
          const { id, name, description, image } = plantData.dataValues;
          return res.status(200).json({
            data: {
              id,
              plantName: name,
              plantImage: image,
              plantDescription: description,
              interiorsArray: interiorData.map(el => el.dataValues),
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
  },
};
