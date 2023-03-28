import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  border: 4px solid hotpink;
  color: white;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 4px;
`;

export default function App() {
  return (
    <Section>
      <h2>cool</h2>
    </Section>
  );
}
