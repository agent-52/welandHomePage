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
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger)
// const container = useRef();


const App = () =>
{

  useGSAP(
    () => {
        const tl = gsap.timeline()
        tl.from(".header",{
          y: -60,
          opacity:0,
          duration:0.6,
        })
        tl.from('.section1 div', { y: -60,
          opacity:0,
          duration:0.4,
          stagger: 0.1
         }); 
         tl.from(".webgl", {
          
          scale:0,
          duration:1,
         })

        
         tl.to(".webgl",{
          x:"-40vw",
          y:"100vh",
          scrollTrigger:{
            trigger:".enterWorld",
            scrub:2,
            // markers:true,
            start:"top top",
            end:"100 top"
          }
         })
    },
    // { scope: container }
  );
  
  useEffect(()=>{

    /**
     * Base
     */
    // Canvas
    const canvas = document.querySelector('canvas.webgl')

    // Scene
    const scene = new THREE.Scene()

    //Textures
    const textureLoader = new THREE.TextureLoader()
    const planetColorTexture = textureLoader.load("/1/1_color.jpg")
    const planetDispTexture = textureLoader.load("/1/1_disp.png")
    const planetNormalTexture = textureLoader.load("/1/1_normal.jpg")
    const planetOccTexture = textureLoader.load("/1/1_occ.jpg")
    const planetRoughnessTexture = textureLoader.load("/1/1_roughness.jpg")

    // planetColorTexture.minFilter = THREE.NearestFilter
    // planetDispTexture.minFilter = THREE.NearestFilter
    // planetNormalTexture.minFilter = THREE.NearestFilter
    // planetOccTexture.minFilter = THREE.NearestFilter
    // planetRoughnessTexture.minFilter = THREE.NearestFilter

    // planetColorTexture.magFilter = THREE.NearestFilter
    // planetDispTexture.magFilter = THREE.NearestFilter
    // planetNormalTexture.magnFilter = THREE.NearestFilter
    // planetOccTexture.magFilter = THREE.NearestFilter
    // planetRoughnessTexture.magFilter = THREE.NearestFilter

    planetColorTexture.wrapS = THREE.RepeatWrapping
    planetDispTexture.wrapS = THREE.RepeatWrapping
    planetNormalTexture.wrapS = THREE.RepeatWrapping
    planetOccTexture.wrapS = THREE.RepeatWrapping
    planetRoughnessTexture.wrapS = THREE.RepeatWrapping

    planetColorTexture.wrapT = THREE.RepeatWrapping
    planetDispTexture.wrapT = THREE.RepeatWrapping
    planetNormalTexture.wrapT = THREE.RepeatWrapping
    planetOccTexture.wrapT = THREE.RepeatWrapping
    planetRoughnessTexture.wrapT = THREE.RepeatWrapping

    planetColorTexture.repeat.x = 2
    planetDispTexture.repeat.x = 2
    planetNormalTexture.repeat.x = 2
    planetOccTexture.repeat.x = 2
    planetRoughnessTexture.repeat.x = 2

    planetColorTexture.repeat.y = 2
    planetDispTexture.repeat.y = 2
    planetNormalTexture.repeat.y = 2
    planetOccTexture.repeat.y = 2
    planetRoughnessTexture.repeat.y = 2
  

    
    /**
     * Sizes
     */
    const sizes = {
        width: window.innerWidth/2,
        height: window.innerHeight/1.5
    }

    window.addEventListener('resize', () =>
    {
        // Update sizes
        sizes.width = window.innerWidth/2
        sizes.height = window.innerHeight/1.5

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.x = 1
    camera.position.y = 1
    camera.position.z = 2
    scene.add(camera)

    // Controls
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true
    controls.enableZoom = false
    /**
     * Lights
     */
    const ambientLight = new THREE.AmbientLight("white", 1)
    const directionLight = new THREE.DirectionalLight("white", 1)
    const hemisphereLight = new THREE.HemisphereLight("white", "skyblue", 1)
    scene.add(ambientLight, hemisphereLight,directionLight)
    /**
     * Objects
     */
    //planet geometry
    const planetGeometry = new THREE.SphereGeometry(1.3, 64, 64)
    const planetMaterial = new THREE.MeshStandardMaterial({
      map: planetColorTexture,
      aoMap: planetOccTexture,
      normalMap:planetNormalTexture,
      displacementMap: planetDispTexture,
      roughnessMap: planetRoughnessTexture,
      metalness:0.3,
      roughness:0.6,
      displacementScale:0.05,
      aoMapIntensity: 1
      // flatShading: true
    })
   
    const planet = new THREE.Mesh(planetGeometry, planetMaterial)

    planet.geometry.setAttribute("uv2", new THREE.BufferAttribute(planet.geometry.attributes.uv.array, 2))
    // planet.position.y = -2
    scene.add(planet)

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    /**
     * Animate
     */
    const clock = new THREE.Clock()

    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()
        //Update planet
        // planet.rotation.x = elapsedTime*0.1
        planet.rotation.y = elapsedTime*0.15

        // Update controls
        controls.update()

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    tick()

    
  })
  //
  

  return(
    <div className="body background pi1 text-slate-12 font-sans">

      <Header/>
      
      <div className=" gap2 section1">
        <div className="flexC gap2 alignC">
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
        <canvas className="webgl"></canvas>
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