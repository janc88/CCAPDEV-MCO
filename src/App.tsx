import React from 'react';
import { Container } from './styles/Container.styled';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchSection from './components/SearchSection';
import RestoCarousel from './components/RestoCarousel';
import Footer from './components/Footer';

function App() {

  return (
    <BrowserRouter>
        <Container>
            <Navbar/>

            <SearchSection/>
            <RestoCarousel/>
            <Footer/>
        </Container>
    </BrowserRouter>
  );
}

export default App;
