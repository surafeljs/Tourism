import React, { useState,useEffect } from 'react';
import { CopyWrite } from '../components/copywrite';
import '../styles/copywrite.css'
import '../styles/home.css'

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import{   Autocomplete, Box,IconButton, Button, ButtonGroup, Checkbox, Container, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, ListItem, MenuItem, Paper, Snackbar, Stack, Switch, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'

 import lalibela from '../../public/images/section/lalibela.jpg'
import abay from '../../public/images/section/abay.jpeg'
import lalibela1 from '../../public/images/section/lalibela (1).jpg'
import konso from '../../public/images/section/konso.jpg'
import sof from '../../public/images/section/sof.jpeg'
import harar from '../../public/images/section/harar.jpeg'



const images = [lalibela,sof, konso, abay];



export const Home=({token})=>{

const [index, setIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setIndex(prev => (prev + 1) % images.length);
    
  }, 20000);
  
  return () => clearInterval(interval);
}, []);











 const [indexs, setIndexs] = useState(0);

  // const next = () => {
  //   setIndexs((prev) => (prev + 1) % images.length);
  // };

  // const prev = () => {
  //   setIndexs((prev) => (prev - 1 + images.length) % images.length);
  // };

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setIndexs((prev) => (prev + 1) % images.length);
    }, 1000);
    return () => clearInterval(timer);
  }, []);













    return(
<>

<Stack spacing={{xs:5,md:15}}>
  <Container maxWidth={false} className='welcome_page_container' >
  

 <Box className="welcome_page" sx={{ position: "relative", width: "100%" }}>
  <Paper
    elevation={3}
    sx={{
      position: "relative",
      width: "100%",
      height: { xs: 250, md: 350, lg: 500 },
      overflow: "hidden",
      borderRadius: 3,
    }}
  >
    {images.map((item, i) => (
      <Box
        key={i}
        component="img"
        src={item}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
   width: '100%', 
               height: {md:'auto',lg:500}, 
          objectFit: "cover",
          opacity: i === index ? 1 : 0,
          transition: "opacity 0.6s ease-in-out",
        }}
      />
    ))}

    {/* ✅ TEXT OVERLAY */}
    <Typography
      variant="h4"
      sx={{
        position: "absolute",
        zIndex: 2,
        top: "80%",
        left: "50%",
        transform: "translate(-50%, -50%)",

        backgroundColor: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(20px)",
        padding: "10px 30px",
        borderRadius: 2,

        display: { xs: "none", lg: "flex" },
        fontSize: "clamp(30px, 2vw, 80px)",
        fontWeight: 500,
        letterSpacing: 2,
        wordSpacing: 5,
        color: "white",
        textAlign: "center",
      }}
    >
      Welcome to The Land of Origins
    </Typography>
  </Paper>
</Box>


</Container>

<Divider sx={{color:'#90AB8B',fontWeight:500, letterSpacing:6,}}>Tourism Ethiopia</Divider>


<Container  maxWidth={false} >


  <Stack spacing={3} justifyContent={"center"} alignItems="center" textAlign={'center'}>

  <Typography sx={{
    color:'#90AB8B',
           fontSize:'clamp(30px,3vw,80px)', 

  }} >Places to visit in Ethiopia</Typography>
  <Typography variant='h6' sx={{ 
    
        color:'#90AB8B',

 maxWidth: 900,  

          }}>Places to visit in Ethiopia
Jagged peaks in the Simien Mountains, towering limestone cliffs in Tigray, thick jungle thickets in the Bale Mountains, neon acid springs of cinder cone volcanoes in the Danakil Depression. Combined with Ethiopia's cultural diversity and historic monuments, the possibilities for adventure are endless. </Typography>
</Stack>
</Container>


  
<Container maxWidth={false}>
  <Stack
    direction={{ xs: 'column', md: 'row' }}
    spacing={4}
    alignItems="center"
    justifyContent="center"
  >
    {/* Left Image */}
    <Box
      component="img"
      src={abay}
      alt="abay"
      sx={{
        width: { xs: '100%', md: 300 },
        height: 'auto',
        borderRadius: 2,
        objectFit: 'cover',
      }}
    />

    {/* Text Content */}
    <Box sx={{ maxWidth: 500 }}>
      <Typography sx={{color:'#90AB8B',fontWeight:700}} variant="h4" gutterBottom>
        Welcome to Ethiopia
      </Typography>

      <Typography variant="body1" color="text.secondary">
        Ethiopia invites you to discover why it is the origin of so much.
        As you explore this ancient land, you will be put in touch with your
        own origins — for this is the Land of Origins! From the magnificent
        rock-hewn churches of Lalibela to the ancient obelisks of Aksum,
        Ethiopia offers a journey through time like no other.
      </Typography>
    </Box>

    {/* Right Image */}
    <Box
      component="img"
      src={abay}
      alt="abay"
      sx={{
        width: { xs: '100%', md: 300 },
        height: 'auto',
        borderRadius: 2,
        objectFit: 'cover',
      }}
    />
  </Stack>
</Container>

 





<Divider sx={{fontWeight:500, letterSpacing:6, color:'#90AB8B'}}>Tourism Ethiopia</Divider>








  


<Container maxWidth={false}  >
  <Typography sx={{fontWeight:500, letterSpacing:6,color:'#90AB8B', display:'flex', pb:2,justifyContent:"center",fontSize:'clamp(20px,2vw,80px)'}} variant='h4'>Discovery Ethiopia</Typography>
  <Paper elevation={1} sx={{  borderRadius:8, py:{xs:1,md:15}, px:{xs:1,md:5},}}>
  <Stack
  
    spacing={5}
    direction={
     { xs:'column',lg:"row"}
    }
    justifyContent="center"
    alignItems={'center'}
    textAlign={'center'}
  >



{images.map((item,i)=>(
<Box
key={i}
            component="img"
            src={item}
             sx={{
              borderRadius:3,
          width: { xs: "100%", md: 300 },
        height: { xs: 300, md: 200 },
                 objectFit: "cover",
                  opacity: i === index ? 1 : 0.5, 
              transition: "opacity 0.6s ease",
             }}
           
          /> 

))}








  </Stack>
  </Paper>
</Container>

</Stack>
<CopyWrite/>
</>


        
    )
}
















  

