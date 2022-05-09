import styled from 'styled-components';

export const MiniContainer = styled.div`
  display: flex;
  flex-direction: column; // 아이템들 세로로 정렬
  align-items: center; // 좌우 가운데로 정렬
`;

export const Container = styled(MiniContainer)`
  min-height: 90vh;
  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  }
`;

export const UDContainer = styled(Container)`
  justify-content: center; // 상하 가운데로 정렬
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column; // 아이템들 세로로 정렬
  align-items: flex-end;
`;

// 아이템들 가로로 정렬
export const ContainerRow = styled.div`
  width: 100%;
  display: flex;
`;

// 화면 넘어가면 밑줄로
export const ContainerRow2 = styled(ContainerRow)`
  //justify-content: start;
  flex-wrap: wrap;
`;

export const ModalContainer = styled(Container)`
  height: 90vh; // 너 뭔데
`;

export const Form = styled.div`
  width: 95%;
`;

// 사진 정렬할때 묶는 용도 (SearchResult, Mypage)
export const Item = styled.div`
  width: 13rem;
  height: 13rem;
  padding: 0 1.5rem 5rem 1.5rem;

  @media screen and (max-width: 760px) {
    width: 9rem;
    height: 9rem;
    padding: 0rem 3rem 7rem 3rem;
  }
`;

// 데스크탑에서는 가로정렬, 모바일에서는 세로정렬
export const TransContainer = styled.div`
  display: flex;
  justify-content: center;
  @media screen and (max-width: 760px) {
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
    margin: 2rem;
  }
`;
