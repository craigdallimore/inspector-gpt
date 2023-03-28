import React, { FormEvent } from 'react';

type Props = {
  onValidKey: (key: string) => void;
};

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
    <form onSubmit={onSubmit}>
      {error && <span>{error}</span>}
      <label htmlFor='input-key'>Add your OpenAI API key here</label>
      <input
        value={key}
        type='text'
        onChange={(e) => setKey(e.target.value)}
        placeholder='sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      />
      <button>Submit</button>
    </form>
  );
}
