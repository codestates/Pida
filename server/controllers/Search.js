const { Plant, Size, Space, Specie } = require('../models/Index');

module.exports = {
  get: async (req, res) => {
    try {
      const { size, space, species, page } = req.query;

      //예외 처리
      if (!page || !size || !space || !species) {
        return res
          .status(400)
          .json({ message: '검색 조건을 다시 확인해주세요' });
      }

      // 검색 조건이 0번이라면 전체 식물 검색
      if (size === '0' && space === '0' && species === '0') {
        const { count, rows } = await Plant.findAndCountAll({
          attributes: ['id', 'image', 'name'],
          offset: (page - 1) * 12, //각 페이지 시작할 게시물 번호
          limit: 12, //한 스크롤 당 보여줄 게시물 개수
        });

        return res.status(200).json({
          data: {
            plantsTotal: count,
            plantsArray: rows,
          },
          message: '전체 식물 정보를 가져왔습니다',
        });
      }

      //0번 이외의 숫자가 들어오는 경우
      if (size !== '0' && space !== '0' && species !== '0') {
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
          offset: (page - 1) * 12, //각 페이지 시작할 게시물 번호
          limit: 12, //한 스크롤 당 보여줄 게시물 개수
        });

        console.log('검색 결과', count, rows);

        return res.status(200).json({
          data: {
            plantsTotal: count,
            plantsArray: rows,
          },
          message: '검색 결과를 가져왔습니다',
        });
      }
    } catch (e) {
      //서버 에러 처리
      console.error(e);
      return res
        .status(500)
        .json({ message: '서버가 검색 결과 조회에 실패했습니다' });
    }
  },
};
