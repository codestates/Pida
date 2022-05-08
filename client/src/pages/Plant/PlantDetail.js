import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { SelectButton, TButton, MypageButton } from '../../components/Button';
import {
  ContainerRow,
  UDContainer,
  Form,
  TransContainer,
} from '../../components/Container';
import { ImageP, ImageI } from '../../components/Image';
import { Modal3 } from '../../components/Modal';
import InteriorDetail from './InteriorDetail';

// 가로 스크롤 생기는 특정 부분
const Interiors = styled.div`
  width: 100%;
  height: 11.5rem;
  white-space: nowrap;
  overflow-x: auto;
`;

function PlantDetail() {
  const history = useHistory();
  const location = useLocation();

  /* 페이지 로드 */
  const [plant, setPlant] = useState({
    id: 0,
    plantName: '',
    plantImage: '',
    plantDescription: '',
  });
  const [interiorsArray, setInteriorsArray] = useState([]);

  useEffect(() => {
    handleRecent(); // 처음엔 최신순
  }, []);

  // 최신순
  const handleRecent = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/plants/${location.state.plantId}?order=recent`,
        {
          withCredentials: true,
        },
      )
      .then(res => {
        setPlant({
          ...plant,
          id: res.data.data.id,
          plantName: res.data.data.plantName,
          plantImage: res.data.data.plantImage,
          plantDescription: res.data.data.plantDescription,
        });
        setInteriorsArray(res.data.data.interiorsArray);
      });
  };
  // 인기순
  const handlePopular = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/plants/${location.state.plantId}?order=likes`,
        {
          withCredentials: true,
        },
      )
      .then(res => {
        setPlant({
          ...plant,
          id: res.data.data.id,
          plantName: res.data.data.plantName,
          plantImage: res.data.data.plantImage,
          plantDescription: res.data.data.plantDescription,
        });
        setInteriorsArray(res.data.data.interiorsArray);
      });
  };

  /* 나도 뽐내기 버튼 클릭 시, 글쓰기 페이지로 이동 */
  const [plantId, setPlantId] = useState(0);
  const [isNavigate, setIsNavigate] = useState('');
  const handleInteriorWrite = id => {
    setPlantId(id); // 식물 id 설정해주고
    setIsNavigate(true); // useEffect 실행해 해당 id 식물 상세 페이지로 이동
  };
  useEffect(() => {
    if (isNavigate) {
      history.push({
        pathname: '/interiorWrite',
        state: { plantId: plantId },
      });
      setIsNavigate(false);
    }
  }, [isNavigate]);

  /* 인테리어 사진 클릭 시, 인테리어 상세 모달 띄우기 */
  const [interiorId, setInteriorId] = useState(0);
  const [isNavigate2, setIsNavigate2] = useState('');

  const [isInteriorModalOpen, setIsInteriorModalOpen] = useState(false);
  const handleInteriorModal = () => {
    setIsInteriorModalOpen(!isInteriorModalOpen);
  };

  const handleInteriorDetail = id => {
    setInteriorId(id); // 인테리어 id 설정해주고
    setIsNavigate2(true); // useEffect 실행해 해당 id 인테리어 상세 모달 띄우기
  };
  useEffect(() => {
    if (isNavigate2) {
      setIsInteriorModalOpen(true);
      setIsNavigate2(false);
    }
  }, [isNavigate2]);

  return (
    <>
      <UDContainer>
        <Form>
          <TransContainer>
            <ImageP src={plant.plantImage} alt="" />
            <div>
              <h1>아무꽃이나말해{plant.plantName}</h1>
              <span style={{ wordBreak: 'keep-all' }}>
                작품의 배경은 이탈리아의 베로나. 이 곳에 몬테규 가문과 캐퓰렛
                가문이라는 두 가문이 서로 반목하고 있었다. 둘 다 권세가 있는
                도시 귀족 집안이라 이들 집안에 고용된 하인들이 많았는데, 이들은
                서로 길거리에서 보기라도 하면 으르렁거리기 일쑤였다.
                도입부에서는 두 집안의 하인들끼리 벌인 싸움이 두 가문의 귀족
                청년인 벤볼리오와 티볼트의 싸움으로 번지고, 이어서 시민들의 집단
                싸움으로 커지고 만다. 이 꼴을 보다 못한 베로나 영주 에스칼루스
                대공이 싸움 현장에 행차하여 이제부터 두 집안이 한 번만 더 소란을
                벌이면 엄벌을 내리겠다"고 엄명을 내리기에 이른다.
                {plant.plantDescription}
              </span>
            </div>
          </TransContainer>
          <hr />

          <MypageButton onClick={handleRecent} style={{ paddingLeft: '1rem' }}>
            최신순
          </MypageButton>
          <MypageButton onClick={handlePopular}>인기순</MypageButton>

          <span
            style={{
              display: 'inline-block',
              display: 'flex',
              float: 'right',
            }}
          >
            <SelectButton
              onClick={() => handleInteriorWrite(plant.id)}
              style={{ marginBottom: '1rem' }}
            >
              나도 뽐내기
            </SelectButton>
          </span>

          <Interiors>
            {interiorsArray.map(interior => {
              return (
                <>
                  <TButton onClick={() => handleInteriorDetail(interior.id)}>
                    <ImageI src={interior.image} alt="" />
                  </TButton>
                </>
              );
            })}

            <TButton onClick={() => handleInteriorDetail(1)}>
              <ImageI src="../images/logo.png" alt="" />
            </TButton>
            {/* 인테리어 상세 모달 */}
            {isInteriorModalOpen ? (
              <Modal3 handleModal={handleInteriorModal}>
                <InteriorDetail
                  handleInteriorModal={handleInteriorModal}
                  interiorId={interiorId}
                />
              </Modal3>
            ) : null}
          </Interiors>
        </Form>
      </UDContainer>
    </>
  );
}
export default PlantDetail;
