import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { TButton } from '../components/Button';
import {
  Container,
  UDContainer,
  ContainerRow2,
  Item,
} from '../components/Container';
import { ImageR } from '../components/Image';

function All() {
  const history = useHistory();
  const location = useLocation();

  /* 전체 식물 보여주기 */
  const [plantsTotal, setPlantsTotal] = useState(0);
  const [plantsArray, setPlantsArray] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/all`, { withCredentials: true }) // API 생기면 수정
      .then(res => {
        setPlantsTotal(res.data.data.plantsTotal);
        setPlantsArray(res.data.data.plantsArray);
      });
  }, []);

  /* 식물 사진 클릭하면 식물 상세 페이지로 이동 */
  const [plantId, setPlantId] = useState(0);
  const [isNavigate, setIsNavigate] = useState('');
  const handlePlantDetail = id => {
    setPlantId(id); // 클릭한 식물의 id 설정하고
    setIsNavigate(true); // useEffect 실행해 해당 id 식물 상세 페이지로 이동
  };
  useEffect(() => {
    if (isNavigate) {
      history.push({
        pathname: '/plantDetail',
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
              <AnswerDiv>당신의 공간에 어울리는 식물을 찾아보세요 🙂</AnswerDiv>
              <SearchCountDiv>총 {plantsTotal}건</SearchCountDiv>
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

const AnswerDiv = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
`;
const SearchCountDiv = styled.div`
  padding: 1rem 0 4rem 0;
  font-size: 1.3rem;
`;

const SearchResultForm = styled.div`
  margin: 3rem 0 2rem 5rem;
`;

const ItemLeft = styled.div`
  width: 100%;
  padding: 1rem;
`;
