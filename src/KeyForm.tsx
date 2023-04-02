import React, { FormEvent } from 'react';
import styled from 'styled-components';

type Props = {
  onValidKey: (key: string) => void;
};

const Form = styled.form`
  align-self: center;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template: "label label"
                 "input button";
  flex-direction: column;
  width: 40rem;
  grid-gap: 0.5rem;
  input {
    grid-area: input;
  }
  label {
    color: var(--color-white);
    grid-area: label;
  }
  button {
    width: min-content;
    grid-area: button;
  }
`;

export default function KeyForm(props: Props) {
  const [key, setKey] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  async function handle() {
    setError(null);

    if (key === '') {
      setError('API key must not be empty!');
    } else {
      const url = 'https://api.openai.com/v1/models';
      try {
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${key}`,
          },
        });
        if (!response.ok) {
          throw 'Something went wrong';
        }
        props.onValidKey(key);
      } catch {
        setError('Something went wrong verifying the API key');
      }
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handle();
  }

  return (
    <Form onSubmit={onSubmit}>
      {error && <span>{error}</span>}
      <label htmlFor='input-key'>Add your OpenAI API key here</label>
      <input
        autoFocus
        value={key}
        type='password'
        onChange={(e) => setKey(e.target.value)}
        placeholder='sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      />
      <button>Submit</button>
    </Form>
  );
}
