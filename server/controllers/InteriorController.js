const { User, Interior, Comment, Interior_like } = require('../models/Index');

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
      //로딩했을때 좋아요 눌렀었는지 여부.좋아요 테이블에 현재 포스트와 사용자 아이디 쌍이 존재한다면 좋아요를 누른 것.
      let isliked = false;
      const liked = await Interior_like.findOne({
        where: { userId: req.id, interiorId: postId },
        //현재 게시글에 있는 게시글 아이디, 해당 사용자가 좋아요를 눌렀는지의 여부,
        //작성자 아이디, 작성자 닉네임, 작성시각, 사진, 글
      });
      if (liked) {
        isliked = true;
      }
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

      return res.status(200).json({
        data: { comments },
        message: '인테리어 게시글과 댓글 조회에 성공했습니다',
<<<<<<< HEAD
=======

      //로딩했을때 좋아요 눌렀었는지 여부.좋아요 테이블에 현재 포스트와 사용자 아이디 쌍이 존재한다면 좋아요를 누른 것.
      let isliked = false;
      const liked = await Interior_like.findOne({
        where: { userId: req.id, interiorId: postId },

>>>>>>> d8cbeef4a455f6982a6a486ea21a66892e1059df
      });
    } catch (e) {
      //서버 에러 처리
      console.error(e);
      return res
        .status(500)
        .json({ message: '서버가 인테리어 게시글과 댓글 조회에 실패했습니다' });
    }
  },

  // post: async (req, res) => {},
  // patch: async (req, res) => {},
  // delete: async (req, res) => {},
};
