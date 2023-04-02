import React from 'react';
import styled from 'styled-components';
import { Message } from '../types';

const Section = styled.section`
  border: 4px solid rebeccapurple;
  display: flex;
  flex-direction: column;
  overflow: auto;
  flex: 1 1 auto;
`;

const ListStyle = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  flex: 1;
  justify-content: flex-end;
  max-width: 60rem;
  min-width: 30rem;
  align-self: center;
  border: 4px solid pink;

  li {
    align-items: center;
    background-color: #f1f0f0;
    border-radius: 15px;
    color: #000;
    display: flex;
    margin-bottom: 10px;
    max-width: 60%;
    padding: 10px 15px;
  }

  .user {
    justify-content: flex-end;
    margin-left: auto;
    border-bottom-right-radius: 0;
  }
  .assistant {
    justify-content: flex-start;
    margin-right: auto;
    border-bottom-left-radius: 0;
  }
`;

type Props = {
  messages: Array<Message>;
  isLoading: boolean;
};

export default function List(props: Props) {
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  });

  return (
    <Section ref={ref}>
      <ListStyle>
        {props.messages.map((m: Message, i: number) => {
          return (
            <li key={`message-${i}`} className={m.role}>
              {m.content}
            </li>
          );
        })}
        {props.isLoading && <li className='assistant'>...</li>}
      </ListStyle>
    </Section>
  );
}
