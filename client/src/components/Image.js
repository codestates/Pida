import styled from 'styled-components';
const Image = styled.img`
  transform: translate(50, 50);
  object-fit: cover;
`;

export const ImageP = styled(Image)`
  margin: 0 1.5rem;
  width: 20rem;
  height: 20rem;
`;

export const ImageI = styled(Image)`
  width: 10rem;
  height: 10rem;
`;

export const ImageD = styled(Image)`
  width: 20rem;
  height: 20rem;
`;

export const ImageR = styled(Image)`
  width: 13rem;
  height: 13rem;
  @media screen and (max-width: 760px) {
    width: 7rem;
    height: 7rem;
  }
`;

// 소셜 로그인 아이콘
export const SocialImage = styled.img`
  width: 3rem;
  margin-right: 1rem;

  @media screen and (max-width: 760px) {
    width: 2rem;
    margin-right: 0.5rem;
  }
`;
