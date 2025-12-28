import React from 'react';
import '../styles/about.css'
import { CopyWrite } from '../components/copywrite';
import lalibela from '../../public/images/about_img/lalibela (2).jpg'

import lalibela1 from '../../public/images/section/lalibela (1).jpg'
import konso from '../../public/images/section/konso.jpg'
import sof from '../../public/images/section/sof.jpeg'
import harar from '../../public/images/section/harar.jpeg'
export const About=()=>{
    return(
<>


<div className="about">
    <h2 className="about_h1">About Us</h2>
</div>
<div className="about_dis">




<div className="Discover_Ethiopia">
<div className="img">

    <img src={lalibela} alt=""  />
</div>

<div className="About_Discover_Ethiopia">
    <h2>About Us – Discover Ethiopia</h2>
    <p>When you travel with us, you're not just moving from one place to another — it's about stories, traditions, and moments that stay with you forever. Ethiopia is a land where history, culture, and nature blend in ways you won't find anywhere else. From the rock-hewn churches of Lalibela to the rugged peaks of the Simien Mountains, every corner tells a story that spans thousands of years.</p>
    <p>Our mission is to guide you beyond the guidebooks, to help you meet the people behind the coffee ceremonies, the artisans crafting age-old treasures, and the farmers whose fields paint the countryside in shades of green and gold. Whether you're trekking in the highlands, sailing on Lake Tana, or simply sharing ancient conversations, we're here to make every step meaningful.</p>
</div>
</div>


<div className="card">
<div>
    <h3>Rich Heritage</h3>
    <p>
Explore 3,000 years of history through ancient kingdoms, rock churches, and archaeological wonders.</p>
</div>
<div><h3>Natural Wonders</h3><p>From the Simien Mountains to the Danakil Depression, experience landscapes found nowhere else.</p></div>


<div><h3>Cultural Diversity</h3>
<p>Meet over 80 ethnic groups with unique languages, traditions, and preserved heritage.</p></div>
<div>
    <h3>Authentic Experiences</h3>
    <p>Participate in coffee ceremonies, witness ancient festivals, and connect with local communities.</p>
</div>
</div>
<div className="choose_eth">
    <h1>Why Choose Ethiopia?</h1>
    <p>Ethiopia stands apart as Africa's only nation never fully colonized, preserving its customs and traditions in their purest forms. As the birthplace of coffee and home to Lucy, one of humanity's earliest ancestors, Ethiopia offers visitors a journey to the origins of human civilization.</p>
    <p>Our guides and curated experiences ensure your journey is comfortable and transformative. We believe in responsible tourism that benefits local communities while giving you unforgettable memories.</p>
</div>
<section className="img_list">

        

<img src={konso} alt=""  />
<img src={sof} alt=""  />
<img src={harar} alt=""  />
<img src={lalibela1} alt=""  />


</section>



</div>
<CopyWrite/>


</>


        
    )
}