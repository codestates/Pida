import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Container,
  UDContainer,
  ContainerRow,
} from '../../components/Container';
import { SelectButton } from '../../components/Button';
import { Error } from '../../components/Div';
import styled from 'styled-components';

//import axios from 'axios';
const ContentTextArea = styled.textarea`
  width: 50rem;
  height: 20rem;
  resize: none;
  border-radius: 3rem;
  border: solid 0.15rem black;
  padding: 1.5rem;
  margin-top: 1rem;
  font-size: 0.8rem;
`;

const Uploadinput = styled.input`
  padding: 5rem 0rem 0rem 0rem;
  width: 10rem;
`;

function InteriorWrite() {
  const history = useHistory();
  const location = useLocation();

  const [image, setImage] = useState(''); // 이미지..
  const [content, setContent] = useState('');
  const [errorMessage1, setErrorMessage1] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');

  const handleImage = e => {
    setImage(e.target.value);
  };

  const handleContent = e => {
    setContent(e.target.value);
  };
  const handelInterior = () => {
    if (image <= 0 || content.length <= 0) {
      if (image <= 0) {
        setErrorMessage1('이미지를 삽입하세요');
      }
      if (content.length <= 0) {
        setErrorMessage2('내용을 입력하세요');
      }
    } else {
      console.log('글썼다');
      // axios
      //   .post(
      //     `${process.env.REACT_APP_API_URL}/plant/${location.state.plantId}/interiors`,
      //     { image: image, content: content },
      //     { withCredentials: true },
      //   )
      //   .then(res => {
      //     try {
      history.goBack(); // 식물상세보기 페이지로 돌아가기
      //     } catch (err) {}
      //   });
    }
  };

  return (
    <UDContainer>
      <div>
        <Uploadinput type="file" accept="image/*" onChange={handleImage} />
        <Error>{errorMessage1}</Error>
        <Error>{errorMessage2}</Error>
      </div>

      <ContentTextArea
        placeholder="내용"
        maxLength="1000"
        onChange={handleContent}
      />

      <div style={{ margin: '1rem 0 0 42rem' }}>
        <SelectButton onClick={handelInterior}>뽐내기</SelectButton>
      </div>
    </UDContainer>
  );
}
export default InteriorWrite;
