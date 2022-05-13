import styled from 'styled-components';

// 투명 버튼
export const TButton = styled.button`
  border: none;
  background-color: transparent;
`;

export const CheckButton = styled.button`
  width: 5rem;
  padding: 0 0.6rem 0 0;
  font-size: 0.7rem;
  border: none;
  background-color: transparent;
  :hover {
    color: grey;
  }
`;

// 짧은 버튼
export const SelectButton = styled.button`
  width: 10rem;
  height: 3.5rem;
  margin-top: 1rem;
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
  @media screen and (max-width: 760px) {
    width: 7rem;
    height: 2.5rem;
    font-size: 1rem;
  }
`;

// 긴 버튼
export const SignButton = styled.button`
  width: 33rem;
  height: 4rem;
  margin: 0.8rem;
  border-radius: 1.6rem;
  border: none;
  color: white;
  background-color: #3ba914;
  :hover {
    background-color: #34c200;
  }
  font-size: 1.5rem;
  font-weight: 800;
  @media screen and (max-width: 760px) {
    width: 22.7rem;
    height: 3.5rem;
    font-size: 1rem;
    margin: 0.3rem;
  }
`;

export const ConfirmButton = styled.button`
  margin-top: 1rem;
  background-color: white;
  border: none;
  font-weight: 500;
  :hover {
    color: grey;
  }
`;

export const MypageButton = styled.button`
  padding: 1rem 0 0 2rem;
  background-color: white;
  border: none;
  border-color: transparent;
  color: rgb(163, 163, 163);
  :focus {
    color: black;
  }
  :hover {
    color: black;
  }
  font-size: 1rem;
  font-weight: 600;
`;

export const MypageButton2 = styled(MypageButton)`
  padding: 2.5rem 7rem 0 7rem;
  font-size: 1.2rem;
  @media screen and (max-width: 760px) {
    padding: 2.5rem 3rem 0 3rem;
    font-size: 0.8rem;
  }
`;

export const ManagerButton = styled(MypageButton)`
  padding-top: 0;
`;

export const DetailButton = styled(MypageButton)`
  padding: 0 0 0 0.5rem;
  color: #bcbcbc;
  :hover {
    color: black;
  }
  font-size: 0.9rem;
`;

//댓글 작성 버튼
export const CommentButton = styled.button`
  width: 4rem;
  height: 3.7rem;
  margin: 1rem 0 0rem 1rem;
  border: none;
  border-radius: 1rem;
  color: white;
  background-color: #bcbcbc;
  :hover {
    background-color: rgb(163, 163, 163);
  }
  font-size: 1rem;
  font-weight: 500;
`;
