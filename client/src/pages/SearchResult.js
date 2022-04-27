import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Container, UDContainer, ContainerRow2 } from '../components/Container';
import { TButton } from '../components/Button';

function SearchResult() {
  const history = useHistory();
  const location = useLocation();

  /* 검색 결과 보여주기 */
  const [plantsTotal, setPlantsTotal] = useState(0);
  const [plantsArray, setPlantsArray] = useState([]);
  useEffect(() => {
    console.log(location.state);
    // axios
    //   .get(
    //     `${process.env.REACT_APP_API_URL}/search?size=${location.state.size}&space=${location.state.space}&species=${location.state.species}`,
    //     { withCredentials: true },
    //   )
    //   .then(res => {
    //     setPlantsTotal(res.data.data.plantsTotal);
    //     setPlantsArray(res.data.data.plantsArray);
    //   });
  }, []);

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
        state: plantId,
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
              <AnswerDiv>당신의 공간에 어울리는 반려 식물입니다.</AnswerDiv>
              <SearchCountDiv>검색결과 총 {plantsTotal}건</SearchCountDiv>
            </ItemLeft>

            <ContainerRow2>
              {/* {plantsArray.map(plant => {
                return (
                  <ResultItem>
                    <TButton onClick={() => handlePlantDetail(plant.id)}>
                      <ResultImage src={plant.plantImage} alt="" />
                      <h2>{plant.plantName}</h2>
                    </TButton>
                  </ResultItem>
                );
              })} */}

              {/* 모양 보려고 만든 거 - 지우면 됨 */}
              <ResultItem>
                <TButton onClick={() => handlePlantDetail('dkjdljd')}>
                  <ResultImage src="../images/select/꽃.png" alt="" />
                  <h2>대롱대롱</h2>
                </TButton>
              </ResultItem>
              <ResultItem>
                <TButton onClick={() => handlePlantDetail('dkjdljd')}>
                  <ResultImage src="../images/select/꽃.png" alt="" />
                  <h3>마들렌뇨끼</h3>
                </TButton>
              </ResultItem>
              <ResultItem>
                <TButton onClick={() => handlePlantDetail('dkjdljd')}>
                  <ResultImage src="../images/select/꽃.png" alt="" />
                  <h3>3</h3>
                </TButton>
              </ResultItem>
              <ResultItem>
                <TButton onClick={() => handlePlantDetail('dkjdljd')}>
                  <ResultImage src="../images/select/꽃.png" alt="" />
                  <h3>4</h3>
                </TButton>
              </ResultItem>
            </ContainerRow2>
          </Container>
        </SearchResultForm>
      </UDContainer>
    </>
  );
}
export default SearchResult;

const AnswerDiv = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
`;
const SearchCountDiv = styled.div`
  padding: 1rem 0 4rem 0;
  font-size: 1.3rem;
`;

const ResultImage = styled.img`
  /* 식물사진 15*15 사이즈 비율에 맞게 자르기*/
  width: 13rem;
  height: 13rem;
  transform: translate(50, 50);
  object-fit: cover;
  //margin: auto;
`;

const SearchResultForm = styled.div`
  margin: 3rem 0 2rem 5rem;
`;

const ItemLeft = styled.div`
  width: 100%;
  padding: 1rem;
  //margin: 0 0 0 3rem;
`;

const ResultItem = styled.div`
  width: 13rem;
  height: 13rem;
  padding: 0 3rem 5rem 0;
`;
