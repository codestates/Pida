import styled from 'styled-components';

// 투명 버튼
export const TButton = styled.button`
  border: none;
  background-color: transparent;
`;

export const CheckButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 0 0.6rem 0 0;
  :hover {
    color: grey;
  }

  @media screen and (max-width: 760px) {
    font-size: 0.5rem;
  }
`;

// 짧은 버튼
export const SelectButton = styled.button`
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
  @media screen and (max-width: 760px) {
    width: 7rem;
    height: 2.5rem;
    font-size: 1rem;
  }
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

  @media screen and (max-width: 760px) {
    width: 14rem;
    height: 2.5rem;
    font-size: 1rem;
    margin: 0.3rem;
  }
`;

export const ConfirmButton = styled.button`
  background-color: white;
  border: none;
  font-weight: 500;
  :hover {
    color: grey;
  }
`;

export const MypageButton = styled.button`
  background-color: white;
  border: none;
  border-color: transparent;
  color: rgb(163, 163, 163);
  font-weight: 600;
  :focus {
    color: black;
  }

  font-size: 1rem;
  padding-top: 1rem;
  padding-left: 2rem;
`;

export const MypageButton2 = styled(MypageButton)`
  font-size: 1.2rem;

  padding: 2.5rem 7rem 0 7rem;

  @media screen and (max-width: 760px) {
    font-size: 0.8rem;
    padding: 2.5rem 3rem 0 3rem;
  }
`;

export const DetailButton = styled(MypageButton)`
  color: #bcbcbc;
  :hover {
    color: black;
  }

  font-size: 0.9rem;
  padding-top: 0rem;
  padding-left: 0.5rem;
`;

//댓글 작성 버튼
export const CommentButton = styled.button`
  width: 4rem;
  height: 3.7rem;
  border: none;
  border-radius: 1rem;
  margin: 1rem 0 0rem 1rem;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  background-color: #bcbcbc;
  :hover {
    background-color: rgb(163, 163, 163);
  }
`;
