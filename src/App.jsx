import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route,Link, Navigate} from 'react-router-dom'
import './App.css'
import { Home } from './pages/home'
import { Gallery } from './pages/gallery'
import { About } from './pages/about'
import { Contact } from './pages/contact'
import Create from './pages/Create'
import Signin from './pages/signin'
import { useEffect } from 'react';
import axios from 'axios'

function App() {
 const [token, setToken] = useState(null); // ✅ use [] instead of {}

useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:9000/dashbord", {
          withCredentials: true,
        });

        if (res.data.status) {
          console.log(res.data.msg.firstname);
          setToken(res.data.msg.firstname); // update state
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (

    
    <>
    <div className="App">
      
<Router>
  <Routes>

    <Route path={'/'} element={   <Home token={token} />  }></Route>
    <Route path={'/gallery'} element={ <Gallery/>}></Route>
    <Route path={'/videos'} element={ <Gallery/>}></Route>
    <Route path={'/about'} element={ <About/>}></Route>
    <Route path={'/contact'} element={ <Contact/>}></Route>
    <Route path={'/Create'} element={ <Create/>}></Route>
    <Route path={'/signin'} element={ <Signin  token={token}  setToken={setToken}/>}></Route>



    

    
  </Routes>
</Router>


    </div>
      
    </>
  )
}

export default App
