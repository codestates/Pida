import styled from 'styled-components';

export const Message = styled.div`
  padding-left: 1.5rem;
`;

export const Error = styled(Message)`
  color: red;
`;

export const WriteUser = styled.span`
  //김코딩 닉네임
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0 0.5rem 0 0.5rem;
`;

export const DropDown = styled.div`
  position: relative;
  display: inline - block;

  :hover > div {
    display: block;
  }
`;
export const DropDownC = styled.div`
  display: none;
  position: absolute;
  z-index: 1; /*다른 요소들보다 앞에 배치*/
  //border: 0.1rem solid black;
  //left: -4.5rem;
  bottom: 2rem;
  height: 0.5rem;
`;

export const ChatMenu = styled.a`
  display: block;
  text-decoration: none;
  font-size: 0.8rem;
  padding-bottom: 3rem;
  color: #3ba914;
  font-weight: 550;

  /* :visited :hover :focus :active {
    text-decoration: none;
  } */
  //없애도 되나?
`;
