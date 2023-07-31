import React from 'react'
import { Container, Header, List, ListElement, MainContainer } from './AboutPage.styled'
import Footer from '../../components/Footer/Footer'

function AboutPage() {
  return (
    <>
    <MainContainer>
        <Container>
            <Header>Technologies</Header>
            <List>
                <ListElement>React</ListElement>
                <ListElement>Typescript</ListElement>
                <ListElement>Node</ListElement>
                <ListElement>Express</ListElement>
                <ListElement>MongoDB</ListElement>
            </List>
        </Container>
        
        <Container>
            <Header>NPM packages</Header>
            <List>
                <ListElement>Styled Components</ListElement>
                <ListElement>SwiperJS</ListElement>
                <ListElement>Fortawesome Icons</ListElement>
                <ListElement>Styled Icons</ListElement>
                <ListElement>Framer Motion</ListElement>
                <ListElement>JS Cookie</ListElement>
                <ListElement>React Hook Form</ListElement>
                <ListElement>React Router DOM</ListElement>
                <ListElement>React Scripts</ListElement>
                <ListElement>React Tooltip</ListElement>
            </List>
        </Container>
    </MainContainer>
    <Footer/>
    </>
  )
}

export default AboutPage