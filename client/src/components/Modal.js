import React from 'react';
import styled from 'styled-components';
import { ConfirmButton } from '../components/Button';

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
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  animation: modal-bg-show 0.3s;

  /* ModalView 가운데 정렬 */
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalView = styled.div.attrs(props => ({ role: 'dialog' }))`
  top: 4.5rem;
  padding: 1.5rem;
  width: 20rem;
  min-height: 5rem;
  background-color: white;
  border-radius: 10px;
  font-size: 1.3rem;

  /* Contents 가운데 정렬 */
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalView2 = styled.div.attrs(props => ({ role: 'dialog' }))`
  top: 4.5rem;
  padding: 1.5rem;
  width: 36rem;
  height: 38rem;
  background-color: white;
  border-radius: 10px;

  /* Contents 가운데 정렬 */
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 760px) {
    width: 26rem;
    height: 35rem;
  }
`;
const ModalView3 = styled.div.attrs(props => ({ role: 'dialog' }))`
  top: 4.5rem;
  padding: 2rem;
  width: 46rem;
  max-height: 90%;
  overflow-y: auto;
  background-color: white;
  border-radius: 10px;

  /* Contents 가운데 정렬 */
  display: flex;
  align-items: center;
  justify-content: center;

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
          <Contents>
            {children}
            <ConfirmButton onClick={handleModal}>확인</ConfirmButton>
          </Contents>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
}

export function CCModal({ handleModal, handleAction, children, ...rest }) {
  return (
    <ModalContainer>
      <ModalBackdrop onClick={handleModal}>
        <ModalView
          onClick={event => {
            event.stopPropagation();
          }}
        >
          <Contents>
            {children}
            <span>
              <ConfirmButton onClick={handleModal}>취소</ConfirmButton>
              <ConfirmButton onClick={handleAction}>확인</ConfirmButton>
            </span>
          </Contents>
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
