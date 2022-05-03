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

const DetailButtonRed = styled(DetailButton)`
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
    // 좋아요 갯수 필요
    likeCount: 0,
    //userId: '',
    isEditable: false,
    nickname: '',
    image: '',
    content: '',
  });
  const [commentArray, setCommentArray] = useState([]);

  /* 페이지 로드 */
  useEffect(() => {
    //console.log('props.interiorId', props.interiorId);
    getInterior();
  }, []);

  const getInterior = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/interiors/${props.interiorId}`, {
        withCredentials: true,
      })
      .then(res => {
        setInterior({
          ...interior,
          id: res.data.data.id,
          isLiked: res.data.data.isliked,
          //likeCount : res.data.data.likeCount,
          //userId: res.data.data.userId,
          isEditable: res.data.data.isEditable,
          nickname: res.data.data.nickname,
          image: res.data.data.image,
          content: res.data.data.content,
        });
        setCommentArray(res.data.data.comments);
      });
  };

  /* 글 수정 */
  const handleModifyInterior = () => {
    // 글 정보 들고 이동
    history.push({
      pathname: '/interiorModify',
      state: { interior: interior },
    });
  };

  /* 글 삭제 */
  // 삭제 버튼 누르면 모달 띄우기
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };
  // 모달에서 확인 누르면 글 삭제 하기
  const handleDeleteInterior = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/interiors/${props.interiorId}`,
        { withCredentials: true },
      )
      .then(res => {
        // props.handleInteriorModal(false); // 모달 닫기
        window.location.reload(); // 새로고침
        console.log(`글삭제`);
      });
  };

  /* 좋아요 */
  const [isLike, setIsLike] = useState(interior.isLiked);
  const handleLike = () => {
    //좋아요 취소 요청
    if (isLike === true) {
      axios
        .delete(
          `${process.env.REACT_APP_API_URL}/interiors/${props.interiorId}/likes`,
          { withCredentials: true },
        )
        .then(res => {
          setIsLike(false);
          setInterior({ ...interior, likeCount: interior.likeCount - 1 }); // 직접 숫자 빼기?
          // getInterior(); // 다시 부르기?
          console.log('좋아요 취소 성공!');
        });
    }
    //좋아요 요청
    else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/interiors/${props.interiorId}/likes`,
          {},
          { withCredentials: true },
        )
        .then(res => {
          setIsLike(true);
          setInterior({ ...interior, likeCount: interior.likeCount + 1 }); // 직접 숫자 더하기?
          // getInterior(); // 다시 부르기?
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
        getInterior();
      });
  };

  return (
    <div>
      <ModalContainer>
        <div>
          <div style={{ margin: '0rem 0 1rem 0' }}>
            <WriteUser>{interior.nickname}</WriteUser>

            {/* isLike가 true라면 빨간하트, false라면 회색하트 */}
            {isLike ? (
              <>
                <DetailButtonRed onClick={handleLike}>
                  ❤ {interior.likeCount}
                </DetailButtonRed>
              </>
            ) : (
              <>
                <DetailButton onClick={handleLike}>
                  ❤ {interior.likeCount}
                </DetailButton>
              </>
            )}

            {/* isEditable이 true라면 수정 삭제 버튼을 보여준다 */}
            {interior.isEditable ? (
              <span>
                <DetailButton onClick={handleModifyInterior}>수정</DetailButton>
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
            <ImageD src={interior.image} width="300" height="300" />
          </div>
        </div>

        <div style={{ width: '31rem', marginTop: '1rem', fontSize: '0.8rem' }}>
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

          <Comment commentArray={commentArray} getInterior={getInterior} />
        </CommentBox>
      </ModalContainer>
    </div>
  );
}
export default InteriorDetail;
