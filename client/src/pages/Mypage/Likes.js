import React, { useState, useEffect } from 'react';
import { TButton } from '../../components/Button';
import { ContainerRow2, Item } from '../../components/Container';
import { ImageR } from '../../components/Image';
import { Modal3 } from '../../components/Modal';
import InteriorDetail from '../Plant/InteriorDetail';

function Likes(props) {
  /* 인테리어 사진 클릭 시, 인테리어 상세 모달 띄우기 */
  const [interiorId, setInteriorId] = useState(0);
  const [isNavigate, setIsNavigate] = useState('');

  const [isInteriorModalOpen, setIsInteriorModalOpen] = useState(false);
  const handleInteriorModal = () => {
    setIsInteriorModalOpen(!isInteriorModalOpen);
  };
  const handleInteriorDetail = id => {
    setInteriorId(id); // 인테리어 id 설정해주고
    setIsNavigate(true); // useEffect 실행해 해당 id 인테리어 상세 모달 띄우기
  };
  useEffect(() => {
    console.log(interiorId);
    if (isNavigate) {
      setIsInteriorModalOpen(true);
      setIsNavigate(false);
    }
  }, [isNavigate]);

  return (
    <>
      <ContainerRow2>
        {/* 아이템 map시키기 */}
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
            <InteriorDetail handleInteriorModal={handleInteriorModal} />
          </Modal3>
        ) : null}
      </ContainerRow2>
    </>
  );
}
export default Likes;