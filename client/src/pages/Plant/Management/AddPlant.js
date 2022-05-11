import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { SelectButton } from '../../../components/Button';
import {
  UDContainer,
  ContainerRow,
  Container,
} from '../../../components/Container';
import { Error, Label } from '../../../components/Div';
import { ImageR } from '../../../components/Image';
import { UploadInput, ContentTextArea } from '../../../components/Input';

function AddPlant() {
  const history = useHistory();

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [preview, setPreview] = useState('../images/preview.png');
  const [image, setImage] = useState(null);
  const [size, setSize] = useState([]);
  const [space, setSpace] = useState([]);
  const [species, setSpecies] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  /* 입력값 저장 */
  const handleName = e => {
    setName(e.target.value);
  };

  const handleDescription = e => {
    setDescription(e.target.value);
  };

  const handleImage = e => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setPreview(reader.result);
    };
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    console.log('size', size);
    console.log('space', space);
    console.log('species', species);
  }, [size, space, species]);

  const handleSize = e => {
    if (e.target.checked) {
      setSize([...size, parseInt(e.target.value)]);
    } else {
      setSize(size.filter(el => el !== parseInt(e.target.value)));
    }
  };

  const handleSpace = e => {
    if (e.target.checked) {
      setSpace([...space, parseInt(e.target.value)]);
    } else {
      setSpace(space.filter(el => el !== parseInt(e.target.value)));
    }
  };

  const handleSpecies = e => {
    if (e.target.checked) {
      setSpecies([...species, parseInt(e.target.value)]);
    } else {
      setSpecies(species.filter(el => el !== parseInt(e.target.value)));
    }
  };

  /* 식물 등록 요청 */
  const handleAddPlant = () => {
    setErrorMessage('');

    let formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('description', description);
    formData.append('size', JSON.stringify(size.sort((a, b) => a - b)));
    formData.append('space', JSON.stringify(space.sort((a, b) => a - b)));
    formData.append('species', JSON.stringify(species.sort((a, b) => a - b)));

    if (
      name === null ||
      image === null ||
      description === null ||
      size.length === 0 ||
      space.length === 0 ||
      species.length === 0
    ) {
      setErrorMessage('모든 정보를 입력하세요');
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/plants`, formData, {
          withCredentials: true,
          contentType: 'multipart/form-data',
        })
        .then(res => {
          alert('식물등록완료');
          history.replace('/search');
        })
        .catch(err => {
          console.log('catch', err);
        });
    }
  };

  return (
    <UDContainer>
      <ContainerRow style={{ justifyContent: 'center' }}>
        <Container>
          <ImageR style={{ marginBottom: '0.8rem' }} src={preview} />
          <div>
            <Label htmlFor="inputlabel">사진선택</Label>
            <UploadInput
              type="file"
              name="image"
              accept="image/*"
              id="inputlabel"
              style={{ display: 'none' }}
              onChange={handleImage}
            />
          </div>
        </Container>

        <span style={{ marginLeft: '3rem' }}>
          <h4 style={{ margin: '0 0 0.5rem 0' }}>크기</h4>
          <input type="checkbox" value="1" onClick={handleSize} /> 큰
          <input type="checkbox" value="2" onClick={handleSize} /> 작은
          <h4 style={{ margin: '0.5rem 0' }}>공간</h4>
          <input type="checkbox" value="1" onClick={handleSpace} /> 가구
          <input type="checkbox" value="2" onClick={handleSpace} /> 바닥
          <input type="checkbox" value="3" onClick={handleSpace} /> 벽
          <input type="checkbox" value="4" onClick={handleSpace} /> 천장
          <h4 style={{ margin: '0.5rem 0' }}>종류</h4>
          <input type="checkbox" value="1" onClick={handleSpecies} /> 꽃
          <input type="checkbox" value="2" onClick={handleSpecies} /> 비꽃
          <input type="checkbox" value="3" onClick={handleSpecies} /> 선인장
          <input type="checkbox" value="4" onClick={handleSpecies} /> 다육
        </span>
      </ContainerRow>

      <ContentTextArea
        style={{ height: '1.1rem' }}
        placeholder="식물 이름"
        maxLength="50"
        onChange={handleName}
      />
      <ContentTextArea
        style={{ height: '7.5rem' }}
        placeholder="식물 설명"
        maxLength="500"
        onChange={handleDescription}
      />

      <Error>{errorMessage}</Error>

      <SelectButton onClick={handleAddPlant}>등록</SelectButton>
    </UDContainer>
  );
}

export default AddPlant;
