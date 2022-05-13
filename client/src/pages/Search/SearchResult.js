import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { TButton } from '../../components/Button';
import {
  Container1,
  Container2,
  Container3,
  Item,
} from '../../components/Container';
import { AnswerDiv, SearchCountDiv, ItemLeft } from '../../components/Div';
import { ImageR } from '../../components/Image';

function SearchResult() {
  const history = useHistory();
  const location = useLocation();

  /* 검색 결과 보여주기 */
  const [plantsTotal, setPlantsTotal] = useState(0);
  const [plantsArray, setPlantsArray] = useState([]);
  useEffect(() => {
    console.log(location);
    if (!location.state) {
      console.log('전체');
      axios
        .get(`${process.env.REACT_APP_API_URL}/search`, {
          withCredentials: true,
        })
        .then(res => {
          setPlantsTotal(res.data.data.plantsTotal);
          setPlantsArray(res.data.data.plantsArray);
        });
    } else {
      console.log('부분');
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
    setPlantId(id); // 클릭한 식물의 id 설정하고
    setIsNavigate(true); // useEffect 실행해 해당 id 식물 상세 페이지로 이동
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
            <Item>
              <TButton onClick={() => handlePlantDetail(1)}>
                <ImageR src="../images/logo.png" alt="" />
                <h3>더미</h3>
              </TButton>
            </Item>
          </Container3>
        </Container2>
      </Container1>
    </>
  );
}
export default SearchResult;
