import React, { FormEvent } from 'react';
import styled from 'styled-components';

const Layout = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  height: 100%;
`;

const Header = styled.header`
  border: 4px solid papayawhip;
  display: flex;
  flex: 0 1 auto;
  button {
    margin-left: auto;
  }
`;

const List = styled.ul`
  border: 4px solid cyan;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow: auto;
  justify-content: flex-end;

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
  }
  .assistant {
    justify-content: flex-start;
    margin-right: auto;
  }
`;

const Footer = styled.footer`
  border: 4px solid rebeccapurple;
  flex: 0 1 auto;
  display: flex;
`;

type Props = {
  clearToken: () => void;
  token: string;
};

type Message = {
  role: 'user' | 'system' | 'assistant',
  content: string
};

export default function Main(props: Props) {
  const [prompt, setPrompt] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [messages, setMessages] = React.useState<Message[]>([{
    role: 'system',
    content: 'you are a helpful assistant'
  }]);

  async function handle() {

    const sentMessage:Message = {
      role: 'user',
      content: prompt
    };

    const nextMessages = [...messages, sentMessage];

    setIsLoading(true);
    setMessages(nextMessages);
    const url ='https://api.openai.com/v1/chat/completions';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.token}`
        },
        body: JSON.stringify({
          "model": "gpt-3.5-turbo",
          "messages": nextMessages
        })
      })
      if (!response.ok) {
        throw 'Something went wrong';
      }
      const data = await response.json();

      setError(null);
      setPrompt('');

      const receivedMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content
      };

      setMessages([...nextMessages, receivedMessage]);

    } catch {
      setError('Something went wrong sending the message. Try again?');
    } finally {
      setIsLoading(false);
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handle();
  }

  const [, ...rest] = messages;

  return (
    <Layout>
      <Header>
        <h1>Inspector GPT</h1>
        <button onClick={props.clearToken}>Clear token</button>
      </Header>
      <List>
        {rest.map((m, i) => {
          return (
            <li key={`message-${i}`} className={m.role}>{m.content}</li>
          );
        })}
      </List>
      <Footer>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
          />
          {isLoading && <span>...</span>}
          {error && <span>ERROR {error}</span>}
        </form>
      </Footer>
    </Layout>
  );
}
