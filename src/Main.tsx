import React, { useReducer } from 'react';
import styled from 'styled-components';
import { Action, State } from './types';
import Footer from './Footer';

const Layout = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  width: 100%;
  height: 100%;
`;

const Header = styled.header`
  border-bottom: 1px solid var(--color-white);
  padding: 1rem;
  display: flex;
  flex: 0 1 auto;
  h1 {
    font-weight: bold;
    font-family: VT323;
  }
  button {
    margin-left: auto;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  flex: 1 1 auto;
  overflow: auto;
  justify-content: flex-end;
  max-width: 60rem;
  min-width: 30rem;
  align-self: center;

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
  clearToken: () => void;
  token: string;
};

const initialState: State = {
  messages: [],
  systemMessage: {
    role: 'system',
    content: 'you are a helpful assistant',
  },
  prompt: '',
  isLoading: false,
  error: null
};

const reducer = function(state: State, action: Action):State {

  switch(action.type) {
    case 'PROMPT_UPDATED': {
      return {...state, prompt: action.payload };
    }
    case 'MESSAGE_SENT': {
      return {
        ...state,
        messages: [action.payload, ...state.messages],
        isLoading: true
      };
    }
    case 'MESSAGE_RECEIVED': {
      return {
        ...state,
        messages: [...state.messages, action.payload],
        isLoading: false,
        error: null
      }
    }
    case 'ERROR_OCCURRED': {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    default:
      return state;
  }

}

export default function Main(props: Props) {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Layout>
      <Header>
        <h1>Inspector GPT</h1>
        <button onClick={props.clearToken}>Clear token</button>
      </Header>
      <List>
        {state.messages.map((m, i) => {
          return (
            <li key={`message-${i}`} className={m.role}>
              {m.content}
            </li>
          );
        })}
      </List>
      <Footer
        state={state}
        dispatch={dispatch}
        token={props.token}
      />
    </Layout>
  );
}
