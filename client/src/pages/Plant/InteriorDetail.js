import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { ConfirmButton, DetailButton } from '../../components/Button';
import { ContainerRow, ModalContainer } from '../../components/Container';
import { ImageD } from '../../components/Image';
import { Modal } from '../../components/Modal';

function InteriorDetail(props) {
  const history = useHistory();
  const location = useLocation();

  const [interior, setInterior] = useState({
    id: '',
    isliked: false,
    nickname: '',
    image: '',
    content: '',
  });

  const [commentArray, setCommentArray] = useState([
    { id: '1', nickname: '꼬부기', comment: '이거 나중에 지워주세요' },
  ]);

  //댓글 가져오기
  // 닉네임, 내용

  // useEffect(() => {
  //   axios
  //     .get(
  //       `${process.env.REACT_APP_API_URL}/interiors/${location.state.interiorId}`,
  //       { withCredentials: true },
  //     )
  //     .then(res => {
  //       setInterior({
  //         ...interior,
  //         id: res.data.data.id,
  //         isliked: res.data.data.like,
  //         nickname: res.data.data.nickname,
  //         image: res.data.data.image,
  //         content: res.data.data.content,
  //       });
  //       setCommentArray(res.data.data.comments);
  //     });
  // }, [commentArray]);

  /* 삭제 버튼 누르면 모달 띄우기 */
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };
  // 모달에서 확인 누르면 글 삭제 하기
  const handleDeleteInterior = () => {
    // axios
    //   .delete(
    //     `${process.env.REACT_APP_API_URL}/interiors/${location.state.interiorId}`,
    //     { withCredentials: true },
    //   )
    //   .then(res => {
    props.handleInteriorModal(false); // 모달 닫기
    //     console.log(`글삭제`);
    //   });
  };

  /* 댓글 수정 */
  const handleModifyComment = () => {};

  /* 댓글 삭제 */
  const handleDeleteComment = id => {
    // axios
    //   .delete(`${process.env.REACT_APP_API_URL}/interiors/${id}`, {
    //     withCredentials: true,
    //   })
    //   .then(res => {
    setCommentArray([]); //useEffect가 돌아가야하는데..?
    console.log(`댓글삭제`);
    // });
  };

  /* 좋아요 버튼 눌렸을 때 */
  /* axios실행되면 주석풀고 바꾸면됨 */
  //const [isLike, setIsLike] = useState(isliked);
  const [isLike, setIsLike] = useState(false);

  //true -> delte요청, false-> post
  const handleLike = () => {
    //좋아요 취소 요청
    if (isLike === true) {
      // axios
      //   .delete(
      //     `${process.env.REACT_APP_API_URL}/interiors/${location.state.interiorId}/likes`,
      //     {},
      //     { withCredentials: true },
      //   )
      //   .then(res => {
      setIsLike(false); // 좋아요 취소상태로 바뀜
      console.log('좋아요 취소 성공!');
      // });
    }
    //좋아요 요청
    else {
      // axios
      //   .post(
      //     `${process.env.REACT_APP_API_URL}/interiors/${location.state.interiorId}/likes`,
      //     {},
      //     { withCredentials: true },
      //   )
      //   .then(res => {
      setIsLike(true); // 좋아요 상태로 바뀜
      console.log('좋아요 성공!');
      // });
    }
  };

  return (
    <div>
      <ModalContainer>
        <div>
          <div style={{ margin: '0rem 0 1rem 0' }}>
            <WriteUser>김코딩{interior.nickname}</WriteUser>
            {isLike ? (
              <MyLikeRed onClick={handleLike}>❤</MyLikeRed>
            ) : (
              <MyLikeGray onClick={handleLike}>❤</MyLikeGray>
            )}
            <span>
              <DetailButton>수정</DetailButton>
              <DetailButton onClick={handleDeleteModal}>삭제</DetailButton>
              {isDeleteModalOpen ? (
                <Modal>
                  <h3>정말로 삭제하시겠습니까?</h3>
                  <span>
                    <ConfirmButton onClick={handleDeleteModal}>
                      취소
                    </ConfirmButton>
                    <ConfirmButton onClick={handleDeleteInterior}>
                      확인
                    </ConfirmButton>
                  </span>
                </Modal>
              ) : null}
            </span>
          </div>
          <div>
            <ImageD src="../../images/꽃.png" width="300" height="300" />
          </div>
        </div>

        <div>
          <ContentView>
            여기에는 인테리어에 대한 게시글 내용이 들어갑니다.
            {interior.content}
          </ContentView>
        </div>
        <CommentBox>
          <ContainerRow>
            <ComentWrite type="text" placeholder="댓글쓰기" maxLength="200" />
            <CommentButton>전송</CommentButton>
          </ContainerRow>

          {/* 인테리어 댓글 */}
          <div style={{ padding: '1.5rem 1.5rem 1.5rem 1.5rem' }}>
            {commentArray.map(comment => {
              return (
                <>
                  <WriteUser>{comment.nickname}</WriteUser>
                  <DetailButton onClick={() => handleModifyComment(comment.id)}>
                    수정
                  </DetailButton>
                  <DetailButton onClick={() => handleDeleteComment(comment.id)}>
                    삭제
                  </DetailButton>
                  <CommentView>{comment.comment}</CommentView>
                </>
              );
            })}
            {/* <WriteUser>꼬부기</WriteUser>
            <DetailButton onClick={handleModifyComment}>수정</DetailButton>
            <DetailButton onClick={() => handleDeleteComment(1)}>
              삭제
            </DetailButton>
            <CommentView>참 멋진 집이네요</CommentView> */}
          </div>
        </CommentBox>
      </ModalContainer>
    </div>
  );
}

export default InteriorDetail;

const WriteUser = styled.span`
  //김코딩 닉네임
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0 0.5rem 0 0.5rem;
`;

const MyLikeGray = styled.button`
  //좋아요 버튼
  background-color: white;
  border-color: transparent;
  border: none;
  font-size: 1.5rem;
  padding: 0 0.5rem 0 0.5rem;
  color: #bcbcbc;
  /* :focus {
    // 일단은 포커스로 색변환 했지만 차후에 이벤트 리스너로 변경해야함
    color: red;
  } */
`;

const MyLikeRed = styled(MyLikeGray)`
  color: red;
`;

const ContentView = styled.div`
  //글 보기 div
  width: 31rem;
  //height: 20rem; //30rem;;
  resize: none;
  margin: 1rem 0 0 0;
  font-size: 0.8rem;
`;

const CommentBox = styled.div`
  //댓글 네모 창
  border: 0.15rem solid #bcbcbc;
  border-radius: 3rem;
  width: 38rem;
  padding: 1rem;
  margin: 2rem;
`;

const ComentWrite = styled.textarea`
  //댓글작성 창
  width: 28rem;
  height: 2.4rem;
  resize: none;
  border-radius: 1rem;
  border: solid 0.13rem #bcbcbc;
  padding: 0.5rem; //텍스트 상자 안
  margin: 1rem 0 0 2rem;
  font-size: 0.8rem;
`;

const CommentButton = styled.button`
  //댓글 작성 버튼
  width: 4rem;
  height: 3.7rem;
  border: none;
  border-radius: 1rem;
  margin: 1rem 0 0rem 1rem;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  background-color: #bcbcbc;
  :hover {
    background-color: rgb(163, 163, 163);
  }
`;

const CommentView = styled.div`
  // 댓글 써진거 보기
  padding: 0 0 1.5rem 0.5rem;
  //padding-left: 0.5rem;
  font-size: 0.8rem;
`;
