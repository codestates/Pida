//이 파일은 IAM 액세스 키와 비밀 키를 가지고 유저의 S3 버킷에 접근하기 위한 파일입니다.
const aws = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_PLANT,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_PLANT,
  region: process.env.AWS_REGION,
});

module.exports = s3;
