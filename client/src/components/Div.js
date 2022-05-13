import styled from 'styled-components';

export const Message = styled.div`
  padding-left: 1.5rem;
  color: #3ba914;
  @media screen and (max-width: 760px) {
    font-size: 0.8rem;
  }
`;
export const Error = styled(Message)`
  color: red;
`;

export const WriteUser = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0 0.5rem 0 0rem;
`;

// 사진선택 인풋 가려주는 라벨
export const Label = styled.label`
  padding: 0.3rem 0.6rem;
  background-color: #bcbcbc;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  :hover {
    background-color: #3ba914;
  }
`;

// 글 내용, 댓글 내용
export const Content = styled.div`
  width: 31rem;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  white-space: normal; // 줄바꿈 시 단어 짤림 방지
  @media screen and (max-width: 760px) {
    width: 17rem;
  }
`;
