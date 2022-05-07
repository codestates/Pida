const s3 = require('../config/s3_plant');
const multer = require('multer');
const multerS3 = require('multer-s3');

module.exports = {
  //이미지 업로드
  plantPost: multer({
    storage: multerS3({
      s3,
      bucket: 'pida-plant-info-image-server',
      acl: 'public-read-write',
      contentType: multerS3.AUTO_CONTENT_TYPE, //없으면 안됨
      key: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
      },
      limits: { fileSize: 1000 * 1000 * 3 }, //최대용량 1천만바이트 = 10MB(사용자기준)= 9.xxMiB
    }),
  }),
  /*
  key 속성은 업로드하는 파일이 어떤 이름으로 버킷에 저장되는가에 대한 속성입니다.
버킷에 업로드되는 파일(객체)의 이름은 현재 시각_유저가 업로드한 파일의 이름.이미지 확장자가 됩니다.
  */

  //이미지 삭제
  delete: (req, res) => {
    console.log(req.fileName, 's3에서 교체하거나 삭제할 파일이름');
    s3.deleteObject(
      {
        Bucket: 'pida-plant-info-image-server',
        Key: req.fileName,
      },
      (err, data) => {
        if (err) {
          throw err;
        }
        //돌아오는 데이터: 여기에는 url없다
        console.log('s3 deleteObject 작동잘됨', data);
        //요청 메서드가 patch일때만 응답을 다르게 분기작성
        if (req.route.stack[0].method === 'patch') {
          console.log('수정 요청인 경우 기존 이미지 삭제합니다');
          console.log(req, data, '데이터');
          return res.status(200).json({
            data: req.data,
            message: '식물 상세정보 수정에 성공했습니다',
          });
        }
        return res
          .status(204)
          .json({ message: '식물 상세정보 삭제에 성공했습니다' });
      },
    );
  },
};
