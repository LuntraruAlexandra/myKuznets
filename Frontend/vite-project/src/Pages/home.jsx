
// import React from 'react';
// // import { Stack, Container } from '@chakra-ui/react';
// import Navbar from '../Components/Page1/Navbar';
// // import HeroText from '../Components/Page1/HeroText';
// import CascadingBackground from '../Components/Page1/CascadingBackground';
import {Link} from "react-router-dom"
export function Home(){
    return(
        <>
        <h1>Hoome</h1>
        
        <Link to="/">Home</Link>
        <Link to="/page1">Page1</Link>
        <Link to="/page2">Page2</Link>

        {/* <Stack minH="100vh" position="relative"> */}
      {/* <CascadingBackground />  Fundalul animat */}
    {/* <Navbar /> */}
      
      {/* <Container maxW={"1200px"} pt="80px">
        <HeroText />
      </Container>*/}
        {/* </Stack>  */}


        </>
    )
}
