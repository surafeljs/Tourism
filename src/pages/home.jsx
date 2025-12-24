import React from 'react';
import { NavBar } from '../components/navbar';
import { CopyWrite } from '../components/copywrite';
import '../styles/copywrite.css'
import '../styles/home.css'

import lalibela from '../../public/images/section/lalibela.jpg'
export const Home=()=>{
    return(
<>

<NavBar/>

<section>
<div className="img">
<img src={lalibela} alt="" srcset="" />
<h2>Ethiopia – Land of Origins</h2>

     </div>    
  

     
    </section>

<CopyWrite/>
</>


        
    )
}