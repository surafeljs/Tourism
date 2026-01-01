import { useState } from 'react'
import navbarlogo from '../public/images/navbar/navbarlogo.png'
import {BrowserRouter as Router,Routes,Route,Link, Navigate, replace} from 'react-router-dom'
import './/styles/app.css'
import { Home } from './pages/home'
import Create from './pages/Create'
import Signin from './pages/signin'
import { useEffect } from 'react';
import axios from 'axios'
import { FORGOT } from './pages/forgote'
import { RESET } from './pages/reset_password'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
function App() {
 const [token, setToken] = useState(null);
 const [errror, setError] = useState();


useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:9000/dashbord", {
          withCredentials: true,
        });

        if (res.data.status) {
          setToken(res.data.msg.firstname);
        }
      } catch (err) {
      console.log(err);
      
        setError(err.response.data.errors)
      }
    };

    fetchData();
  }, []);
if (errror) {
  return
}
const logout=async()=>{
   try {
        const res = await axios.get("http://localhost:9000/logout",{withCredentials:true} );

        if (res.data.status) {
          console.log(res.data.msg);
          setToken(null); // update state
          window.location.replace('/')
        }
      } catch (err) {
        console.error(err);
      }
}
  return (

    
    <>
    <div className="App">
      
<Router>
<Box>
  <AppBar className="navbar">
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
      }}
    >
      {/* Logo + Menu */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Logo */}
        <Box
          className="logo"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <img src={navbarlogo} alt="logo" width={80} />
          <Typography variant="h6">Tourism Ethiopia</Typography>
        </Box>

        {/* Mobile Menu Icon */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Nav Links */}
      <Box
        className="navlink"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
          alignItems: { xs: "stretch", md: "center" },
          justifyContent: "center",
          gap: 2,
          mt: { xs: 2, md: 0 },
        }}
      >
        {[
          { label: "Home", path: "/" },
          { label: "Gallery", path: "/gallery" },
          { label: "Videos", path: "/videos" },
          { label: "About", path: "/about" },
          { label: "Contact", path: "/contact" },
          { label: "Signin", path: "/signin" },
        ].map((item, i) => (
          <Link
            key={i}
            to={item.path}
            style={{
              width: "100%",
              textAlign: "center",
              padding: "8px 0",
              textDecoration: "none",
              color: "white",
            }}
          >
            {item.label}
          </Link>
        ))}

        <Link
        to={'/logout'}
          onClick={logout}
          style={{
            width: "100%",
            textAlign: "center",
            padding: "8px 0",
            cursor: "pointer",
          }}
        >
          LogOut
        </Link>
      </Box>
    </Toolbar>
  </AppBar>
</Box>

{/*             
  //    <Box>
  //           <AppBar className="navbar">
  //             <Toolbar>
  //               <Box className="logo">
  //                 <img src={navbarlogo} alt="logo" width={80}  />
  //                 <Typography >Tourism Ethiopia</Typography>
  //             </Box>
  //             <Box className="navlink">
  // <Link to={'/'} className="link">Home</Link>
  // <Link to={'/gallery'}className="link">Gallery</Link>
  // <Link to={'/videos'}className="link">Videos</Link>
  // <Link to={'/about'}className="link">About</Link>
  // <Link to={'/contact'}className="link">Contact</Link>
  // <Link to={'/Create'}className="link">Create</Link>
  // <Link to={'/signin'}className="link">Sign In</Link>
  
  
  //             </Box>
  //                <IconButton edge="start" color='inherit' >
  //                 <MenuIcon />
  //               </IconButton>
  //             </Toolbar>
  //         </AppBar> 


  //    </Box> */}
  
  <Routes>

    <Route path={'/'} element={    <Home  token={token} /> }></Route>
    <Route path={'/Create'} element={ <Create/>}></Route>
    <Route path={'/signin'} element={ <Signin  />}></Route>
    <Route path={'/forgote'} element={ <FORGOT  />}></Route>
    <Route path={'/reset/:id'} element={ <RESET  />}></Route>


    







    

    
  </Routes>
</Router>


    </div>
      
    </>
  )
}

export default App
