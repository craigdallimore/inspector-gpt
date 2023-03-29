import React from 'react';
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

  .sent {
    justify-content: flex-end;
    margin-left: auto;
  }
  .received {
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
};

export default function Main(props: Props) {
  return (
    <Layout>
      <Header>
        <h1>Inspector GPT</h1>
        <button onClick={props.clearToken}>Clear token</button>
      </Header>
      <List>
        <li className='sent'>Hi local 1</li>
        <li className='received'>Hi remote 2</li>
        <li className='received'>Hi remote 3</li>
        <li className='received'>Hi remote 4</li>
        <li className='sent'>Hi local 5</li>
      </List>
      <Footer>
        <input type='text' />
      </Footer>
    </Layout>
  );
}
