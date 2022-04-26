import styled from 'styled-components';

export const GridImage = styled.div`
  /*그리드*/
  display: grid;
  padding: 3rem 0 0 10rem;
  width: 90%;
  grid-template-rows: repeat(2, 22rem); //보여지는 화면 2줄
  grid-template-columns: repeat(5, 13rem); //5개씩 보여짐
`;
export const PlantImage = styled.img`
  /* 식물사진 15*15 사이즈 비율에 맞게 자르기*/
  width: 10rem;
  height: 10rem;
  transform: translate(50, 50);
  object-fit: cover;
  //margin: auto;
`;

export const PlantName = styled.div`
  /* 식물이름 */
  font-size: 1rem;
`;
export const GroupPlant = styled.div``;
