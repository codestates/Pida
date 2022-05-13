import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { TButton } from '../../components/Button';
import {
  Container1,
  Container2,
  Container3,
  Item,
} from '../../components/Container';
import { ImageR } from '../../components/Image';

const ItemLeft = styled.div`
  width: 100%;
  padding: 1rem;
`;
const AnswerDiv = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  @media screen and (max-width: 760px) {
    font-size: 1.5rem;
    font-weight: 500;
  }
`;
const SearchCountDiv = styled.div`
  padding: 1rem 0 4rem 0;
  font-size: 1.3rem;
  @media screen and (max-width: 760px) {
    font-size: 0.8rem;
  }
`;

function SearchPlants() {
  const history = useHistory();
  const location = useLocation();

  /* 페이지 로드 */
  const [plantsTotal, setPlantsTotal] = useState(0);
  const [plantsArray, setPlantsArray] = useState([]);
  useEffect(() => {
    if (!location.state) {
      // 전체 식물 보기
      axios
        .get(`${process.env.REACT_APP_API_URL}/search`, {
          withCredentials: true,
        })
        .then(res => {
          setPlantsTotal(res.data.data.plantsTotal);
          setPlantsArray(res.data.data.plantsArray);
        });
    } else {
      // 조건 맞는 식물 보기
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/search?size=${location.state.size}&space=${location.state.space}&species=${location.state.species}`,
          { withCredentials: true },
        )
        .then(res => {
          setPlantsTotal(res.data.data.plantsTotal);
          setPlantsArray(res.data.data.plantsArray);
        });
    }
  }, []);

  /* 식물 사진 클릭하면 식물 상세 페이지로 이동 */
  const [plantId, setPlantId] = useState(0);
  const [isNavigate, setIsNavigate] = useState(false);
  const handlePlantDetail = id => {
    setPlantId(id);
    setIsNavigate(true);
  };
  useEffect(() => {
    if (isNavigate) {
      history.push({
        pathname: `/plants/${plantId}`,
        state: { plantId: plantId },
      });
      setIsNavigate(false);
    }
  }, [isNavigate]);

  return (
    <>
      <Container1>
        <Container2>
          <ItemLeft>
            <AnswerDiv>
              {!location.state
                ? '당신의 공간에 어울리는 식물을 찾아보세요'
                : '당신의 공간에 어울리는 반려 식물입니다'}
            </AnswerDiv>
            <SearchCountDiv>검색결과 총 {plantsTotal}건</SearchCountDiv>
          </ItemLeft>

          <Container3>
            {plantsArray.map(plant => {
              return (
                <Item>
                  <TButton onClick={() => handlePlantDetail(plant.id)}>
                    <ImageR src={plant.image} alt="" />
                    <h3>{plant.name}</h3>
                  </TButton>
                </Item>
              );
            })}
          </Container3>
        </Container2>
      </Container1>
    </>
  );
}
export default SearchPlants;
