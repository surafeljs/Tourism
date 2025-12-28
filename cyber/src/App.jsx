import { useState } from 'react'
import  './styles/navbar.css'
import navbarlogo from '../public/images/navbar/navbarlogo.png'
import {BrowserRouter as Router,Routes,Route,Link, Navigate, replace} from 'react-router-dom'
import './App.css'
import { Home } from './pages/home'
import Gallery from './pages/gallery'
import { About } from './pages/about'
import  Contact  from './pages/contact'
import Create from './pages/Create'
import Signin from './pages/signin'
import Admin from './pages/admin'
import { useEffect } from 'react';
import axios from 'axios'
import  Videos from './pages/video'

function App() {
 const [token, setToken] = useState(null);
 const [user, setUser] = useState(null);
 const [isAdmin, setIsAdmin] = useState(false);

useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:9000/dashbord", {
          withCredentials: true,
        });

        if (res.data.status) {
          setUser(res.data.msg);
          setToken(res.data.msg.firstname);
          setIsAdmin(Boolean(res.data.isAdmin));
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

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
  {
    token ?  
     <nav className="navbar">
              <div className="logo">
                  <img src={navbarlogo} alt="logo" width={80}  />
                  <h1 >Tourism Ethiopia</h1>
              </div>
              <div className="navlink">
  <Link to={'/'} className="link">Home</Link>
  <Link to={'/gallery'}className="link">Gallery</Link>
  <Link to={'/videos'}className="link">Videos</Link>
  <Link to={'/about'}className="link">About</Link>
  <Link to={'/contact'}className="link">Contact</Link>
              {isAdmin && <Link to={'/admin'} className="link">Admin</Link>}

  <Link className='link' onClick={logout}> Log Out</Link>  
              </div>
          </nav>  
            :   
                 <nav className="navbar">
              <div className="logo">
                  <img src={navbarlogo} alt="logo" width={80}  />
                  <h1 >Tourism Ethiopia</h1>
              </div>
              <div className="navlink">
  <Link to={'/'} className="link">Home</Link>
  <Link to={'/gallery'}className="link">Gallery</Link>
  <Link to={'/videos'}className="link">Videos</Link>
  <Link to={'/about'}className="link">About</Link>
  <Link to={'/contact'}className="link">Contact</Link>

  <Link to={'/Create'}className="link">Create</Link>
  <Link to={'/signin'}className="link">Sign In</Link>
  
  
              </div>
          </nav> 
  }
  <Routes>

    <Route path={'/'} element={    <Home  token={token} /> }></Route>
    <Route path={'/gallery'} element={ <Gallery token={token}/>}></Route>
    <Route path={'/videos'} element={ <Videos/>}></Route>
    <Route path={'/about'} element={ <About/>}></Route>
    <Route path={'/contact'} element={ <Contact/>}></Route>
    <Route path={'/Create'} element={ <Create/>}></Route>
    <Route path={'/signin'} element={ <Signin  />}></Route>
    <Route path={'/admin'} element={ <Admin token={token} user={user} isAdmin={isAdmin} />}></Route>







    

    
  </Routes>
</Router>


    </div>
      
    </>
  )
}

export default App
