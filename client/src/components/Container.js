import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column; // 아이템들 세로로 정렬
  align-items: center; // 좌우 가운데로 정렬
`;

export const SignContainer = styled(Container)`
  justify-content: center; // 좌우 가운데로 정렬
  height: 90vh;
`;
