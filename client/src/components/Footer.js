import styled from 'styled-components';
import { GoMarkGithub, GoMail } from 'react-icons/go';
import { BsHammer } from 'react-icons/bs';

const Container = styled.div`
  position: relative;

  display: grid;
  place-items: center;

  width: 100%;

  box-sizing: border-box;
  padding: 3rem 0;

  background-color: #bcbcbc;
`;
const Title = styled.div`
  //font-size: 5rem;
  display: flex;
  a {
    position: relative;
    top: 0.1rem;

    margin-right: 0.5rem;
    color: black;
  }
  .head {
    margin: 0 0.5rem;
    margin-bottom: 2rem;
  }

  @media screen and (max-width: 760px) {
    .head {
      margin-bottom: 0.5rem;
    }
  }
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;

  .card {
    display: grid;
    place-items: center;
    margin-right: 3rem;
    margin-bottom: 2rem;

    &:last-child {
      margin-right: 0;
    }

    .link_wrapper {
      display: flex;
      align-items: center;

      margin-top: 0.1rem;

      column-gap: 0.5rem;
    }

    a {
      color: black; //메일 아이콘
      margin-top: 0.5rem;
    }
    a:visited {
      color: black; //깃허브 아이콘
    }
  }

  .name {
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }
  .position {
    font-weight: 500;
    font-size: 0.8rem;
  }
  .mail {
    font-size: smaller;
  }

  @media screen and (max-width: 760px) {
    display: grid;

    .card {
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 1.5rem;

      margin: 0;

      .position,
      .name,
      .link_wrapper {
        margin: 0;
        display: flex;
      }

      .link_wrapper {
        position: relative;
        top: -0.2rem;
      }
    }
  }
`;

const Copyright = styled.div`
  display: flex;
  margin-top: 0.5rem;
  font-weight: lighter;
  font-size: 0.8rem;
`;

const curruntYear = () => {
  const date = new Date();
  const year = date.getFullYear();

  return year;
};

function Footer() {
  return (
    <Container>
      <Title>
        <div className="head">About us</div>
        <div>
          <a
            title="프로젝트 레포지토리로 이동합니다."
            href="https://github.com/codestates/pida"
          >
            <GoMarkGithub />
          </a>
          <a
            title="프로젝트 wiki 로 이동합니다."
            href="https://github.com/codestates/Pida/wiki"
          >
            <BsHammer size={'1.1rem'} />
          </a>
        </div>
      </Title>
      <InnerContainer>
        <div className="card">
          <div className="name">김수현</div>
          <div className="position">Back-End</div>
          <div className="link_wrapper">
            <a
              title="Github 프로필로 이동합니다."
              href="https://github.com/suxxzzy"
            >
              <GoMarkGithub size={'1.1rem'} />
            </a>
            <a
              title="해당 팀원의 Velog로 이동합니다."
              href="https://velog.io/@suxxzzy"
            >
              <VelogIcon />
            </a>
            <a
              title="해당 팀원에게 메일을 발신합니다."
              className="mail"
              href="mailto:abcc0785@gmail.com"
            >
              <GoMail size={'1.4rem'} />
            </a>
          </div>
        </div>
        <div className="card">
          <div className="name">강형석</div>
          <div className="position">Back-End</div>
          <div className="link_wrapper">
            <a
              title="Github 프로필로 이동합니다."
              href="https://github.com/neroaki"
            >
              <GoMarkGithub size={'1.1rem'} />
            </a>
            <a
              title="해당 팀원의 Notion 으로 이동합니다."
              href="https://www.notion.so/PLVS-VLTRA-9e01635bb32e4aaa9962a06443932747"
            >
              <NotionIcon />
            </a>
            <a
              title="해당 팀원에게 메일을 발신합니다."
              className="mail"
              href="mailto:neroaki14.epreuve@gmail.com"
            >
              <GoMail size={'1.4rem'} />
            </a>
          </div>
        </div>
        <div className="card">
          <div className="name">김수하</div>
          <div className="position">Front-End</div>
          <div className="link_wrapper">
            <a
              title="Github 프로필로 이동합니다."
              href="https://github.com/osuhao"
            >
              <GoMarkGithub size={'1.1rem'} />
            </a>
            <a
              title="해당 팀원의 Velog로 이동합니다."
              href="https://velog.io/@oksho15"
            >
              <VelogIcon />
            </a>

            <a
              title="해당 팀원에게 메일을 발신합니다."
              className="mail"
              href="mailto:suha970829@gmail.com"
            >
              <GoMail size={'1.4rem'} />
            </a>
          </div>
        </div>
        <div className="card">
          <div className="name">장유리</div>
          <div className="position">Front-End</div>
          <div className="link_wrapper">
            <a
              title="Github 프로필로 이동합니다."
              href="https://github.com/yuriiiiiiiiiii"
            >
              <GoMarkGithub size={'1.1rem'} />
            </a>
            <a
              title="해당 팀원의 Tistory로 이동합니다."
              href="https://begin-to-end-project.tistory.com/"
            >
              <TistoryIcon />
            </a>
            <a
              title="해당 팀원에게 메일을 발신합니다."
              className="mail"
              href="mailto:angel22110@gmail.com"
            >
              <GoMail size={'1.4rem'} />
            </a>
          </div>
        </div>
      </InnerContainer>
      <Copyright>
        <div className="copy">
          Copyright © {curruntYear()} What All rights reserved
        </div>
      </Copyright>
    </Container>
  );
}
export default Footer;

