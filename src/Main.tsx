import React from 'react';

type Props = {
  clearToken: () => void
};

export  default function Main(props: Props) {

  return (
    <main>
      <header>
        <h1>Inspector GPT</h1>
        <button onClick={props.clearToken}>Clear token</button>
      </header>




    </main>
  );

}
