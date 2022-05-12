const { User } = require('../../models/Index');
const { Op } = require('sequelize');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const appDir = path.dirname(require.main.filename);
const { nanoid } = require('nanoid');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res) => {
  try {
    //사용자로부터 이메일 값을 받는다.
    const { email } = req.body;
    //값이 없으면 없다고 에러 응답
    if (!email) {
      res.status(400).json({ message: '이메일 값이 없습니다' });
    }
    //이메일이 이미 존재하고, 가입된 사용자라면
    const joinedUser = await User.findOne({
      where: { email, emailAuthCode: null },
    });
    if (joinedUser) {
      return res.status(409).json({ message: '이미 가입된 이메일입니다' });
    }

    //이메일이 이미 존재하고, 인증코드가 null이 아니면 DB에 인증코드 새로 만들어서 등록하고 이메일로 보내준다.
    //인증코드 만들기
    const emailAuthCode = Math.random().toString().slice(2, 8);
    const tempNickname = nanoid().slice(0, 8);

    const tempUser = await User.findOne({
      where: { email, emailAuthCode: { [Op.not]: null } },
    });

    if (tempUser) {
      //DB에 사용자 정보 가가입
      await User.update(
        {
          emailAuthCode,
          nickname: tempNickname,
        },
        { where: { email } },
      );
    } else {
      //완전 처음 가입
      await User.create({
        emailAuthCode,
        nickname: tempNickname,
        email,
        platformType: 0,
        emailVerified: 0,
      });
    }

    //만약에 5분이 지났는데도, 가입을 하지 않는다면 자동으로 데이터를 삭제한다
    setTimeout(async () => {
      await User.findOne({ where: { emailAuthCode } }).then(async data => {
        if (data) {
          await User.destroy({ where: { emailAuthCode } });
        }
      });
    }, 5 * 60 * 1000);

    //이메일 전송
    let emailTemplate;
    ejs.renderFile(
      appDir + '/template/emailAuth.ejs',
      { email, emailAuthCode },
      function (err, data) {
        if (err) {
          console.log(err);
        }
        emailTemplate = data;
      },
    );

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    let mailOptions = await transporter.sendMail({
      from: `Pida`,
      to: email,
      subject: 'Pida 회원가입을 위한 인증 메일입니다',
      html: emailTemplate,
    });

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      }
      console.log('Finish sending email : ' + info.response);
      res.status(201).json({
        data: { email },
        message: '이메일 인증코드를 발송했습니다',
      });
      transporter.close();
    });
  } catch (e) {
    //서버 에러
    console.error(e);
    return res
      .status(500)
      .json({ message: '서버가 이메일 인증 처리에 실패했습니다' });
  }
};
