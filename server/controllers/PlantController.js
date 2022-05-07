const Sequelize = require('sequelize');
const {
  Plant,
  Interior,
  Plant_size,
  Plant_space,
  Plant_specie,
} = require('../models/Index');

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
  //관리자 권한 하에 사용하는 컨트롤러
  post: async (req, res) => {
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
      //식물 테이블에 등록
      const newPlant = await Plant.create({
        name,
        description,
        image: req.file.location,
      });
      console.log(newPlant.id, '새 식물 아이ㄷ');
      //카테고리 등록
      //반복해서 할 일.
      const categoryPromises = [];
      size = JSON.parse(size);
      space = JSON.parse(space);
      species = JSON.parse(species);
      console.log(size, space, species, '파싱한 식물 분류');
      for (let i of size) {
        console.log('size:', i, '새 식물의id:', newPlant.id); //[1,2]
        //이 정보를 가지고 plant_sizes 테이블에 등록할 거야.
        const newPlantSize = Plant_size.create({
          plantId: newPlant.id,
          sizeId: i,
        });
        categoryPromises.push(newPlantSize);
      }
      for (let j of space) {
        const newPlantSpace = Plant_space.create({
          plantId: newPlant.id,
          spaceId: j,
        });
        categoryPromises.push(newPlantSpace);
      }
      for (let k of species) {
        //이 정보를 가지고 plant_sizes 테이블에 등록할 거야.
        const newPlantSpecies = Plant_specie.create({
          plantId: newPlant.id,
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
              id: newPlant.id,
              name: newPlant.name,
              image: newPlant.image,
              description: newPlant.description,
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
  },
  patch: async (req, res, next) => {
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
      //기존에 존재하는 식물 카테고리 정보는 모두 제거한다.
      await Plant_size.destroy({ where: { plantId } });
      await Plant_space.destroy({ where: { plantId } });
      await Plant_specie.destroy({ where: { plantId } });

      //이미지만 그대로인 경우
      if (req.body.image && req.file === undefined) {
        console.log('이미지만 안 바꿈');

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
          console.log(typeof i, '타입'); //[1,2]
          //이 정보를 가지고 plant_sizes 테이블에 등록할 거야.
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
          //이 정보를 가지고 plant_sizes 테이블에 등록할 거야.
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
            return res.status(201).json({
              data: {
                id: newPlant.id,
                name: newPlant.name,
                image: newPlant.image,
                description: newPlant.description,
                size: newSize,
                space: newSpace,
                species: newSpecies,
              },
              message: '식물 상세정보 수정에 성공했습니다',
            });
          })
          .catch(e => console.log('식물정보 수정 실패', e));
      }

      //이미지도 교체하는 경우
      const imageUrl = await Plant.findByPk(plantId, {
        attributes: ['image'],
      });
      //이미지 주소에서 마지막 슬래시 이후의 문자열이 파일 이름이 된다.
      console.log(imageUrl, '파일주소');
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
        console.log(typeof i, '타입'); //[1,2]
        //이 정보를 가지고 plant_sizes 테이블에 등록할 거야.
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
        //이 정보를 가지고 plant_sizes 테이블에 등록할 거야.
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
          console.log(value[0], '프롬이스 처리 후값');
          const data = {
            id: value[0].id,
            name: value[0].name,
            image: value[0].image,
            description: value[0].description,
            size: newSize,
            space: newSpace,
            species: newSpecies,
          };
          req.data = data;
          return next();
        })
        .catch(console.log);
    } catch (e) {
      //서버 에러
      console.error(e);
      return res
        .status(500)
        .json({ message: '서버가 식물 상세정보 수정에 실패했습니다.' });
    }
  },
  delete: async (req, res, next) => {
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
  },
};
