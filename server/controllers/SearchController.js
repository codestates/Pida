const { Plant, Plant_category } = require('../models/Index');

module.exports = {
  get: async (req, res) => {
    try {
      //사용자 단에서는 3가지 검색 조건을 다 전달한다!
      const { size, space, species } = req.query;

      //만약에 검색 조건 3가지가 모두 전달되지 않았다면 실패 응답을 보낸다.
      if (!size || !space || !species) {
        return res
          .status(400)
          .json({ message: '검색 조건을 다시 확인해주세요' });
      }
      const searchResults = await Plant_category.findAll({
        attributes: [],
        include: {
          model: Plant,
          attributes: ['id', 'name', 'image'],
          required: true,
        },
        where: { size, space, species },
      });
      console.log(
        searchResults.map(el => el.Plant.dataValues),
        '검색결과',
      );
      return res.status(200).json({
        data: {
          plantsTotal: searchResults.length,
          plantsArray: searchResults.map(el => el.Plant.dataValues),
        },
        message: '검색한 게시물들을 가져왔습니다',
      });
    } catch (e) {
      //서버 에러 처리
      console.error(e);
      return res
        .status(500)
        .json({ message: '서버가 검색 결과 조회에 실패했습니다' });
    }
  },
};
