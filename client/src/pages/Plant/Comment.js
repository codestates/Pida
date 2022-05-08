import React, { useState } from 'react';
import axios from 'axios';
import { DetailButton } from '../../components/Button';
import { ContainerRow } from '../../components/Container';
import {
  ChatMenu,
  DropDown,
  DropDownC,
  WriteUser,
  Content,
} from '../../components/Div';
import { ComentWrite } from '../../components/Input';
import styled from 'styled-components';

function Comment(props) {
  const [modifyComment, setModifyComment] = useState({
    id: '',
    nickname: '',
    comment: '',
  });

  /* 댓글 수정 */
  const [isModifyComment, setIsModifyComment] = useState(false);
  const [newComment, setNewComment] = useState('');

  // 댓글 수정 시작
  const handleModifyCommentStart = comment => {
    setModifyComment({
      ...comment,
      id: comment.id,
      nickname: comment.nickname,
      comment: comment.comment,
    });
    setIsModifyComment(true);
    setNewComment(comment.comment);
  };
  const handleInputComment = e => {
    setNewComment(e.target.value);
  };

  // 댓글 수정 완료
  const handleModifyCommentEnd = comment => {
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/comments/${comment.id}`,
        { comment: newComment },
        { withCredentials: true },
      )
      .then(res => {
        setIsModifyComment(false);
        props.getInterior();
      })
      .catch(err => {
        console.log(err);
      });
  };

  // 댓글 수정 취소
  const handleCancelComment = () => {
    setIsModifyComment(false);
  };

  /* 댓글 삭제 */
  const handleDeleteComment = comment => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/comments/${comment.id}`, {
        withCredentials: true,
      })
      .then(res => {
        props.getInterior();
      });
  };

  return (
    <>
      <div style={{ padding: '1.5rem 1.5rem 0rem 2em' }}>
        {props.commentArray.map(comment => {
          return (
            <>
              {comment.isEditable ? (
                <>
                  {isModifyComment && comment.id === modifyComment.id ? (
                    <>
                      {/* 수정 가능 유저 클릭 후 */}
                      <ContainerRow>
                        <DropDown>
                          <WriteUser>{comment.nickname}</WriteUser>
                          <DropDownC>
                            <ChatMenu href="/chat">1:1 채팅하기</ChatMenu>
                          </DropDownC>
                        </DropDown>
                        <DetailButton
                          onClick={() => handleModifyCommentEnd(comment)}
                        >
                          확인
                        </DetailButton>
                        <DetailButton
                          onClick={() => handleCancelComment(comment)}
                        >
                          취소
                        </DetailButton>
                      </ContainerRow>

                      <div>
                        <ComentWrite
                          style={{ marginLeft: '0rem' }}
                          type="text"
                          maxLength="200"
                          onChange={handleInputComment}
                          value={newComment}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* 수정 가능 유저 클릭 전 */}
                      <ContainerRow>
                        <DropDown>
                          <WriteUser>{comment.nickname}</WriteUser>
                          <DropDownC>
                            <ChatMenu href="/chat">1:1 채팅하기</ChatMenu>
                          </DropDownC>
                        </DropDown>
                        <DetailButton
                          onClick={() => handleModifyCommentStart(comment)}
                        >
                          수정
                        </DetailButton>
                        <DetailButton
                          onClick={() => handleDeleteComment(comment)}
                        >
                          삭제
                        </DetailButton>
                      </ContainerRow>

                      <Content>{comment.comment}</Content>
                    </>
                  )}
                </>
              ) : (
                <>
                  {/* 수정 불가능 유저 */}
                  <ContainerRow>
                    <DropDown>
                      <WriteUser>{comment.nickname}</WriteUser>
                      <DropDownC>
                        <ChatMenu href="/chat">1:1 채팅하기</ChatMenu>
                      </DropDownC>
                    </DropDown>
                  </ContainerRow>
                  <Content>{comment.comment}</Content>
                </>
              )}
            </>
          );
        })}
      </div>
    </>
  );
}
export default Comment;
