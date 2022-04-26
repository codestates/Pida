import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Container, UDContainer, ContainerRow } from '../components/Container';
import PlantDetail from './PlantDetail';

function SearchResult(props) {
  const history = useHistory();

  /* 검색 결과 보여주기 */
  const [plantsTotal, setPlantsTotal] = useState(0);
  const [plantsArray, setPlantsArray] = useState([]);
  useEffect(() => {
    // axios
    //   .get(
    //     `${process.env.REACT_APP_API_URL}/search?size=${props.select.size}&space=${props.select.space}&species=${props.select.species}`,
    //     { withCredentials: true },
    //   )
    //   .then(res => {
    //     setPlantsTotal(res.data.data.plantsTotal);
    //     setPlantsArray(res.data.data.plantsArray);
    //   });
  }, []);

  /* 특정 식물 사진 클릭했을 때 PlantDetail 보여주기 */
  const [isSrPage, setIsSrPage] = useState(true);
  const [plantId, setPlantId] = useState(0);
  const handlePlantDetail = id => {
    setPlantId(id); // 클릭한 식물의 id 설정하고
    setIsSrPage(false); // 검색 결과 페이지 숨기고, 식물 상세 페이지 보여주기
  };

  return (
    <>
      {isSrPage ? (
        <UDContainer>
          <SearchResultForm>
            <Container>
              <ItemLeft>
                <AnswerDiv>당신의 공간에 어울리는 반려 식물입니다.</AnswerDiv>
                <SearchCountDiv>검색결과 총 {plantsTotal}건</SearchCountDiv>
              </ItemLeft>

              <ContainerRow>
                {plantsArray.map(plant => {
                  return (
                    <ResultItem>
                      <ResultImage
                        src={plant.plantImage}
                        alt=""
                        onClikck={() => handlePlantDetail(plant.id)}
                      />
                      <h3>{plant.plantName}</h3>
                    </ResultItem>
                  );
                })}

                {/* 모양 보려고 만든 거 -  지우면 됨
            <ResultItem>
              <ResultImage src="../images/select/꽃.png" alt="" />
              <h3>1</h3>
            </ResultItem>
            <ResultItem>
              <ResultImage src="../images/select/꽃.png" alt="" />
              <h3>2</h3>
            </ResultItem>
            <ResultItem>
              <ResultImage src="../images/select/꽃.png" alt="" />
              <h3>3</h3>
            </ResultItem>
            <ResultItem>
              <ResultImage src="../images/select/꽃.png" alt="" />
              <h3>4</h3>
            </ResultItem>
            <ResultItem>
              <ResultImage src="../images/select/꽃.png" alt="" />
              <h3>5</h3>
            </ResultItem>
            <ResultItem>
              <ResultImage src="../images/select/꽃.png" alt="" />
              <h3>6</h3>
            </ResultItem> */}
              </ContainerRow>
            </Container>
          </SearchResultForm>
        </UDContainer>
      ) : (
        <PlantDetail plantId={plantId} />
      )}
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
