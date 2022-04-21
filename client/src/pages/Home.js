import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column; // 아이템들 세로로 정렬
  align-items: center; // 좌우 가운데로 정렬
`;
const ItemLeft = styled.div`
  width: 55rem;
`;
const ItemRight = styled.div`
  width: 55rem;
  display: flex;
  justify-content: flex-end;
`;

const QuestionDiv = styled.div`
  padding: 3rem 0 0 0;
  font-size: 2.7rem;
  font-weight: 600;
`;

const RadioLable = styled.label`
  display: inline-block;
  margin: 3rem 1rem 1rem 0;

  width: 150px;
  height: 50px;
  border: 5px solid #3ba914;
  border-radius: 50px;

  text-align: center;
  font-size: 30px;
  padding-top: 10px;

  /* 클릭 전 */
  color: rgb(0, 0, 0);
  font-weight: 500;

  :hover {
    color: white;
    background-color: #3ba914;
    font-weight: 600;
  }
`;

const RadioInput = styled.input.attrs({ type: 'radio' })`
  display: none; // 라디오버튼 동그라미 없애기

  /* 클릭 후 */
  :checked + label {
    color: white;
    background-color: #3ba914;
    font-weight: 600;
  }
`;

const RadioButton = styled.button`
  margin: 1rem 0 0 0;
  width: 140px;
  height: 70px;
  border: none;
  border-radius: 50px;

  color: white;
  background-color: #3ba914;
  font-size: 30px;
  font-weight: 400;

  :hover {
    background-color: #34c200;
  }
`;

function Home() {
  const history = useHistory();
  const [space, setSpace] = useState('');
  const handleSpace = e => {
    setSpace(e.target.value);
  };
  const handleSearch = () => {
    if (space) {
      // axios
      //   .get(
      //     `${process.env.REACT_APP_API_URL}/search?space=${space}`,
      //     { withCredentials: true },
      //   )
      //   .then(res => {
      history.replace('/search');
      //});
    }
  };

  return (
    <Container>
      <ItemLeft>
        <QuestionDiv>어떤 공간을 꾸밀 반려 식물을 찾고 있나요?</QuestionDiv>
        <RadioInput
          type="radio"
          id="s1"
          name="place"
          value="좁은 공간"
          onChange={handleSpace}
        />
        <RadioLable htmlFor="s1">좁은 공간</RadioLable>
        <RadioInput
          type="radio"
          id="s2"
          name="place"
          value="천장"
          onChange={handleSpace}
        />
        <RadioLable htmlFor="s2">천장</RadioLable>
        <RadioInput
          type="radio"
          id="s3"
          name="place"
          value="벽"
          onChange={handleSpace}
        />{' '}
        <RadioLable htmlFor="s3">벽</RadioLable>
        <RadioInput
          type="radio"
          id="s4"
          name="place"
          value="가구 위"
          onChange={handleSpace}
        />{' '}
        <RadioLable htmlFor="s4">가구 위</RadioLable>
      </ItemLeft>

      <ItemLeft>
        <QuestionDiv>햇빛이 잘 드나요?</QuestionDiv>
        <RadioInput type="radio" id="l1" name="light" value="양지" />
        <RadioLable htmlFor="l1">양지</RadioLable>
        <RadioInput type="radio" id="l2" name="light" value="음지" />
        <RadioLable htmlFor="l2">음지</RadioLable>
      </ItemLeft>

      <ItemLeft>
        <QuestionDiv>식물 키우기 고수인가요?</QuestionDiv>
        <RadioInput type="radio" id="le1" name="light" value="네" />
        <RadioLable htmlFor="le1">네</RadioLable>
        <RadioInput type="radio" id="le2" name="light" value="아니오" />
        <RadioLable htmlFor="le2">아니오</RadioLable>
      </ItemLeft>

      <ItemRight>
        <RadioButton onClick={handleSearch}>검색</RadioButton>
      </ItemRight>
    </Container>
  );
}
export default Home;
