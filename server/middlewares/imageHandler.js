const s3 = require('../modules/s3');
const multer = require('multer');
const multerS3 = require('multer-s3');

module.exports = {
  //이미지 업로드
  post: multer({
    storage: multerS3({
      s3,
      bucket: 'pida-interior-bucket',
      acl: 'public-read-write',
      contentType: multerS3.AUTO_CONTENT_TYPE, //없으면 안됨
      key: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
      },
      limits: { fileSize: 1000 * 1000 * 10 }, //최대용량 1천만바이트 = 10MB(사용자기준)= 9.xxMiB
    }),
  }),
  /*
  key 속성은 업로드하는 파일이 어떤 이름으로 버킷에 저장되는가에 대한 속성입니다.
버킷에 업로드되는 파일(객체)의 이름은 현재 시각_유저가 업로드한 파일의 이름.이미지 확장자가 됩니다.
  */
  //수정
  //https://stackoverflow.com/questions/21213197/amazon-s3-how-to-perform-crud-operations
  patch: (req, res) => {
    console.log(req.fileName, 's3에서 수정할 파일이름');
    //하나의 파일에 대해 여러번 업로드요청 시 덮어쓴다. 이게 수정의 개념.
    s3.putObject(
      {
        bucket: 'pida-interior-bucket',
        key: req.fileName,
      },
      (err, data) => {
        if (err) {
          throw err;
        }
        //돌아오는 데이터: 여기에는 url없다
        console.log('s3 putObject ', data);
      },
    );
  },
  //이미지 삭제: 파일명은 어떻게 알아내...?
  delete: (req, res) => {
    console.log(req.fileName, 's3에서 삭제할 파일이름');
    s3.deleteObject(
      {
        Bucket: 'pida-interior-bucket',
        Key: req.fileName,
      },
      (err, data) => {
        if (err) {
          throw err;
        }
        //돌아오는 데이터: 여기에는 url없다
        console.log('s3 deleteObject 작동잘됨', data);
        res
          .status(204)
          .json({ message: '인테리어 게시글 삭제를 성공했습니다' });
      },
    );
  },
};
