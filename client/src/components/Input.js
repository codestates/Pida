import styled from 'styled-components';

export const SignInput = styled.input`
  margin: 0.8rem 0 0.8rem 0;
  padding-left: 1rem; // 글자위치
  width: 31.7rem;
  height: 3.7rem;
  border: solid 0.1rem black;
  border-radius: 1.6rem;
  font-size: 1.5rem;
  ::placeholder {
    color: #bebebe;
    font-size: 1.5rem;
    font-weight: 800;
  }
  :focus {
    outline: none;
  }
  @media screen and (max-width: 760px) {
    font-size: 0.9rem;
    width: 21.5rem;
    height: 3.3rem;
    margin: 0.3rem 0 0.3rem 0;
    ::placeholder {
      font-size: 0.9rem;
    }
  }
`;
export const SignupInput = styled(SignInput)`
  margin: 0;
  border: none;
`;
export const SignupInput2 = styled(SignupInput)`
  width: 26.7rem;
  @media screen and (max-width: 760px) {
    width: 16.5rem;
  }
`;

// 사진 첨부 칸
export const UploadInput = styled.input`
  padding: 1rem 0rem 0rem 0rem;
  width: 10rem;
`;
// 글 내용 칸
export const ContentTextArea = styled.textarea`
  padding: 1.5rem;
  margin-top: 1rem;
  width: 50rem;
  height: 14rem;
  resize: none;
  border-radius: 3rem;
  border: solid 0.15rem black;
  font-size: 0.8rem;
  @media screen and (max-width: 760px) {
    width: 20rem;
  }
`;
// 댓글 내용 칸
export const ComentWrite = styled.textarea`
  padding: 0.5rem;
  margin: 1rem 0 0 2rem;
  width: 28rem;
  height: 2.4rem;
  resize: none;
  border-radius: 1rem;
  border: solid 0.13rem #bcbcbc;
  font-size: 0.8rem;
  @media screen and (max-width: 760px) {
    width: 12rem;
  }
`;
