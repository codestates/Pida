import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { UDContainer } from '../../components/Container';
import { SelectButton } from '../../components/Button';
import { Error } from '../../components/Div';
import { ImageR } from '../../components/Image';
import styled from 'styled-components';

const ContentTextArea = styled.textarea`
  width: 50rem;
  height: 14rem;
  resize: none;
  border-radius: 3rem;
  border: solid 0.15rem black;
  padding: 1.5rem;
  margin-top: 1rem;
  font-size: 0.8rem;
`;

const Uploadinput = styled.input`
  padding: 1rem 0rem 0rem 0rem;
  width: 10rem;
`;

function InteriorWrite() {
  const history = useHistory();
  const location = useLocation();

  const [preview, setPreview] = useState('../../images/사진선택.png');
  const [formData, setFormData] = useState(null);
  const [content, setContent] = useState(null);
  const [errorMessage1, setErrorMessage1] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');

  // 이미지
  const handleImageUpload = e => {
    // 미리보기 띄우기
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    console.log(reader.result);
    reader.onload = () => {
      setPreview(reader.result);
    };

    // 서버로 보내기 위해 저장
    let formData = new FormData();
    formData.append('image', e.target.files[0]);
    setFormData(formData);
  };

  //내용
  const handleContent = e => {
    setContent(e.target.value);
  };

  // 이미지와 내용 보내기
  const handelInterior = () => {
    setErrorMessage1('');
    setErrorMessage2('');

    if (formData === null || content === null) {
      if (formData === null) {
        setErrorMessage1('이미지를 삽입하세요');
      }
      if (content === null) {
        setErrorMessage2('내용을 입력하세요');
      }
    } else {
      console.log('글썼다');

      axios
        .post(
          `${process.env.REACT_APP_API_URL}/plants/${location.state.plantId}/interiors`,
          { image: formData, content: content },
          { withCredentials: true, contentType: 'multipart/form-data' }, //??
        )
        .then(res => {
          history.goBack(); // 식물상세보기 페이지로 돌아가기
        })
        .catch(err => {
          console.log('catch', err);
        });
    }
  };

  return (
    <UDContainer>
      <ImageR src={preview} />
      <div>
        <Uploadinput
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageUpload}
        />
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
