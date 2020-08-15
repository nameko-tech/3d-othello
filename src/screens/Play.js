import React, { useRef, useState, useEffect, useContext } from 'react'
import { Canvas, useFrame, extend, useThree } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { socket } from '../App'
import { OthelloContext } from '../constants/context'
extend({ OrbitControls })

const CameraControls = () => {
  const {
    camera,
    gl: { domElement }
  } = useThree()
  camera.position.set(0, 0, 8)
  console.log(camera)
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef()
  useFrame((state) => {
    controls.current.update()
    // controls.current.autoRotate = true
  })

  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      rotateSpeed={0.3}
      enableRotate={true}
      enablePan={true}
      minDistance={0}
      maxDistance={10}
      zoomSpeed={0.6}
    />
  )
}

const Box = (props) => {
  const { piece, xyz, setSelectedPiece } = props
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [active, setActive] = useState(false)
  const [hover, setHover] = useState(false)
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={[0.3, 0.3, 0.3]}
      onClick={(e) => {
        setActive(!active)
        setSelectedPiece(xyz)
        e.stopPropagation()
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHover(true)
      }}
      onPointerOut={(e) => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color={hover && piece.can_place ? 'lightpink' : piece.piece === 1 ? 'white' : props.piece.piece === 0 ? 'black' : '#2e7d32'}
        // color={piece.canPlace ? 'lightpink' : piece.piece === 1 ? 'white' : props.piece.piece === 0 ? 'black' : '#2e7d32'}
      />
    </mesh>
  )
}

const Play = () => {
  const { othelloBoard, setSelectedPiece } = useContext(OthelloContext)
  console.log(othelloBoard)
  return (
    <div style={{ border: '2px solid green', width: '95vw', margin: '0 auto', height: '80vh', backgroundColor: '#bcaaa4' }}>
      <Canvas>
        {/* <ambientLight color="0x222222" /> */}
        <CameraControls />
        <pointLight position={[100, 100, 100]} />
        <pointLight position={[100, -100, -100]} />
        <pointLight position={[-100, 100, -100]} />
        <pointLight position={[-100, -100, 100]} />
        {othelloBoard && othelloBoard.board.board.length
          ? othelloBoard.board.board.map((surface, i) => {
              return surface.map((row, j) => {
                return row.map((piece, k) => {
                  return (
                    <Box
                      setSelectedPiece={setSelectedPiece}
                      xyz={[i, j, k]}
                      piece={piece}
                      key={`${i}${j}${k}`}
                      position={[i - 2.5, j - 2.5, k - 2.5]}
                    />
                  )
                })
              })
            })
          : ''}
      </Canvas>
    </div>
  )
}

export default Play
