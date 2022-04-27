const { Plant, Plant_category } = require('../models/Index');

module.exports = async (req, res) => {
  try {
    //사용자 단에서는 3가지 검색 조건을 다 전달한다!
    const { size, space, species } = req.query;

    //만약에 검색 조건 3가지가 모두 전달되지 않았다면 실패 응답을 보낸다.
    if (!size || !space || !species) {
      return res.status(400).json({ message: '검색 조건을 다시 확인해주세요' });
    }
    const searchResults = await Plant_category.findAll({
      include: {
        model: Plant,
        attributes: ['name', 'image'],
        required: true,
      },
      where: { size, space, species },
    });

    console.log('검색결과', searchResults);

    return res.status(200).json({
      data: {
        plantsTotal: searchResults.length,
        PlantsArray: searchResults,
      },
      message: '검색한 게시물들을 가져왔습니다',
    });
    //해당 검색 조건을 이용하여, plants 테이블과 plant_categories 테이블에서 해당하는 식물을 찾아준다.
    // 즉 다음과 같다.
    /*
      select plants.name, plants.image 
      from plants
      join plant_categories
      on plant_categories.plantId = plants.id
      where plant_categories.size = size and 
      plant_categories.space = space and 
      plant_categories.species = species
    */
  } catch (e) {
    //서버 에러 처리
    console.error(e);
    return res
      .status(500)
      .json({ message: '서버가 검색 결과 조회에 실패했습니다' });
  }
};

//의문: 404는 어쩌지? 빼도 될 것 같은데..
//주소를 잘못 보내면 오는 응답이긴 하니 빼도 된다 생각함

//레퍼런스 https://flyingsquirrel.medium.com/sequelize-table-join%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95-34dc1ce4e86f
