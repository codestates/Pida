import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column; // 아이템들 세로로 정렬
  align-items: center; // 좌우 가운데로 정렬
  min-height: 90vh;
  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  }
`;

export const UDContainer = styled(Container)`
  justify-content: center; // 상하 가운데로 정렬
`;

// 아이템들 가로로 정렬
export const ContainerRow = styled.div`
  width: 100%;
  display: flex;
`;

// 화면 넘어가면 밑줄로
export const ContainerRow2 = styled(ContainerRow)`
  flex-wrap: wrap;
`;
