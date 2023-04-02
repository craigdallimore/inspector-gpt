import React, { FormEvent } from 'react';
import styled from 'styled-components';
import { Action, Message, State } from './types';

const FooterStyle = styled.footer`
  border-top 1px solid var(--color-white);
  padding: 1rem;
  flex: 0 1 auto;
  display: flex;
  justify-content: center;
`;

type Props = {
  state: State;
  dispatch: (action: Action) => void;
  token: string;
};

export default function Footer(props: Props) {
  const { state, dispatch } = props;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handle();
  }

  async function handle() {
    const sentMessage: Message = {
      role: 'user',
      content: state.prompt,
    };

    dispatch({
      type: 'MESSAGE_SENT',
      payload: sentMessage,
    });

    const url = 'https://api.openai.com/v1/chat/completions';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            state.systemMessage,
            ...state.messages,
            sentMessage
          ],
        }),
      });
      if (!response.ok) {
        throw 'Something went wrong';
      }
      const data = await response.json();

      const receivedMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content,
      };

      dispatch({
        type: 'MESSAGE_RECEIVED',
        payload: receivedMessage,
      });
    } catch (e) {
      dispatch({
        type: 'ERROR_OCCURRED',
        payload: 'Something has gone wrong. Pleaase try again',
      });
    }
  }

  return (
    <FooterStyle>
      <form onSubmit={onSubmit}>
        <input
          autoFocus
          type='text'
          value={state.prompt}
          onChange={(e) =>
            dispatch({ type: 'PROMPT_UPDATED', payload: e.target.value })
          }
          disabled={state.isLoading}
        />
        {state.isLoading && <span>...</span>}
        {state.error && <span>ERROR {state.error}</span>}
      </form>
    </FooterStyle>
  );
}
