import React, { useState } from 'react';
import { CopyWrite } from '../components/copywrite';
import '../styles/copywrite.css'
import '../styles/home.css'

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import{   Autocomplete, Box, Button, ButtonGroup, Checkbox, Container, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, ListItem, MenuItem, Paper, Snackbar, Stack, Switch, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'

 import lalibela from '../../public/images/section/lalibela.jpg'
import abay from '../../public/images/section/abay.jpeg'
import lalibela1 from '../../public/images/section/lalibela (1).jpg'
import konso from '../../public/images/section/konso.jpg'
import sof from '../../public/images/section/sof.jpeg'
import harar from '../../public/images/section/harar.jpeg'






export const Home=({token})=>{





    return(
<>

<Stack spacing={{xs:5,md:15}}>
  <Container maxWidth={false} className='welcome_page_container' >
  

  <Box className='welcome_page'sx={{position:'relative'}}>
<Paper elevation={3}>


           <Box
      component="img"
      src={lalibela}
      alt="lalibela"
      sx={{
        width: '100%',    
        objectFit:'cover', 
        height: {md:'auto',lg:500},     
        borderRadius: 2,    
      }}
    />
</Paper>
<Box   sx={{

}}>


    <Typography variant='h4'sx={{
      backgroundColor: 'rgba(0,0,0,0.4)', 
      padding: '10px 100px',
      borderRadius:2,
      backdropFilter:'blur(20px)', 
      position:'absolute', 
      display:{xs:'none',sm:'none',md:'none',lg:'flex'}, 
       top:'80%',
        left:'50%', 
         transform: 'translate(-50%,-50%)', 
          wordSpacing:5,
           fontSize:'clamp(30px,2vw,80px)', 
           fontWeight:500,
           color:'white'
           }} className='h2'>Welcome to  The Land of Origins</Typography>

</Box>

       
  </Box>

</Container>

<Divider sx={{color:'#90AB8B',fontWeight:500, letterSpacing:6,}}>Tourism Ethiopia</Divider>




  
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
      <Typography variant="h4" gutterBottom>
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








  


<Container maxWidth={false}>
  <Typography sx={{fontWeight:500, letterSpacing:6,color:'#90AB8B', display:'flex', pb:2,justifyContent:"center",fontSize:'clamp(20px,2vw,80px)'}} variant='h4'>Discovery Ethiopia</Typography>
  <Paper elevation={1} sx={{  borderRadius:8, py:{xs:1,md:15}, px:{xs:1,md:5},}}>
  <Stack
  
    spacing={5}
    direction="row"
    justifyContent="space-around"
  >
    <Box
      component="img"
      src={konso}
      alt="konso"
      sx={{borderRadius:3, width: 350, height: 250, objectFit: "cover" }}
    />

    <Box
      component="img"
      src={sof}
      alt="sof"
      sx={{borderRadius:3, width: 350, height: 250, objectFit: "cover" }}

    />

    <Box
      component="img"
      src={harar}
      alt="harar"
      sx={{borderRadius:3, width: 350, height: 250, objectFit: "cover" }}

    />

    <Box
      component="img"
      src={lalibela1}
      alt="lalibela"
         sx={{borderRadius:3, width: 350, height: 250, objectFit: "cover" }}

    />
  </Stack>
  </Paper>
</Container>

</Stack>
<CopyWrite/>
</>


        
    )
}
















  

