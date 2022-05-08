import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { SelectButton } from '../../../components/Button';
import {
  UDContainer,
  ContainerRow,
  MiniContainer,
} from '../../../components/Container';
import { Error, Label } from '../../../components/Div';
import { ImageR } from '../../../components/Image';
import { UploadInput, ContentTextArea } from '../../../components/Input';

function ModifyPlant(props) {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    console.log(plant);
  }, [plant]);

  // 수정 전 내용 받아와서 저장
  const [plant, setPlant] = useState(location.state.plant);

  // 수정 후 보낼 내용
  const [name, setName] = useState(plant.plantName);
  const [description, setDescription] = useState(plant.plantDescription);
  const [preview, setPreview] = useState(plant.plantImage);
  const [image, setImage] = useState(plant.plantImage);
  const [size, setSize] = useState(plant.plantSize);
  const [space, setSpace] = useState(plant.plantSpace);
  const [species, setSpecies] = useState(plant.plantSpecies);
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

  const handleSize = e => {
    if (e.target.checked) {
      setSize([...size, e.target.value]);
    } else {
      setSize(size.filter(el => el !== e.target.value));
    }
  };

  const handleSpace = e => {
    if (e.target.checked) {
      setSpace([...space, e.target.value]);
    } else {
      setSpace(space.filter(el => el !== e.target.value));
    }
  };

  const handleSpecies = e => {
    if (e.target.checked) {
      setSpecies([...species, e.target.value]);
    } else {
      setSpecies(species.filter(el => el !== e.target.value));
    }
  };

  /* 식물 수정 요청 */
  const handleModifyPlant = () => {
    setErrorMessage('');

    let formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('description', description);
    formData.append('size', JSON.stringify(size));
    formData.append('space', JSON.stringify(space));
    formData.append('species', JSON.stringify(species));

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
        .patch(
          `${process.env.REACT_APP_API_URL}/plants/${plant.id}`,
          formData,
          {
            withCredentials: true,
            contentType: 'multipart/form-data',
          },
        )
        .then(res => {
          alert('식물수정완료');
          history.goBack(); // 식물상세보기 페이지로 돌아가기
        })
        .catch(err => {
          console.log('catch', err);
        });
    }
  };

  return (
    <UDContainer>
      <ContainerRow style={{ justifyContent: 'center' }}>
        <MiniContainer>
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
        </MiniContainer>

        {/* 얘넨 어떻게 값 맞춰서 체크해놓지 */}
        <span style={{ marginLeft: '3rem' }}>
          <h4 style={{ margin: '0 0 0.5rem 0' }}>크기</h4>
          <input type="checkbox" value="1" onClick={handleSize} /> 큼
          <input type="checkbox" value="2" onClick={handleSize} /> 작음
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
        value={name}
        onChange={handleName}
      />
      <ContentTextArea
        style={{ height: '7.5rem' }}
        placeholder="식물 설명"
        maxLength="500"
        value={description}
        onChange={handleDescription}
      />

      <Error>{errorMessage}</Error>

      <SelectButton onClick={handleModifyPlant}>등록</SelectButton>
    </UDContainer>
  );
}

export default ModifyPlant;
