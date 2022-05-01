const { User, Comment } = require('../models/Index');

module.exports = {
  //댓글 작성
  post: async (req, res) => {
    try {
      //어떤 게시글에 댓글을 다는지 알아내기
      const { id: postId } = req.params;
      const { comment: content } = req.body;
      //사용자 아이디 알아내서, 닉네임 가지고오기
      const nickname = await User.findByPk(req.id, {
        attributes: ['nickname'],
      });

      const newComment = await Comment.create({
        userId: req.id,
        interiorId: postId,
        comment: content,
      });

      const { id, userId, comment } = newComment.dataValues;
      return res.status(201).json({
        data: {
          id,
          userId,
          nickname: nickname.nickname,
          comment,
        },
        message: '댓글 달기에 성공했습니다',
      });
    } catch (e) {
      //서버 에러
      console.error(e);
      return res
        .status(500)
        .json({ message: '서버가 댓글 작성에 실패했습니다' });
    }
  },
  //댓글 수정
  patch: async (req, res) => {
    try {
      //어떤 댓글을 수정할지, 어떻게 수정할건지 내용을 받는다
      const { id: commentId } = req.params;
      const { comment } = req.body;
      if (!commentId || !comment) {
        return res.status(400).json({ message: '댓글 수정에 실패했습니다' });
      }

      // //수정 권한 확인: 클라단에서 화면에 버튼 안보이게 하자
      // const userId = await Comment.findByPk(commentId, {
      //   attributes: ['userId'],
      // });
      // console.log(userId.dataValues.userId, '댓글쓴사용자아이디');
      // //현재 댓글에 있는 사용자의 아이디가 주어진 id와 다른 경우 권한 없음
      // if (req.id !== userId.dataValues.userId) {
      //   return res.status(401).json({ message: '댓글 수정 권한이 없습니다' });
      // }

      //수정
      await Comment.update({ comment }, { where: { id: commentId } });

      const { dataValues: modifiedComment } = await Comment.findOne({
        where: { id: commentId },
        attributes: ['userId', 'comment'],
        include: {
          model: User,
          attributes: ['nickname'],
          required: true,
        },
      });

      console.log(modifiedComment, '수정된 댓글의 내용');

      return res.status(200).json({
        data: {
          commentId,
          userId: modifiedComment.userId,
          nickname: modifiedComment.User.dataValues.nickname,
          comment: modifiedComment.comment,
        },
        message: '댓글 수정에 성공했습니다',
      });
    } catch (e) {
      //서버 에러
      console.error(e);
      return res
        .status(500)
        .json({ message: '서버가 댓글 수정에 실패했습니다' });
    }
  },
  //댓글 삭제
  delete: async (req, res) => {
    try {
      //사용자로부터 어떤 댓글을 지울지에 대한 정보를 받아야 한다.
      //댓글의 아이디 값을 받는다.
      const { id: commentId } = req.params;
      if (!commentId) {
        return res.status(400).json({ message: '댓글 삭제에 실패했습니다' });
      }

      // //삭제 권한 확인: 클라단에서 화면에 버튼 안보이게 하자
      // const userId = await Comment.findByPk(commentId, {
      //   attributes: ['userId'],
      // });
      // console.log(userId.dataValues.userId, '댓글쓴사용자아이디');
      // //현재 댓글에 있는 사용자의 아이디가 주어진 id와 다른 경우 권한 없음
      // if (req.id !== userId.dataValues.userId) {
      //   return res.status(401).json({ message: '댓글 삭제 권한이 없습니다' });
      // }

      await Comment.destroy({ where: { id: commentId } });
      return res.status(204).json({ message: '댓글 삭제를 성공했습니다' });
    } catch (e) {
      //서버 에러 처리
      console.error(e);
      return res
        .status(500)
        .json({ message: '서버가 댓글 삭제에 실패했습니다' });
    }
  },
};
