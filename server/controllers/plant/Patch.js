const {
  Plant,
  Plant_size,
  Plant_space,
  Plant_specie,
} = require('../../models/Index');

module.exports = async (req, res, next) => {
  try {
    const { id: plantId } = req.params;
    let {
      name: newName,
      description: newDescription,
      size: newSize,
      space: newSpace,
      species: newSpecies,
    } = req.body;

    if (
      !plantId ||
      !newName ||
      !newDescription ||
      !newSize ||
      !newSpace ||
      !newSpecies
    ) {
      return res
        .status(400)
        .json({ message: '식물 상세정보 수정에 실패했습니다' });
    }
    //기존에 존재하는 식물 카테고리 정보는 모두 제거
    await Plant_size.destroy({ where: { plantId } });
    await Plant_space.destroy({ where: { plantId } });
    await Plant_specie.destroy({ where: { plantId } });

    //이미지만 그대로인 경우
    if (req.body.image && req.file === undefined) {
      const promises = [];
      //식물 테이블 업데이트
      const newPlant = Plant.update(
        { name: newName, description: newDescription },
        { where: { id: plantId } },
      );
      promises.push(newPlant);

      //새로운 정보로 채운다.
      newSize = JSON.parse(newSize);
      newSpace = JSON.parse(newSpace);
      newSpecies = JSON.parse(newSpecies);

      for (let i of newSize) {
        const newPlantSize = Plant_size.create({
          plantId,
          sizeId: i,
        });
        promises.push(newPlantSize);
      }
      for (let j of newSpace) {
        const newPlantSpace = Plant_space.create({
          plantId,
          spaceId: j,
        });
        promises.push(newPlantSpace);
      }
      for (let k of newSpecies) {
        const newPlantSpecies = Plant_specie.create({
          plantId,
          speciesId: k,
        });
        promises.push(newPlantSpecies);
      }

      Promise.all(promises)
        .then(value => {
          //테이블에 정상적 분류 완료
          //식물 정보 반환
          console.log('식물정보 수정완료');
          const { id, name, image, description } = newPlant;
          return res.status(201).json({
            data: {
              id,
              name,
              image,
              description,
              size: newSize,
              space: newSpace,
              species: newSpecies,
            },
            message: '식물 상세정보 수정에 성공했습니다',
          });
        })
        .catch(console.log);
    } else {
      //이미지도 교체하는 경우
      const imageUrl = await Plant.findByPk(plantId, {
        attributes: ['image'],
      });
      //이미지 주소에서 마지막 슬래시 이후의 문자열이 파일 이름이 된다.
      req.fileName = imageUrl.image.split('.com/')[1];

      //식물 테이블 업데이트
      await Plant.update(
        {
          name: newName,
          description: newDescription,
          image: req.file.location,
        },
        { where: { id: plantId } },
      );
      const promises = [];

      const newPlant = Plant.findByPk(plantId, {
        attributes: ['id', 'name', 'image', 'description'],
      });
      promises.push(newPlant);
      //새로운 정보로 채운다.
      newSize = JSON.parse(newSize);
      newSpace = JSON.parse(newSpace);
      newSpecies = JSON.parse(newSpecies);

      for (let i of newSize) {
        const newPlantSize = Plant_size.create({
          plantId,
          sizeId: i,
        });
        promises.push(newPlantSize);
      }
      for (let j of newSpace) {
        const newPlantSpace = Plant_space.create({
          plantId,
          spaceId: j,
        });
        promises.push(newPlantSpace);
      }
      for (let k of newSpecies) {
        const newPlantSpecies = Plant_specie.create({
          plantId,
          speciesId: k,
        });
        promises.push(newPlantSpecies);
      }

      Promise.all(promises)
        .then(([value]) => {
          //테이블에 정상적 분류 완료
          //식물 정보 반환
          console.log(value, '프롬이스 처리 후값');
          const {
            dataValues: { id, name, image, description },
          } = value;
          const data = {
            id,
            name,
            image,
            description,
            size: newSize,
            space: newSpace,
            species: newSpecies,
          };
          req.data = data;
          return next();
        })
        .catch(console.log);
    }
  } catch (e) {
    //서버 에러
    console.error(e);
    return res
      .status(500)
      .json({ message: '서버가 식물 상세정보 수정에 실패했습니다.' });
  }
};
