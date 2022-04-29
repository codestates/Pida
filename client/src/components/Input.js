import styled from 'styled-components';

export const SignInput = styled.input`
  margin: 0.8rem 0 0.8rem 0;
  padding-left: 1rem; // 글자위치

  width: 30rem;
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
`;

export const SignupInput = styled(SignInput)`
  margin: 0;
  width: 26.7rem;
  border: none;
`;

export const ComentWrite = styled.textarea`
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
