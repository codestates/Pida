import { UDContainer } from '../components/Container';
import { SelectButton2 } from '../components/Button';
import { Error } from '../components/Error';
import styled from 'styled-components';
import React, { useState } from 'react';
//import axios from 'axios';

const ContentTextArea = styled.textarea`
  width: 50rem;
  height: 32rem;
  resize: none;
  border-radius: 3rem;
  border: solid 0.15rem black;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  margin: 2rem 2rem -1.3rem 11rem;
  font-size: 1.1rem;
`;

// const UploadImage = styled.label`
//   display: table;
//   margin-left: auto;
//   margin-right: auto;

//   padding: 1rem 5rem;
//   background-color: #3ba914;
//   border-radius: 4px;
//   color: white;
//   font-size: 1.5rem;
//   font-weight: 600;
//   cursor: pointer;
// `;

const UploadImage2 = styled.label`
  display: table;
  margin-left: auto;
  margin-right: auto;
  padding-top: 2rem;
`;

function InteriorWrite() {
  const [image, setImage] = useState('');
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
      //     `${process.env.REACT_APP_API_URL}/plant/${id}/interiors`,
      //     { image, content },
      //     { withCredentials: true },
      //   )
      //   .then(res => {
      //     try {
      //       history.push('/plantDetail');
      //       // 식물상세보기 페이지로 넘어가서 모달열려야함
      //     } catch (err) {}
      //   });
    }
  };

  return (
    <UDContainer>
      <div>
        {/* <UploadImage htmlFor="input-image">사진넣기</UploadImage> */}
        <UploadImage2 htmlFor="input-image">
          <img src="../images/사진선택.png" alt="" width="180px" />
        </UploadImage2>
        <input
          type="file"
          id="input-image"
          style={{ display: 'none' }}
          accept="image/jpeg, image/png, image/jpg"
          onChange={handleImage}
        />
      </div>
      <div>
        <span>
          <ContentTextArea
            placeholder="내용"
            maxLength="1000"
            onChange={handleContent}
          />
        </span>
        <span>
          <SelectButton2 onClick={handelInterior}>뽐내기</SelectButton2>
        </span>
      </div>
      <Error>{errorMessage1}</Error>
      <Error>{errorMessage2}</Error>
    </UDContainer>
  );
}
export default InteriorWrite;
