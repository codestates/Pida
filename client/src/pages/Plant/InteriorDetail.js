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
import { WriteUser, DropDown, DropDownC, ChatMenu } from '../../components/Div';
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
    isLiked: '',
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
        window.location.reload(); // 새로고침 (모달 닫히고 식물 상세 페이지 보임)
      });
  };

  /* 좋아요 */
  const handleLike = () => {
    //좋아요 취소 요청
    if (interior.isLiked === true) {
      axios
        .delete(
          `${process.env.REACT_APP_API_URL}/interiors/${props.interiorId}/likes`,
          { withCredentials: true },
        )
        .then(res => {
          getInterior(); // 인테리어 모달 업데이트
          props.getMypage(); // 마이페이지 업데이트
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
          props.getMypage(); // 마이페이지 업데이트
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
        setComment('');
        getInterior(); // 인테리어 모달 업데이트
      });
  };

  return (
    <div>
      <ModalContainer>
        <div>
          <div style={{ margin: '0rem 0 1rem 0' }}>
            <ContainerRow>
              <DropDown>
                <WriteUser>{interior.nickname}</WriteUser>
                <DropDownC>
                  <ChatMenu href="/chat">1:1 채팅하기</ChatMenu>
                </DropDownC>
              </DropDown>

              {/* isLike가 true라면 빨간하트, false라면 회색하트 */}
              {interior.isLiked ? (
                <DetailButtonRed onClick={handleLike}>
                  ❤ {interior.totalLikes}
                </DetailButtonRed>
              ) : (
                <DetailButton onClick={handleLike}>
                  ❤ {interior.totalLikes}
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
            </ContainerRow>
          </div>
          <div>
            <ImageD src={interior.image} width="300" height="300" />
          </div>
        </div>

        <div
          style={{
            width: '31rem',
            marginTop: '1rem',
            fontSize: '0.8rem',
            whiteSpace: 'normal',
          }}
        >
          {interior.content}
        </div>
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
    </div>
  );
}
export default InteriorDetail;
