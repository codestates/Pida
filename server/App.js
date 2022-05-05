const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/Index');
const { sequelize } = require('./models/Index');

const app = express();
const port = process.env.DEV_PORT || 80;

//cors 옵션 설정
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
//주석!!!!
//데이터베이스 연결
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch(err => {
    console.error(err);
  });

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json()); // json 파싱
app.use(express.urlencoded({ extended: false })); // uri 파싱
app.use(cors(corsOptions));
app.use(cookieParser());

//모든 루트 요청은 indexRouter로!
app.use('/', indexRouter);

//배포 환경에서 정상 응답 받는지 테스트하는 코드
app.get('/', (req, res) => {
  res.send('hello world');
});

//일부러 에러 발생시키기 테스트
app.use((req, res, next) => {
  res.status(404).send('error!!');
});

//서버에러
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: 'Internal Server Error',
    stacktrace: err.toString(),
  });
});

//서버 포트 설정
app.listen(port, () => {
  console.log(`${port}번 포트에서 대기중`);
});
