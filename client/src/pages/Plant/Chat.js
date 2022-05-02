import styled from 'styled-components';
import { CommentButton } from '../../components/Button';
import {
  UDContainer,
  ContainerRow,
  RightContainer,
} from '../../components/Container';
import { ComentWrite } from '../../components/Input';

import { WriteUser } from '../../components/Div';

const ChatBox = styled.div`
  border: 0.1rem solid black;
  border-radius: 1rem;
  width: 25rem;
  height: 30rem;
  padding: 1rem;
`;

const TotalChat = styled.div`
  overflow-y: scroll;
  width: 25rem;
  height: 25rem;
  margin-bottom: 1rem;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const MyChat = styled.div`
  //나의 채팅
  display: inline-block;
  background-color: rgb(163, 163, 163);
  color: white;
  max-width: 15rem;
  border-radius: 1rem;
  padding: 0.8rem;
  margin: 0.5rem 0 0.5rem 0;
`;

const YourChat = styled(MyChat)`
  //상대의 채팅
  background-color: #3ba914;
`;

function Chat() {
  return (
    <>
      <UDContainer>
        <WriteUser style={{ margin: '0 23rem 0.5rem 0' }}>오박사</WriteUser>

        <ChatBox style={{ marginTop: '0rem' }}>
          <TotalChat>
            <RightContainer>
              <MyChat>안녕하세요. 인테리어 잘봤어요</MyChat>
            </RightContainer>
            <YourChat>네 감사합니다^^</YourChat>
          </TotalChat>
          <ContainerRow>
            <ComentWrite style={{ margin: '0 0 0 0', width: '19rem' }} />
            <CommentButton style={{ margin: '0 0 0 1rem' }}>전송</CommentButton>
          </ContainerRow>
        </ChatBox>
      </UDContainer>
    </>
  );
}

export default Chat;
