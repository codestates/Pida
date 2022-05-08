import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999; // 제일 위에
  top: 0;
  bottom: 0;
  left: 0;
  right: 0; // 화면 꽉 채우기

  background-color: rgba(0, 0, 0, 0.5); // 투명한 검정색
  backdrop-filter: blur(5px); // 블러 처리
  animation: modal-bg-show 0.3s; // 애니메이션

  /* ModalView 가운데 정렬 */
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalView = styled.div.attrs(props => ({ role: 'dialog' }))`
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있습니다.
  top: 4.5rem;
  padding: 1.5rem;

  background-color: white;
  border-radius: 10px;
  width: 20rem;
  min-height: 5rem;

  /* Contents 가운데 정렬 */
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalView2 = styled.div.attrs(props => ({ role: 'dialog' }))`
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있습니다.
  top: 4.5rem;
  padding: 1.5rem;

  background-color: white;
  border-radius: 10px;
  width: 36rem;
  height: 38rem;
  min-height: 5rem;

  /* Contents 가운데 정렬 */
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 760px) {
    width: 13rem;
    height: 25rem;
  }
`;

const ModalView3 = styled.div.attrs(props => ({ role: 'dialog' }))`
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있습니다.
  top: 4.5rem;
  padding: 2rem;

  background-color: white;
  border-radius: 10px;
  width: 46rem;

  /* Contents 가운데 정렬 */
  display: flex;
  align-items: center;
  justify-content: center;

  /* 스크롤 */
  overflow-y: auto;
  max-height: 90%;

  @media screen and (max-width: 760px) {
    width: 20rem;
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
`;

export function Modal({ handleModal, children, ...rest }) {
  return (
    <ModalContainer>
      <ModalBackdrop onClick={handleModal}>
        <ModalView
          onClick={event => {
            event.stopPropagation();
          }}
        >
          <Contents>{children}</Contents>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
}

export function Modal2({ handleModal, children, ...rest }) {
  return (
    <ModalContainer>
      <ModalBackdrop onClick={handleModal}>
        <ModalView2
          onClick={event => {
            event.stopPropagation();
          }}
        >
          <Contents>{children}</Contents>
        </ModalView2>
      </ModalBackdrop>
    </ModalContainer>
  );
}

export function Modal3({ handleModal, children, ...rest }) {
  return (
    <ModalContainer>
      <ModalBackdrop onClick={handleModal}>
        <ModalView3
          onClick={event => {
            event.stopPropagation();
          }}
        >
          <Contents>{children}</Contents>
        </ModalView3>
      </ModalBackdrop>
    </ModalContainer>
  );
}
