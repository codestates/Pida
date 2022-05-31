const { Plant, Size, Space, Specie } = require('../models/Index');

module.exports = {
  get: async (req, res) => {
    try {
      const { size, space, species, page } = req.query;

      if (!page) {
        return res.status(400).json({ message: '페이지 번호가 없습니다' });
      }

      // 검색 조건이 없다면 전체 식물 검색으로 인지, 이에 맞는 응답을 보낸다
      if (!size && !space && !species) {
        const { count, rows } = await Plant.findAndCountAll({
          attributes: ['id', 'image', 'name'],
          offset: (page - 1) * 8, //각 페이지 시작할 게시물 번호
          limit: 8, //한 스크롤 당 보여줄 게시물 개수
        });

        if (allPlants) {
          return res.status(200).json({
            data: {
              plantsTotal: count,
              plantsArray: rows,
            },
            message: '전체 식물 정보를 가져왔습니다',
          });
        } else {
          return res
            .status(404)
            .json({ message: '검색 결과 페이지를 찾을 수 없습니다' });
        }
      }

      // 식물 취향 찾기: 세 조건 모두 필수
      if (!size || !space || !species) {
        return res
          .status(400)
          .json({ message: '검색 조건을 다시 확인해주세요' });
      }

      const { count, rows } = await Plant.findAndCountAll({
        attributes: ['id', 'image', 'name'],
        //검색 조건
        include: [
          {
            model: Size,
            attributes: [],
            where: { id: size },
            through: { attributes: [] },
          },
          {
            model: Space,
            attributes: [],
            where: { id: space },
            through: { attributes: [] },
          },
          {
            model: Specie,
            attributes: [],
            where: { id: species },
            through: { attributes: [] },
          },
        ],
        offset: (page - 1) * 8, //각 페이지 시작할 게시물 번호
        limit: 8, //한 스크롤 당 보여줄 게시물 개수
      });

      console.log('검색 결과', count, rows);

      return res.status(200).json({
        data: {
          plantsTotal: count,
          plantsArray: rows,
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
