import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Login from '../../components/Sign/Login';
import { DetailButton, CommentButton } from '../../components/Button';
import { ContainerRow, ModalContainer } from '../../components/Container';
import { WriteUser, Content } from '../../components/Div';
import { ImageD } from '../../components/Image';
import { ComentWrite } from '../../components/Input';
import { CCModal } from '../../components/Modal';
import Comment from './Comment';
import { BsFillSuitHeartFill } from 'react-icons/bs';

const DetailButtonRed = styled(DetailButton)`
  color: red;
`;

const CommentBox = styled.div`
  padding: 1rem;
  margin: 2rem;
  width: 38rem;
  border: 0.15rem solid #bcbcbc;
  border-radius: 3rem;
  @media screen and (max-width: 760px) {
    width: 20rem;
  }
`;

function InteriorDetail(props) {
  const history = useHistory();

  const [interior, setInterior] = useState({
    id: 0,
    isLiked: false,
    isEditable: false,
    nickname: '',
    totalLikes: 0,
    image: '',
    content: '',
  });
  const [commentArray, setCommentArray] = useState([]);

  /* 페이지 로드 */
  useEffect(() => {
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
          isLiked: res.data.data.isLiked,
          totalLikes: res.data.data.totalLikes,
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
    history.push({
      pathname: `/interiors/${interior.id}`,
      state: { interior: interior },
    });
  };

  /* 글 삭제 */
  // 삭제 모달
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };
  // 삭제
  const handleDeleteInterior = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/interiors/${props.interiorId}`,
        { withCredentials: true },
      )
      .then(res => {
        window.location.reload(); // 새로고침 (모달 닫히고 식물 상세 페이지 보임)
      });
  };

  /* 로그인 모달 */
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const handleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  /* 좋아요 */
  const handleLike = () => {
    if (!localStorage.getItem('loginUserId')) {
      setIsLoginModalOpen(true);
    } else {
      //좋아요 취소 요청
      if (interior.isLiked === true) {
        axios
          .delete(
            `${process.env.REACT_APP_API_URL}/interiors/${props.interiorId}/likes`,
            { withCredentials: true },
          )
          .then(res => {
            getInterior(); // 인테리어 모달 업데이트
            if (props.getMypage) props.getMypage(); // 마이페이지에서 연 거라면, 마이페이지 업데이트
          });
      }
      //좋아요 요청
      else {
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/interiors/${props.interiorId}/likes`,
            { withCredentials: true },
          )
          .then(res => {
            getInterior(); // 인테리어 모달 업데이트
            if (props.getMypage) props.getMypage(); // 마이페이지에서 연 거라면, 마이페이지 업데이트
          });
      }
    }
  };

  /* 댓글 작성 */
  const [comment, setComment] = useState('');
  const handleInputValue = e => {
    setComment(e.target.value);
  };
  const handleWriteComment = () => {
    if (!localStorage.getItem('loginUserId')) {
      setIsLoginModalOpen(true);
    } else {
      if (comment !== '') {
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/interiors/${interior.id}/comments`,
            { comment: comment },
            { withCredentials: true },
          )
          .then(res => {
            setComment('');
            getInterior(); // 인테리어 모달 업데이트
          });
      }
    }
  };

  return (
    <>
      <ModalContainer>
        <div>
          <div style={{ margin: '0rem 0 1rem 0' }}>
            <ContainerRow>
              <WriteUser>{interior.nickname}</WriteUser>
              {/* isLike가 true라면 빨간하트, false라면 회색하트 */}
              {interior.isLiked ? (
                <DetailButtonRed onClick={handleLike}>
                  <BsFillSuitHeartFill />
                  {interior.totalLikes}
                </DetailButtonRed>
              ) : (
                <DetailButton onClick={handleLike}>
                  <BsFillSuitHeartFill />
                  {interior.totalLikes}
                </DetailButton>
              )}

              {/* isEditable이 true라면 수정 삭제 버튼을 보여준다 */}
              {interior.isEditable ? (
                <span>
                  <DetailButton onClick={handleModifyInterior}>
                    수정
                  </DetailButton>
                  <DetailButton onClick={handleDeleteModal}>삭제</DetailButton>
                  {isDeleteModalOpen ? (
                    <CCModal
                      handleModal={handleDeleteModal}
                      handleAction={handleDeleteInterior}
                    >
                      정말로 삭제하시겠습니까?
                    </CCModal>
                  ) : null}
                </span>
              ) : null}
            </ContainerRow>
          </div>
          <div>
            <ImageD src={interior.image} width="300" height="300" />
          </div>
        </div>

        <Content>{interior.content}</Content>

        <CommentBox>
          <ContainerRow>
            <ComentWrite
              type="text"
              placeholder="댓글쓰기"
              maxLength="200"
              value={comment}
              onChange={handleInputValue}
            />
            <CommentButton onClick={handleWriteComment}>전송</CommentButton>
          </ContainerRow>
          <Comment commentArray={commentArray} getInterior={getInterior} />
        </CommentBox>
      </ModalContainer>

      {/* 댓글 작성, 좋아요는 로그인 필요 */}
      {isLoginModalOpen ? (
        <Login
          handleModal={handleLoginModal}
          setIsLoginModalOpen={setIsLoginModalOpen}
        />
      ) : null}
    </>
  );
}
export default InteriorDetail;
