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
  useEffect(() => {
    // axios
    //   .get(
    //     `${process.env.REACT_APP_API_URL}/interiors/${location.state.interiorId}`,
    //     { withCredentials: true },
    //   )
    //   .then(res => {
    //     setInterior({
    //       ...interior,
    //       id: res.data.data.id,
    //       isliked: res.data.data.like,
    //       nickname: res.data.data.nickname,
    //       image: res.data.data.image,
    //       content: res.data.data.content,
    //     });
    //   });
    // 댓글받는 axios
  });

  /* 삭제 버튼 누르면 모달 띄우기 */
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };
  // 모달에서 확인 누르면 글 삭제 하기
  const handleDelete = () => {
    // axios
    //   .delete(
    //     `${process.env.REACT_APP_API_URL}/interiors/${location.state.interiorId}`,
    //     {},
    //     { withCredentials: true },
    //   )
    //   .then(res => {
    props.handleInteriorModal(false); // 모달 닫기
    //     console.log(`글삭제`);
    //   });
  };

  return (
    <div>
      <ModalContainer>
        <div>
          <div style={{ margin: '0rem 0 1rem 0' }}>
            <WriteUser>김코딩{interior.nickname}</WriteUser>
            <MyLike>❤</MyLike>
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
                    <ConfirmButton onClick={handleDelete}>확인</ConfirmButton>
                  </span>
                </Modal>
              ) : null}
            </span>
          </div>
          <div>
            <ImageD src="../../images/logo.png" width="300" height="300" />
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

          <div style={{ padding: '1.5rem 1.5rem 1.5rem 1.5rem' }}>
            <WriteUser>꼬부기</WriteUser>
            <CommentView>멋진집이네요 추천해요~</CommentView>
            <WriteUser>꼬부기</WriteUser>
            <CommentView>멋진집이네요 추천해요~</CommentView>
            <WriteUser>꼬부기</WriteUser>
            <CommentView>멋진집이네요 추천해요~</CommentView>
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

const MyLike = styled.button`
  //좋아요 버튼
  background-color: white;
  border-color: transparent;
  border: none;
  font-size: 1.5rem;
  padding: 0 0.5rem 0 0.5rem;
  color: #bcbcbc;
  :focus {
    // 일단은 포커스로 색변환 했지만 차후에 이벤트 리스너로 변경해야함
    color: red;
  }
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
