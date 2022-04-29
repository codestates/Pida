const { User, Interior, Comment } = require('../models/Index');

module.exports = {
  //식물 상세정보 조회: 권한이 없어도 된다.
  get: async (req, res) => {
    try {
      //사용자로부터 게시글에 대한 아이디 정보를 얻는다
      const { id: postId } = req.params;

      //만약에 이게 없으면 400응답
      if (!postId) {
        return res
          .status(400)
          .json({ message: '인테리어 게시글 조회에 실패했습니다' });
      }
      //게시물 본문 조회: 사용자의 닉네임은 유저아이디를 통해서 알아낸다
      //그리고 사용자가 좋아요 했는지 안 했는지 여부도 조사해서 불린 값으로 돌려줘야 한다
      //좋아요 누를 수 있는 여부:
      //인테리어 라이크 테이블에 현재 사용자 아이디-현재 조회한 postId 모두 존재 시 false
      //그렇지 않을 경우 true이다.

      //필요한 테이블: 유저, 인테리어, 인테리어 라이크
      /*우선은 포스트하나 찾기. 
      select interiors.id, users.nickname,
      interiors.image, interiors.content, interiors.createdAt
      from interiors
      join users
      on users.id = interiors.userId
      where interiors.id = postId
      */
      const post = await Interior.findByPk(postId, {
        attributes: ['id', 'image', 'content', 'createdAt'],
        include: {
          model: User,
          attributes: ['nickname'],
        },
      });
      console.log(post.dataValues, '사용자가 조회할 포스트');
      //게시물에 달린 댓글 찾기
      const comments = await Comment.findAll({
        attributes: ['id', 'nickname', 'comment'],
        include: {
          model: Interior,
          attributes: [],
          required: true,
          where: { id: postId },
        },
      });

      return res.status(200).json({
        data: {
          comments: comments.map(el => el.dataValues),
        },
        message: '인테리어 게시글과 댓글 조회에 성공했습니다',
      });
    } catch (e) {
      // 서버 에러 처리
      console.error(e);
      return res
        .status(500)
        .json({ message: '서버가 게시글과 댓글 조회에 실패했습니다' });
    }
  },
};
