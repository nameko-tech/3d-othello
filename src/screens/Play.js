import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useLoader, extend, useThree, } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { fakeObject } from '../constants/fakeData'
import * as THREE from 'three'
extend({ OrbitControls })

const CameraControls = () => {
  const {
    camera,
    gl: { domElement }
  } = useThree()
  camera.position.set(0, 0, 8);
  console.log(camera)
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef()
  useFrame((state) => controls.current.update())
  return <orbitControls ref={controls} args={[camera, domElement]}  />
}

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={[0.5, 0.5, 0.5]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={active ? 'hotpink' : 'rgba(200,200,200)'} />
    </mesh>
  )
}

const Play = () => {
  // import Stats from './jsm/libs/stats.module.js';
  // import { GUI } from './jsm/libs/dat.gui.module.js';
  // import { OrbitControls } from "./jsm/controls/OrbitControls.js";

//   let camera, scene, renderer, stats

  // let mesh
//   let amount = parseInt(window.location.search.substr(1)) || 10
  // let count = Math.pow(amount, 3)

  // let raycaster = new THREE.Raycaster()
  // let mouse = new THREE.Vector2(1, 1)

//   let rotationMatrix = new THREE.Matrix4().makeRotationY(0.1)
  // let instanceMatrix = new THREE.Matrix4()
  // let matrix = new THREE.Matrix4()

  // function init() {

  //   scene = new THREE.Scene();
  //   scene.background = new THREE.Color( 0xcccccc );
  //   scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

  // renderer = new THREE.WebGLRenderer( { antialias: true } );
  //   renderer.setPixelRatio( window.devicePixelRatio );
  //   renderer.setSize( window.innerWidth, window.innerHeight );
  //   document.body.appendChild( renderer.domElement );

  // camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
  //   camera.position.set( 400, 200, 0 );

  //   // controls

  //   controls = new OrbitControls( camera, renderer.domElement );

  //   //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

  //   controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  //   controls.dampingFactor = 0.05;

  //   controls.screenSpacePanning = false;

  //   controls.minDistance = 100;
  //   controls.maxDistance = 500;

  //   controls.maxPolarAngle = Math.PI / 2;

  //   // world

  //   var geometry = new THREE.CylinderBufferGeometry( 0, 10, 30, 4, 1 );
  //   var material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );

  //   for ( var i = 0; i < 500; i ++ ) {

  //     var mesh = new THREE.Mesh( geometry, material );
  //     mesh.position.x = Math.random() * 1600 - 800;
  //     mesh.position.y = 0;
  //     mesh.position.z = Math.random() * 1600 - 800;
  //     mesh.updateMatrix();
  //     mesh.matrixAutoUpdate = false;
  //     scene.add( mesh );

  //   }

  //   window.addEventListener( 'resize', onWindowResize, false );

  // }
  // function init() {
  // )
  // camera.lookAt(0, 0, 0)

  //   scene = new THREE.Scene()

  //   var light = new THREE.HemisphereLight(0xffffff, 0x000088)
  //   light.position.set(-1, 1.5, 1)
  //   scene.add(light)

  //   var light = new THREE.HemisphereLight(0xffffff, 0x880000, 0.5)
  //   light.position.set(-1, -1.5, -1)
  //   scene.add(light)

  //   const geometry = new THREE.SphereBufferGeometry(0.5)
  //   const material = new THREE.MeshPhongMaterial({ flatShading: true })

  //   mesh = new THREE.InstancedMesh(geometry, material, count)




  return (
    <div style={{ border: '2px solid green', width: '95vw', margin: '0 auto', height: '80vh',backgroundColor:'black' }}>
      <Canvas>
        {/* <ambientLight color="0x222222" /> */}
        <CameraControls />
        <pointLight position={[100, 100, 100]} color='0xFF00FF' />
        <pointLight position={[100, -100, -100]} />
        <pointLight position={[-100, 100, -100]} />
        <pointLight position={[-100, -100, 100]} />
        {/* <Box position={[-1.2, 0, 0]} /> */}
        {/* <Box position={[1.2, 0, 0]} /> */}
        {fakeObject.board.map((surface, i) => {
          return surface.map((row, j) => {
            return row.map((piece, k) => {
              return <Box piece={piece} key={`${i}${j}${k}`} position={[i-2.5, j-2.5, k-2.5]} />
            })
          })
        })}
        {/* <Controls isControl={true} /> */}
        {/* <mesh> */}
        {/* <boxBufferGeometry attach="geometry" args={[1, 1, 1]} /> */}
        {/* <meshNormalMaterial attach="material" /> */}
        {/* </mesh> */}
      </Canvas>
    </div>
  )
}

export default Play
