import styled from 'styled-components';

export const SignInput = styled.input`
  margin: 1rem;
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
`;
