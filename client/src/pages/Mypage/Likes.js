import React, { useState, useEffect } from 'react';
import { TButton } from '../../components/Button';
import { Container3, Item } from '../../components/Container';
import { ImageR } from '../../components/Image';
import { Modal3 } from '../../components/Modal';
import InteriorDetail from '../Interior/InteriorDetail';

function Likes(props) {
  /* 인테리어 사진 클릭 시, 인테리어 상세 모달 띄우기 */
  const [interiorId, setInteriorId] = useState(0);
  const [isNavigate, setIsNavigate] = useState(false);

  const [isInteriorModalOpen, setIsInteriorModalOpen] = useState(false);
  const handleInteriorModal = () => {
    setIsInteriorModalOpen(!isInteriorModalOpen);
  };
  const handleInteriorDetail = id => {
    setInteriorId(id);
    setIsNavigate(true);
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
        {props.likesArray.map(like => {
          return (
            <Item>
              <TButton onClick={() => handleInteriorDetail(like.id)}>
                <ImageR src={like.image} alt="" />
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
      </Container3>
    </>
  );
}
export default Likes;
