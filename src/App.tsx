import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from './styles/Button.styled';
import { Container } from './styles/Container.styled';
import { SearchBar } from './styles/SearchBar.styled';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchSection from './components/SearchSection';

function App() {

  return (
    <BrowserRouter>
        <Container>
            <Navbar/>
            {/* <Button color="red">
                Search
            </Button> */}
            <SearchSection/>
        </Container>
    </BrowserRouter>
  );
}

export default App;
