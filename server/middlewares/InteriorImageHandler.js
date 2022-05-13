const s3 = require('../config/s3_interior');
const multer = require('multer');
const multerS3 = require('multer-s3');

module.exports = {
  //이미지 업로드
  interiorPost: multer({
    storage: multerS3({
      s3,
      bucket: 'pida-interior-bucket',
      acl: 'public-read-write',
      contentType: multerS3.AUTO_CONTENT_TYPE, //없으면 안됨
      key: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
      },
      limits: { fileSize: 1000 * 1000 * 3 }, // 최대 10MB(사용자 기준. 1천만 바이트, 약 9.xxMiB)
    }),
  }),

  //이미지 삭제
  delete: (req, res) => {
    s3.deleteObject(
      {
        Bucket: 'pida-interior-bucket',
        Key: req.fileName,
      },
      (err, data) => {
        if (err) {
          throw err;
        }
        // 요청 메서드가 patch 일 때만 응답을 다르게 분기
        if (req.route.stack[0].method === 'patch') {
          return res.status(200).json({
            data: req.data,
            message: '인테리어 게시글 수정에 성공했습니다',
          });
        }
        return res
          .status(204)
          .json({ message: '인테리어 게시글 삭제를 성공했습니다' });
      },
    );
  },
};
