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
      });
      if (liked) {
        isliked = true;
      }
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
