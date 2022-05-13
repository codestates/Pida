import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Login from '../../components/Sign/Login';
import {
  SelectButton,
  TButton,
  MypageButton,
  ManagerButton,
} from '../../components/Button';
import { UDContainer, TransContainer } from '../../components/Container';
import { ImageP, ImageI } from '../../components/Image';
import { CCModal, Modal3 } from '../../components/Modal';
import InteriorDetail from '../Interior/InteriorDetail';

// 가로 스크롤 생기는 특정 부분
const Interiors = styled.div`
  width: 100%;
  height: 11.5rem;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
`;

function PlantDetail() {
  const managerId = process.env.REACT_APP_MANAGER_ID;
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
          plantSize: res.data.data.plantSize,
          plantSpace: res.data.data.plantSpace,
          plantSpecies: res.data.data.plantSpecies,
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
        setInteriorsArray(res.data.data.interiorsArray);
      });
  };

  /* 나도 뽐내기 버튼 클릭 시, 글쓰기 페이지로 이동 */
  const [plantId, setPlantId] = useState(0);
  const [isNavigate, setIsNavigate] = useState('');

  // 로그인 모달
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const handleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const handleInteriorWrite = id => {
    if (!localStorage.getItem('loginUserId')) {
      setIsLoginModalOpen(true); // 로그인 하지 않았다면 로그인 모달 띄움
    } else {
      setPlantId(id);
      setIsNavigate(true);
    }
  };
  useEffect(() => {
    if (isNavigate) {
      history.push({
        pathname: `/plants/${plantId}/interiors`,
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
    setInteriorId(id);
    setIsNavigate2(true);
  };
  useEffect(() => {
    if (isNavigate2) {
      setIsInteriorModalOpen(true);
      setIsNavigate2(false);
    }
  }, [isNavigate2]);

  /* 식물 수정 (식물 관리자용) */
  const handleModifyPlant = () => {
    history.push({
      pathname: `/plants/${plant.id}/modify`,
      state: { plant: plant },
    });
  };

  /* 식물 삭제 (식물 관리자용) */
  const [isDeletePlantModalOpen, setIsDeletePlantModalOpen] = useState(false);
  const handleDeletePlantModal = () => {
    setIsDeletePlantModalOpen(!isDeletePlantModalOpen);
  };

  const handleDeletePlant = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/plants/${plant.id}`, {
        withCredentials: true,
      })
      .then(res => {
        alert('식물 삭제 완료');
        history.replace('/search');
      });
  };

  return (
    <>
      <UDContainer>
        <div style={{ width: '95%' }}>
          {/* 관리자라면 수정 삭제 버튼 보이기 */}
          {localStorage.getItem('loginUserId') === managerId ? (
            <span
              style={{
                display: 'inline-block',
                display: 'flex',
                float: 'right',
              }}
            >
              <ManagerButton onClick={handleModifyPlant}>수정</ManagerButton>
              <ManagerButton onClick={handleDeletePlantModal}>
                삭제
              </ManagerButton>
              {isDeletePlantModalOpen ? (
                <CCModal
                  handleModal={handleDeletePlantModal}
                  handleAction={handleDeletePlant}
                >
                  정말로 삭제하시겠습니까?
                </CCModal>
              ) : null}
            </span>
          ) : null}

          <TransContainer>
            <ImageP src={plant.plantImage} alt="" />
            <div>
              <h1>{plant.plantName}</h1>
              <span style={{ wordBreak: 'keep-all' }}>
                {plant.plantDescription}
              </span>
            </div>
          </TransContainer>
          <hr style={{ marginTop: '2rem' }} />
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
        </div>
      </UDContainer>

      {/* 글 작성은 로그인 필요 */}
      {isLoginModalOpen ? (
        <Login
          handleModal={handleLoginModal}
          setIsLoginModalOpen={setIsLoginModalOpen}
        />
      ) : null}
    </>
  );
}
export default PlantDetail;
