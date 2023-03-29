import React from 'react';
import styled from 'styled-components';
import KeyForm from "./KeyForm";
import Main from "./Main";

const KEY = "OPENAI_API_KEY";

const Section = styled.section`
  border: 4px solid hotpink;
  flex: 1 1 auto;
  display: flex;
  height: 100%;
`;

export default function App() {

  const [token, setToken] = React.useState<string | null>(null);

  async function clearToken() {
    // @ts-ignore
    await browser.storage.local.remove(KEY);
    setToken(null);
  }

  async function storeToken(t: string) {
    // @ts-ignore
    await browser.storage.local.set({[KEY]: t});
    setToken(t);
  }

  React.useEffect(() => {

    // @ts-ignore
    browser.storage.local.get(KEY, (result: {[key: string]: string}) => {

      if (result[KEY]) {
        setToken(result[KEY]);
      }

    });

  }, [])

  return (
    <Section>
      {token ? <Main token={token} clearToken={clearToken}/> : <KeyForm onValidKey={storeToken}/>}
    </Section>
  );
}
