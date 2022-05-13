import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { UDContainer } from '../../components/Container';
import { SelectButton } from '../../components/Button';
import { Error, Label } from '../../components/Div';
import { ImageR } from '../../components/Image';
import { UploadInput, ContentTextArea } from '../../components/Input';

const Div = styled.div`
  margin: 0rem 0 0 42rem;
  @media screen and (max-width: 760px) {
    margin: 0rem 0 0 15rem;
  }
`;

function ModifyInterior() {
  const history = useHistory();
  const location = useLocation();

  // 수정 전 내용 받아와서 저장
  const [interior, setInterior] = useState(location.state.interior);

  // 수정 후 보낼 내용
  const [preview, setPreview] = useState(interior.image);
  const [image, setImage] = useState(interior.image);
  const [content, setContent] = useState(interior.content);
  const [errorMessage1, setErrorMessage1] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');

  const handleImageUpload = e => {
    // 이미지 미리보기 띄우기
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setPreview(reader.result);
    };
    // 이미지set
    setImage(e.target.files[0]);
  };

  const handleContent = e => {
    //내용set
    setContent(e.target.value);
  };

  // 서버로 이미지와 내용 보내기
  const handelInterior = () => {
    setErrorMessage1('');
    setErrorMessage2('');

    let formData = new FormData();
    formData.append('image', image);
    formData.append('content', content);

    if (image === null || content === null) {
      if (image === null) {
        setErrorMessage1('이미지를 삽입하세요');
      }
      if (content === null) {
        setErrorMessage2('내용을 입력하세요');
      }
    } else {
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/interiors/${interior.id}`,
          formData,
          { withCredentials: true, contentType: 'multipart/form-data' },
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
      <ImageR style={{ marginBottom: '0.8rem' }} src={preview} />
      <div>
        <Label for="inputlabel">사진선택</Label>
        <UploadInput
          type="file"
          name="image"
          accept="image/*"
          id="inputlabel"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
        <Error>{errorMessage1}</Error>
        <Error>{errorMessage2}</Error>
      </div>

      <ContentTextArea
        placeholder="내용"
        maxLength="1000"
        value={content}
        onChange={handleContent}
      />

      <Div>
        <SelectButton onClick={handelInterior}>뽐내기</SelectButton>
      </Div>
    </UDContainer>
  );
}
export default ModifyInterior;
