import styled from 'styled-components';

export const Message = styled.div`
  padding-left: 1.5rem;
  color: #3ba914;
`;

export const Error = styled(Message)`
  color: red;
`;

export const WriteUser = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0 0.5rem 0 0.5rem;
`;

/* SearchResult, All */
export const AnswerDiv = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
`;
export const SearchCountDiv = styled.div`
  padding: 1rem 0 4rem 0;
  font-size: 1.3rem;
`;
export const SearchResultForm = styled.div`
  margin: 3rem 0 2rem 5rem;
`;
export const ItemLeft = styled.div`
  width: 100%;
  padding: 1rem;
`;

/* 사진선택 인풋 가려주는 라벨 */
export const Label = styled.label`
  padding: 0.3rem 0.6rem;
  background-color: #bcbcbc;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  :hover {
    background-color: #3ba914;
  }
`;

/* 채팅 */
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
`;
