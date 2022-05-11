import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column; // 아이템들 세로로 정렬
  align-items: center; // 좌우 가운데로 정렬
  width: 100vw;
  min-height: calc(var(--vh, 1vh) * 80);
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

export const ModalContainer = styled(Container)`
  height: 90vh; // 너 뭔데
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
    //margin: 2rem;
  }
`;

/* grid */
// 한 페이지를
export const Container1 = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr); // 세로 12칸으로 나눠서
  width: 1200px;
  height: max-content;
`;
export const Container2 = styled.div`
  //position: relative;
  grid-column: 2 / 12; // 양 끝 칸 빼고 컨텐츠를 채운다
  height: max-content;
`;

// Item 정렬
export const Container3 = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
  justify-items: center;
  grid-column-gap: 20px;
  grid-row-gap: 30px;

  width: 100%;
  height: max-content;
`;
export const Item = styled.div`
  width: 13rem;
  height: 13rem;
  padding: 0 1.5rem 5rem 1.5rem;
`;
