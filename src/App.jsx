import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom'
import './App.css'
import { Home } from './pages/home'
import { Gallery } from './pages/gallery'
import { About } from './pages/about'
import { Contact } from './pages/contact'
function App() {

  return (
    <>
    <div className="App">
<Router>
  <Routes>

    <Route path={'/'} element={  <Home></Home> }></Route>
    <Route path={'/gallery'} element={ <Gallery/>}></Route>
    <Route path={'/videos'} element={ <Gallery/>}></Route>
    <Route path={'/about'} element={ <About/>}></Route>
    <Route path={'/contact'} element={ <Contact/>}></Route>




  </Routes>
</Router>


    </div>
      
    </>
  )
}

export default App
