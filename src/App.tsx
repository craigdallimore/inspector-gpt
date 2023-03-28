import React from 'react';
import styled from 'styled-components';
import KeyForm from "./KeyForm";
import Main from "./Main";

const KEY = "OPENAI_API_KEY";

const Section = styled.section`
  border: 4px solid hotpink;
  color: white;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 4px;
`;

export default function App() {

  const [token, setToken] = React.useState<string | null>(null);

  React.useEffect(() => {

    browser.storage.local.get(KEY, (result) => {

      if (result[KEY]) {
        setToken(result[KEY]);
      }

    });

  }, [])

  return (
    <Section>
      {token ? <Main/> : <KeyForm onValidKey={setToken}/>}
    </Section>
  );
}
