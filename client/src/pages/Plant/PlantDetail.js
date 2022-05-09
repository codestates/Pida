import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import {
  SelectButton,
  TButton,
  MypageButton,
  ManagerButton,
} from '../../components/Button';
import { UDContainer, Form, TransContainer } from '../../components/Container';
import { ImageP, ImageI } from '../../components/Image';
import { Modal, Modal3 } from '../../components/Modal';
import InteriorDetail from './InteriorDetail';

import ModifyPlant from './Management/ModifyPlant';
import DeletePlant from './Management/DeletePlant';

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
        // setPlant({
        //   ...plant,
        //   id: res.data.data.id,
        //   plantName: res.data.data.plantName,
        //   plantImage: res.data.data.plantImage,
        //   plantDescription: res.data.data.plantDescription,
        // });
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
        pathname: '/plants/:id/interiors',
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

  /* 식물 수정 (식물 관리자용) */
  const handleModifyPlant = () => {
    // 식물 정보 들고 이동
    history.push({
      pathname: '/plants/:id/modify',
      state: { plant: plant },
    });
  };

  /* 식물 삭제 (식물 관리자용) */
  const [isDeletePlantModalOpen, setIsDeletePlantModalOpen] = useState(false);
  const handleDeletePlantModal = () => {
    setIsDeletePlantModalOpen(!isDeletePlantModalOpen);
  };
  const handleDeletePlant = () => {
    setIsDeletePlantModalOpen(true); // 삭제 모달 띄움
  };

  return (
    <>
      <UDContainer>
        <Form>
          {/* 관리자라면 수정삭제버튼 보이기 */}
          {localStorage.getItem('loginUserId') === '1' ? (
            <span
              style={{
                display: 'inline-block',
                display: 'flex',
                float: 'right',
              }}
            >
              <ManagerButton onClick={handleModifyPlant}>수정</ManagerButton>
              <ManagerButton onClick={handleDeletePlant}>삭제</ManagerButton>
              {isDeletePlantModalOpen ? (
                <Modal handleModal={handleDeletePlantModal}>
                  <DeletePlant
                    handleDeletePlantModal={handleDeletePlantModal}
                    id={plant.id}
                  />
                </Modal>
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
