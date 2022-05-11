import React, { useState, useEffect } from 'react';
import { TButton } from '../../components/Button';
import { Container3, Item } from '../../components/Container';
import { ImageR } from '../../components/Image';
import { Modal3 } from '../../components/Modal';
import InteriorDetail from '../Plant/InteriorDetail';

function Uploads(props) {
  /* 인테리어 사진 클릭 시, 인테리어 상세 모달 띄우기 */
  const [interiorId, setInteriorId] = useState(0);
  const [isNavigate, setIsNavigate] = useState(false);

  const [isInteriorModalOpen, setIsInteriorModalOpen] = useState(false);
  const handleInteriorModal = () => {
    setIsInteriorModalOpen(!isInteriorModalOpen);
  };
  const handleInteriorDetail = id => {
    setInteriorId(id); // 인테리어 id 설정해주고
    setIsNavigate(true); // useEffect 실행해 해당 id 인테리어 상세 모달 띄우기
  };
  useEffect(() => {
    if (isNavigate) {
      setIsInteriorModalOpen(true);
      setIsNavigate(false);
    }
  }, [isNavigate]);

  return (
    <>
      <Container3>
        {props.uploadsArray.map(upload => {
          return (
            <Item>
              <TButton onClick={() => handleInteriorDetail(upload.id)}>
                <ImageR src={upload.image} alt="" />
              </TButton>
            </Item>
          );
        })}
        {/* 인테리어 상세 모달 */}
        {isInteriorModalOpen ? (
          <Modal3 handleModal={handleInteriorModal}>
            <InteriorDetail
              handleInteriorModal={handleInteriorModal}
              interiorId={interiorId}
              getMypage={props.getMypage}
            />
          </Modal3>
        ) : null}
        <Item>
          <TButton onClick={() => handleInteriorDetail(0)}>
            <ImageR src="../../images/logo.png" alt="" />
          </TButton>
        </Item>
        <Item>
          <TButton onClick={() => handleInteriorDetail(0)}>
            <ImageR src="../../images/logo.png" alt="" />
          </TButton>
        </Item>
        <Item>
          <TButton onClick={() => handleInteriorDetail(0)}>
            <ImageR src="../../images/logo.png" alt="" />
          </TButton>
        </Item>
        <Item>
          <TButton onClick={() => handleInteriorDetail(0)}>
            <ImageR src="../../images/logo.png" alt="" />
          </TButton>
        </Item>
        <Item>
          <TButton onClick={() => handleInteriorDetail(0)}>
            <ImageR src="../../images/logo.png" alt="" />
          </TButton>
        </Item>
        <Item>
          <TButton onClick={() => handleInteriorDetail(0)}>
            <ImageR src="../../images/logo.png" alt="" />
          </TButton>
        </Item>
        <Item>
          <TButton onClick={() => handleInteriorDetail(0)}>
            <ImageR src="../../images/logo.png" alt="" />
          </TButton>
        </Item>
      </Container3>
    </>
  );
}
export default Uploads;
