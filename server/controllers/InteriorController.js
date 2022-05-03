const { User, Interior, Comment, Interior_like } = require('../models/Index');
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  //인테리어 게시글 상세조회: 권한이 없어도 된다.
  get: async (req, res) => {
    try {
      // 어떤 게시글을 조회할건지 알아야한다
      const { id: postId } = req.params;
      //만약에 아이디가 주어지지 않는다면 에러 메세지 응답
      if (!postId) {
        return res
          .status(400)
          .json({ message: '인테리어 게시글 조회에 실패했습니다' });
      }
      console.log(req.id, '사용자 아이디');
      console.log(postId, '게시물아이디');

      //편집 가능 여부,
      const Author = await Interior.findByPk(postId, {
        attributes: ['userId'],
      });
      let isEditable = Author.userId === req.id ? true : false;

      //좋아요 여부,
      const isLiked = await Interior_like.findOne({
        where: { userId: req.id, interiorId: postId },
      });

      //게시물에서 게시물 아이디, 유저아이디, 닉네임, 이미지, 내용, 작성시각, 좋아요개수 가지고오기
      const post = await Interior.findAll({
        attributes: {
          include: [
            [
              Sequelize.fn('COUNT', Sequelize.col('Interior_likes.userId')),
              'totalLikes',
            ],
          ],
        },
        include: [
          {
            model: Interior_like,
            attributes: [],
          },
        ],
        group: ['Interior.id'],
      });

      const nickname = await User.findByPk(post[0].dataValues.userId, {
        attributes: ['nickname'],
      });
      console.log(nickname, '글쓴이 별명');
      //댓글 목록 전체: 현재 댓글에 존재하는 userId가 req.id와 다른 경우, 수정 삭제 권한 없다고 알려주자.: api 수정 필요
      let comments = await Comment.findAll({
        attributes: ['id', 'userId', 'comment'],
        include: [
          {
            model: Interior,
            attributes: [],
            required: true,
            where: { id: postId },
          },
          {
            model: User,
            attributes: ['nickname'],
            required: true,
          },
        ],
      });
      comments = comments.map(el => {
        const { id, userId, comment, User } = el;
        return {
          id,
          userId,
          comment,
          nickname: User.dataValues.nickname,
          //댓글 수정 삭제 가능여부
          isEditable: userId === req.id ? true : false,
        };
      });

      res.status(200).json({
        data: {
          id: post[0].dataValues.id,
          isEditable,
          isLiked: !!isLiked,
          userId: post[0].dataValues.userId,
          nickname: nickname.nickname,
          totalLikes: post[0].dataValues.totalLikes,
          image: post[0].dataValues.image,
          content: post[0].dataValues.content,
          createdAt: post[0].dataValues.createdAt,
          comments,
        },
        message: '게시글과 댓글을 가져왔습니다',
      });
    } catch (e) {
      //서버 에러 처리
      console.error(e);
      return res
        .status(500)
        .json({ message: '서버가 인테리어 게시글과 댓글 조회에 실패했습니다' });
    }
  },
  //게시글 작성
  post: async (req, res) => {
    try {
      //만약에 게시글과 넘어온 파일링크가 하나라도 없으면 작성거부: 클라에서 사전에 차단.
      //문제점: 클라에서 이거 안해줄 경우엔 실패해도 s3에 이미지 올라감..
      const { id: plantId } = req.params;
      const { content } = req.body;
      console.log(
        '식물:',
        plantId,
        '이미지주소',
        req.file.location,
        '내용',
        content,
      );
      if (!plantId || !req.file.location || !content) {
        return res
          .status(400)
          .json({ message: '인테리어 게시글 업로드에 실패했습니다' });
      }
      //다 있을 경우 201	인테리어 게시글 업로드에 성공했습니다.
      //게시글 아이디 및 생성시각
      const newPost = Interior.create({
        userId: req.id,
        plantId,
        content,
        image: req.file.location,
      });
      //사용자 닉네임
      const nickname = User.findByPk(req.id, { attributes: ['nickname'] });
      Promise.all([newPost, nickname])
        .then(value => {
          const [newPost, nickname] = value;
          console.log(newPost, nickname, '결과');
          const { id, userId, content, image, createdAt } = newPost.dataValues;
          return res.status(201).json({
            data: {
              id,
              isliked: false, //처음 생성한 게시물이니 좋아요는 초기상태로.
              userId,
              nickname: nickname.nickname,
              image,
              content,
              createdAt,
            },
            message: '인테리어 게시글 업로드에 성공했습니다',
          });
        })
        .catch(console.log);
    } catch (e) {
      //서버 에러 처리
      console.error(e);
      return res
        .status(500)
        .json({ message: '서버가 인테리어 게시글과 댓글 조회에 실패했습니다' });
    }
  },
  //수정
  patch: async (req, res, next) => {
    try {
      const { id: postId } = req.params;
      //만약에 게시글 아이디가 없을 시 수정거부
      if (!postId) {
        return res
          .status(400)
          .json({ message: '인테리어 게시글 수정에 실패했습니다' });
      }
      const { content: newContent } = req.body;

      //만약에 기존 이미지는 , 안 바꾸고 글만 수정요청을 보냈다면 글만 업데이트 하고 돌려보낸다.
      if (req.body.image && req.file === undefined) {
        console.log('이미지 안 바꾸고 글만 바꿔서 보냄');
        await Interior.update(
          {
            content: newContent,
          },
          { where: { id: postId } },
        );

        const user = await User.findByPk(req.id);
        const updatedPost = await Interior.findByPk(postId);
        console.log(updatedPost, '수정된 글');
        const { id, userId, image, content, createdAt } =
          updatedPost.dataValues;
        const data = {
          nickname: user.nickname,
          isliked: false,
          id,
          userId,
          createdAt,
          image,
          content,
        };

        return res
          .status(200)
          .json({ data, message: '인테리어 게시글 수정에 성공했습니다' });
      }

      //완전 새 이미지로 교체하는 경우 처리.
      //기존에 존재하는 이미지 파일의 이름을 알아낸다.
      const imageUrl = await Interior.findByPk(postId, {
        attributes: ['image'],
      });
      //이미지 주소에서 마지막 슬래시 이후의 문자열이 파일 이름이 된다.
      console.log(imageUrl, '파일주소');
      req.fileName = imageUrl.image.split('.com/')[1];

      //이제 DB테이블 업데이트 해도 된다.
      await Interior.update(
        {
          content: newContent,
          image: req.file.location,
        },
        { where: { id: postId } },
      );

      const user = await User.findByPk(req.id);
      const updatedPost = await Interior.findByPk(postId);
      console.log(updatedPost, '수정된 글');
      const { id, userId, image, content, createdAt } = updatedPost.dataValues;
      const data = {
        nickname: user.nickname,
        isliked: false,
        id,
        userId,
        createdAt,
        image,
        content,
      };
      console.log(data, '응답으로 돌려줄 데이터');
      req.data = data;
      next();
    } catch (e) {
      //서버 에러 처리
      console.error(e);
      return res
        .status(500)
        .json({ message: '서버가 인테리어 게시글 수정에 실패했습니다' });
    }
  },
  //게시글 삭제
  delete: async (req, res, next) => {
    //로직: 삭제할 게시글의 아이디를 받아와서 DB 테이블에서 삭제한다
    //s3상에 올라간 이미지는 어떻게 삭제해야할까?
    try {
      //일단 id가 없으면, 삭제 거부한다.
      const { id: postId } = req.params;
      if (!postId) {
        return res
          .status(400)
          .json({ message: '인테리어 게시글 삭제에 실패했습니다' });
      }
      //id가 주어졌다면 DB 테이블에서 삭제 진행한다.
      //이때 이미지 주소로부터, 삭제할 파일 이름을 알아내야 한다.
      //일단 주소를 받아온다
      const imageUrl = await Interior.findByPk(postId, {
        attributes: ['image'],
      });
      //이미지 주소에서 마지막 슬래시 이후의 문자열이 파일 이름이 된다.
      console.log(imageUrl, '파일주소');
      req.fileName = imageUrl.image.split('.com/')[1];
      //테이블 상에서 삭제
      await Interior.destroy({ where: { id: postId } });
      next();
    } catch (e) {
      //서버 에러 처리
      console.error(e);
      return res
        .status(500)
        .json({ message: '서버가 인테리어 게시글 삭제에 실패했습니다' });
    }
  },
};
