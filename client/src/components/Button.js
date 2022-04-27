import styled from 'styled-components';

// 투명 버튼
export const TButton = styled.button`
  border: none;
  background-color: transparent;
`;

// 짧은 버튼
export const SelectButton = styled.button`
  margin: 0 0 3rem 0;
  width: 10rem;
  height: 3.5rem;
  border-radius: 4rem;
  border: solid 0.4rem rgb(163, 163, 163);
  color: black;
  background-color: white;
  :hover {
    color: black;
    background-color: white;
    border: solid 0.5rem #3ba914;
  }
  font-size: 1.5rem;
  font-weight: 700;
`;

// 긴 버튼
export const SignButton = styled.button`
  margin: 1rem;
  width: 31.5rem;
  height: 4rem;
  border-radius: 1.6rem;
  border: none;
  color: white;
  background-color: #3ba914;
  :hover {
    background-color: #34c200;
  }
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
