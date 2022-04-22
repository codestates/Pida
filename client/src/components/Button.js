import styled from 'styled-components';

const Button = styled.button`
  border: none;
  color: white;
  background-color: #3ba914;
  :hover {
    background-color: #34c200;
  }
`;

export const RadioButton = styled(Button)`
  margin: 1rem 0 0 0;
  width: 10rem;
  height: 4rem;
  border-radius: 4rem;
  font-size: 2rem;
`;

export const SignButton = styled(Button)`
  margin: 1rem;
  width: 31.5rem;
  height: 4rem;
  border-radius: 1.6rem;
  font-size: 1.5rem;
  font-weight: 800;
`;
