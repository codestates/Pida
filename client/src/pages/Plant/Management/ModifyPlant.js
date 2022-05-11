import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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

function ModifyPlant(props) {
  const history = useHistory();
  const location = useLocation();

  // 수정 전 내용 받아와서 저장
  const [plant, setPlant] = useState(location.state.plant);

  // 수정 전 받아온 숫자를 불린으로 바꿔 체크여부 설정
  const numToBool = (arr, len) => {
    const result = new Array(len).fill(false);
    //arr 순회하며 result의 불린 값을 바꿔 리턴한다
    arr.forEach(el => {
      result[el - 1] = true;
    });
    return result;
  };

  //체크박스 값 관리
  const [isSizeChecked, setIsSizeChecked] = useState(
    numToBool(plant.plantSize, 2),
  );
  const [isSpaceChecked, setIsSpaceChecked] = useState(
    numToBool(plant.plantSpace, 4),
  );
  const [isSpeciesChecked, setIsSpeciesChecked] = useState(
    numToBool(plant.plantSpecies, 4),
  );

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
      setSize([...size, parseInt(e.target.value)]);
    } else {
      setSize(size.filter(el => el !== parseInt(e.target.value)));
    }
    const idx = parseInt(e.target.value) - 1;
    setIsSizeChecked([
      ...isSizeChecked.slice(0, idx),
      !isSizeChecked[idx],
      ...isSizeChecked.slice(idx + 1),
    ]);
  };

  const handleSpace = e => {
    if (e.target.checked) {
      setSpace([...space, parseInt(e.target.value)]);
    } else {
      setSpace(space.filter(el => el !== parseInt(e.target.value)));
    }
    const idx = parseInt(e.target.value) - 1;
    setIsSpaceChecked([
      ...isSpaceChecked.slice(0, idx),
      !isSpaceChecked[idx],
      ...isSpaceChecked.slice(idx + 1),
    ]);
  };

  const handleSpecies = e => {
    if (e.target.checked) {
      setSpecies([...species, parseInt(e.target.value)]);
    } else {
      setSpecies(species.filter(el => el !== parseInt(e.target.value)));
    }
    const idx = parseInt(e.target.value) - 1;
    setIsSpeciesChecked([
      ...isSpeciesChecked.slice(0, idx),
      !isSpeciesChecked[idx],
      ...isSpeciesChecked.slice(idx + 1),
    ]);
  };

  /* 식물 수정 요청 */
  const handleModifyPlant = () => {
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
          //history.replace('/');
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
          <input
            type="checkbox"
            value="1"
            onChange={handleSize}
            checked={isSizeChecked[0]}
          />
          큰
          <input
            type="checkbox"
            value="2"
            onChange={handleSize}
            checked={isSizeChecked[1]}
          />
          작은
          <h4 style={{ margin: '0.5rem 0' }}>공간</h4>
          <input
            type="checkbox"
            value="1"
            onChange={handleSpace}
            checked={isSpaceChecked[0]}
          />
          가구
          <input
            type="checkbox"
            value="2"
            onChange={handleSpace}
            checked={isSpaceChecked[1]}
          />
          바닥
          <input
            type="checkbox"
            value="3"
            onChange={handleSpace}
            checked={isSpaceChecked[2]}
          />
          벽
          <input
            type="checkbox"
            value="4"
            onChange={handleSpace}
            checked={isSpaceChecked[3]}
          />{' '}
          천장
          <h4 style={{ margin: '0.5rem 0' }}>종류</h4>
          <input
            type="checkbox"
            value="1"
            onChange={handleSpecies}
            checked={isSpeciesChecked[0]}
          />
          꽃
          <input
            type="checkbox"
            value="2"
            onChange={handleSpecies}
            checked={isSpeciesChecked[1]}
          />
          비꽃
          <input
            type="checkbox"
            value="3"
            onChange={handleSpecies}
            checked={isSpeciesChecked[2]}
          />
          선인장
          <input
            type="checkbox"
            value="4"
            onChange={handleSpecies}
            checked={isSpeciesChecked[3]}
          />
          다육
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
