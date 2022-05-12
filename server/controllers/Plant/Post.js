const {
  Plant,
  Plant_size,
  Plant_space,
  Plant_specie,
} = require('../../models/Index');

module.exports = async (req, res) => {
  try {
    let { name, description, size, space, species } = req.body;
    //인자 누락 처리
    if (
      !req.file.location ||
      !name ||
      !description ||
      !size ||
      !space ||
      !species
    ) {
      return res
        .status(400)
        .json({ message: '식물 상세정보 등록에 실패했습니다' });
    }
    //중복 등록 방지
    const plant = await Plant.findOne({ where: { name } });
    if (plant) {
      return res.status(409).json({ message: '이미 등록한 식물입니다' });
    }
    //식물 테이블에 등록
    const {
      id,
      name: newName,
      image: newImage,
      description: newDescription,
    } = await Plant.create({
      name,
      description,
      image: req.file.location,
    });

    //카테고리 등록
    const categoryPromises = [];
    size = JSON.parse(size);
    space = JSON.parse(space);
    species = JSON.parse(species);

    for (let i of size) {
      //이 정보를 가지고 plant_sizes 테이블에 등록할 거야.
      const newPlantSize = Plant_size.create({
        plantId: id,
        sizeId: i,
      });
      categoryPromises.push(newPlantSize);
    }
    for (let j of space) {
      const newPlantSpace = Plant_space.create({
        plantId: id,
        spaceId: j,
      });
      categoryPromises.push(newPlantSpace);
    }
    for (let k of species) {
      //이 정보를 가지고 plant_sizes 테이블에 등록할 거야.
      const newPlantSpecies = Plant_specie.create({
        plantId: id,
        speciesId: k,
      });
      categoryPromises.push(newPlantSpecies);
    }

    Promise.all(categoryPromises)
      .then(value => {
        console.log('식물 카테고리 정상 처리 완료');
        //테이블에 정상적 분류 완료
        //식물 정보 반환
        return res.status(201).json({
          data: {
            id,
            name: newName,
            image: newImage,
            description: newDescription,
            size,
            space,
            species,
          },
          message: '식물 상세정보 등록에 성공했습니다',
        });
      })
      .catch(e => console.log('카테고리 등록 실패', e));
  } catch (e) {
    //서버 에러
    console.error(e);
    return res
      .status(500)
      .json({ message: '서버가 식물 상세정보 등록에 실패했습니다.' });
  }
};
