import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { TButton } from '../components/Button';
import {
  Container,
  UDContainer,
  ContainerRow2,
  Item,
} from '../components/Container';
import { AnswerDiv, SearchResultForm, ItemLeft } from '../components/Div';
import { ImageR } from '../components/Image';

function All() {
  const history = useHistory();

  /* 전체 식물 보여주기 */
  const [plantsArray, setPlantsArray] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/search/all`, {
        withCredentials: true,
      })
      .then(res => {
        setPlantsArray(res.data.data);
      });
  }, []);

  /* 식물 사진 클릭하면 식물 상세 페이지로 이동 */
  const [plantId, setPlantId] = useState(0);
  const [isNavigate, setIsNavigate] = useState(false);
  const handlePlantDetail = id => {
    setPlantId(id); // 클릭한 식물의 id 설정하고
    setIsNavigate(true); // useEffect 실행해 해당 id 식물 상세 페이지로 이동
  };
  useEffect(() => {
    if (isNavigate) {
      history.push({
        pathname: '/plants/:id',
        state: { plantId: plantId },
      });
      setIsNavigate(false);
    }
  }, [isNavigate]);

  return (
    <>
      <UDContainer>
        <SearchResultForm>
          <Container>
            <ItemLeft>
              <AnswerDiv style={{ paddingBottom: '5rem' }}>
                당신의 공간에 어울리는 식물을 찾아보세요 🙂
              </AnswerDiv>
            </ItemLeft>

            <ContainerRow2>
              {plantsArray.map(plant => {
                return (
                  <Item>
                    <TButton onClick={() => handlePlantDetail(plant.id)}>
                      <ImageR src={plant.image} alt="" />
                      <h2>{plant.name}</h2>
                    </TButton>
                  </Item>
                );
              })}
              <Item>
                <TButton onClick={() => handlePlantDetail(0)}>
                  <ImageR src="../../images/logo.png" alt="" />
                  <h2>로고</h2>
                </TButton>
              </Item>
            </ContainerRow2>
          </Container>
        </SearchResultForm>
      </UDContainer>
    </>
  );
}
export default All;
