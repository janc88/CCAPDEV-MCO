import React from 'react';
import { Container } from './styles/Container.styled';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchSection from './components/SearchSection';

function App() {

  return (
    <BrowserRouter>
        <Container>
            <Navbar/>

            <SearchSection/>
        </Container>
    </BrowserRouter>
  );
}

export default App;