const TistoryIcon = () => {
  return (
    <svg
      fill="currentColor"
      stroke="currentColor"
      width="0.9rem"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 408.4 408.4"
    >
      <g>
        <circle className="cls-1" cx="58.18" cy="58.18" r="58.18" />
        <circle className="cls-1" cx="204.2" cy="58.18" r="58.18" />
        <circle className="cls-1" cx="204.2" cy="204.2" r="58.18" />
        <circle className="cls-1" cx="204.2" cy="350.22" r="58.18" />
        <circle className="cls-1" cx="350.22" cy="58.18" r="58.18" />
      </g>
    </svg>
  );
};

const NotionIcon = () => {
  return (
    <svg
      height="1.1rem"
      width="1.1rem"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="12 0.18999999999999906 487.619 510.941"
    >
      <path
        d="M96.085 91.118c15.81 12.845 21.741 11.865 51.43 9.884l279.888-16.806c5.936 0 1-5.922-.98-6.906L379.94 43.686c-8.907-6.915-20.773-14.834-43.516-12.853L65.408 50.6c-9.884.98-11.858 5.922-7.922 9.883zm16.804 65.228v294.491c0 15.827 7.909 21.748 25.71 20.769l307.597-17.799c17.81-.979 19.794-11.865 19.794-24.722V136.57c0-12.836-4.938-19.758-15.84-18.77l-321.442 18.77c-11.863.997-15.82 6.931-15.82 19.776zm303.659 15.797c1.972 8.903 0 17.798-8.92 18.799l-14.82 2.953v217.412c-12.868 6.916-24.734 10.87-34.622 10.87-15.831 0-19.796-4.945-31.654-19.76l-96.944-152.19v147.248l30.677 6.922s0 17.78-24.75 17.78l-68.23 3.958c-1.982-3.958 0-13.832 6.921-15.81l17.805-4.935V210.7l-24.721-1.981c-1.983-8.903 2.955-21.74 16.812-22.736l73.195-4.934 100.889 154.171V198.836l-25.723-2.952c-1.974-10.884 5.927-18.787 15.819-19.767zM42.653 23.919l281.9-20.76c34.618-2.969 43.525-.98 65.283 14.825l89.986 63.247c14.848 10.876 19.797 13.837 19.797 25.693v346.883c0 21.74-7.92 34.597-35.608 36.564L136.64 510.14c-20.785.991-30.677-1.971-41.562-15.815l-66.267-85.978C16.938 392.52 12 380.68 12 366.828V58.495c0-17.778 7.922-32.608 30.653-34.576z"
        fillRule="evenodd"
      />
    </svg>
  );
};

const VelogIcon = () => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="1.1rem"
      height="1.1rem"
      viewBox="0 0 191.000000 193.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,193.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path
          d="M186 1923 c-31 -8 -99 -53 -124 -82 -13 -14 -32 -44 -42 -66 -19 -38
            -20 -71 -20 -807 0 -577 3 -774 12 -795 24 -55 69 -102 126 -130 l57 -28 750
            -3 c841 -3 798 -6 881 70 23 21 51 61 63 88 21 50 21 53 19 797 l-3 748 -28
            58 c-34 69 -82 118 -134 137 -31 12 -174 15 -788 16 -412 1 -759 0 -769 -3z
            m653 -503 c10 -5 22 -17 26 -27 7 -18 60 -302 96 -518 11 -66 23 -128 27 -138
            11 -26 122 129 181 252 42 88 46 102 46 173 0 72 -2 79 -30 108 -16 18 -42 38
            -58 46 -23 13 -26 18 -16 35 6 11 31 34 57 50 38 24 56 29 110 29 82 0 115
            -19 142 -81 26 -62 25 -83 -6 -171 -48 -133 -184 -349 -364 -577 l-71 -89 -90
            -7 c-49 -4 -92 -6 -94 -4 -2 2 -34 176 -71 387 l-68 382 -88 0 -89 0 3 47 c3
            53 -10 45 153 88 96 25 175 31 204 15z"
        />
      </g>
    </svg>
  );
};
