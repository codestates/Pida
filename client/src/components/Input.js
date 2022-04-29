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
