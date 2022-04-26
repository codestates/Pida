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
  /* margin: 0.3rem 0 0 40rem; // 왼쪽마진 줬더니 왼쪽으로 쏠림
  width: 10rem;
  height: 4rem;
  border-radius: 4rem;
  font-size: 2rem; */
`;

export const SelectButton = styled(Button)`
  margin: 0 0 3rem 0;
  width: 10rem;
  height: 4rem;
  border-radius: 4rem;
  font-size: 1.5rem;
`;

export const SelectButton2 = styled(SelectButton)`
  color: black;
  background-color: white;
  border: solid 0.5rem rgb(163, 163, 163);
  font-weight: 700;
  :hover {
    color: black;
    background-color: white;
    border: solid 0.5rem #3ba914;
  }
`;

export const SignButton = styled(Button)`
  margin: 1rem;
  width: 31.5rem;
  height: 4rem;
  border-radius: 1.6rem;
  font-size: 1.5rem;
  font-weight: 800;
`;

export const ConfirmButton = styled.button`
  background-color: white;
  border: none;
  font-weight: 500;
  :hover {
    color: grey;
  }
`;
