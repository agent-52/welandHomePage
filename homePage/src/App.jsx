import { useEffect } from "react"
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import * as CANNON from 'cannon-es'
import Header from "./Header/Header"
import "./App.css"
import earthi from "./assets/earthi.png"
import simVideo from "./assets/simVideo.mp4"
import gsap from "gsap"
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';


const App = () =>
{
  useEffect(()=>{

  })

  return(
    <div className="body background pi1 text-slate-12 font-sans">

      <Header/>
      <canvas className="webgl"></canvas>
      <div className="flexC gap2 align-center section1">
        <div className="p1h1 flexC align-center">
          <h1 className="text-large noWrap">W<div className="o"><video src={simVideo} autoPlay loop muted></video></div>rld's best</h1>
          <h1 className="text-large">marketplace</h1>
        </div>
        <div className="p1h2 glassyText text-large font-medium flexC align-center f6">
          <div>for</div>
          <div>Virtual Estates</div>
        </div>
        
        <div className="enterWorld flex gap0 align-center">
          <div className="imgBox"><img src={earthi} alt="" /></div>
          <div>Dive Into Future</div>
        </div>
      </div>
      <div className="section2">
        <div className="flexC gap1 text-center">
          <div className="text-medium ">Buy Sell Explore</div>
          <div className="text-sm1 text-slate-11 description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita, perspiciatis. Corrupti, vitae ratione asperiores nihil iste consectetur, nulla necessitatibus quos doloribus a culpa placeat nisi, incidunt at doloremque sapiente sequi?</div>
        </div>
      </div>
      

    </div>
  )
}

export default App