import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import {
  ConfirmButton,
  DetailButton,
  CommentButton,
} from '../../components/Button';
import { ContainerRow, ModalContainer } from '../../components/Container';
import { WriteUser } from '../../components/Div';
import { ImageD } from '../../components/Image';
import { ComentWrite } from '../../components/Input';
import { Modal } from '../../components/Modal';
import Comment from './Comment';

const MyLikeGray = styled.button`
  background-color: white;
  border-color: transparent;
  border: none;
  font-size: 1.5rem;
  padding: 0 0.5rem 0 0.5rem;
  color: #bcbcbc;
`;

const MyLikeRed = styled(MyLikeGray)`
  color: red;
`;

const CommentBox = styled.div`
  //댓글 네모 창
  border: 0.15rem solid #bcbcbc;
  border-radius: 3rem;
  width: 38rem;
  padding: 1rem;
  margin: 2rem;
`;

function InteriorDetail(props) {
  const history = useHistory();
  const location = useLocation();

  const [interior, setInterior] = useState({
    id: '',
    isLiked: false,
    //userId: '',
    isEditable: false,
    nickname: '',
    image: '',
    content: '',
  });
  const [commentArray, setCommentArray] = useState([
    { id: '1', nickname: '꼬부기', comment: '이거 나중에 지워주세요' }, // 댓글 작성자 id 필요
  ]);

  /* 페이지 로드 */
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/interiors/${location.state.interiorId}`,
        { withCredentials: true },
      )
      .then(res => {
        setInterior({
          ...interior,
          id: res.data.data.id,
          isLiked: res.data.data.isliked,
          //userId: res.data.data.userId,
          isEditable: res.data.data.isEditable,
          nickname: res.data.data.nickname,
          image: res.data.data.image,
          content: res.data.data.content,
        });
        setCommentArray(res.data.data.comments);
      });
  }, [commentArray]);

  /* 삭제 버튼 누르면 모달 띄우기 */
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };
  // 모달에서 확인 누르면 글 삭제 하기
  const handleDeleteInterior = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/interiors/${location.state.interiorId}`,
        { withCredentials: true },
      )
      .then(res => {
        // props.handleInteriorModal(false); // 모달 닫기
        window.location.reload(); // 새로고침
        console.log(`글삭제`);
      });
  };

  /* 좋아요 버튼 눌렸을 때 */
  const [isLike, setIsLike] = useState(interior.isLiked);
  const handleLike = () => {
    //좋아요 취소 요청
    if (isLike === true) {
      axios
        .delete(
          `${process.env.REACT_APP_API_URL}/interiors/${location.state.interiorId}/likes`,
          { withCredentials: true },
        )
        .then(res => {
          setIsLike(false); // 좋아요 취소상태로 바뀜
          console.log('좋아요 취소 성공!');
        });
    }
    //좋아요 요청
    else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/interiors/${location.state.interiorId}/likes`,
          {},
          { withCredentials: true },
        )
        .then(res => {
          setIsLike(true); // 좋아요 상태로 바뀜
          console.log('좋아요 성공!');
        });
    }
  };

  /* 댓글 작성 */
  const [comment, setComment] = useState('');
  const handleInputValue = e => {
    setComment(e.target.value);
  };
  const handleWriteComment = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/interiors/${interior.id}/comments`,
        { comment: comment },
        { withCredentials: true },
      )
      .then(res => {
        console.log('댓글이 작성되었습니다');
        setTimeout(window.location.reload.bind(window.location), 600000); // 새로고침..
      });
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
            {/* isEditable이 true라면 수정 삭제 버튼을 보여준다 */}
            {interior.isEditable ? (
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
            ) : null}
          </div>
          <div>
            <ImageD src="../../images/select/꽃.png" width="300" height="300" />
          </div>
        </div>

        <div style={{ width: '31rem', marginTop: '1rem', fontSize: '0.8rem' }}>
          여기에는 인테리어에 대한 게시글 내용이 들어갑니다.
          {interior.content}
        </div>
        <CommentBox>
          <ContainerRow>
            <ComentWrite
              type="text"
              placeholder="댓글쓰기"
              maxLength="200"
              onChange={handleInputValue}
            />
            <CommentButton onClick={handleWriteComment}>전송</CommentButton>
          </ContainerRow>

          <Comment commentArray={commentArray} />
        </CommentBox>
      </ModalContainer>
    </div>
  );
}
export default InteriorDetail;
