import './index.css';
import React , { useState, useRef, useEffect} from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Canvas, useFrame, extend, useThree } from 'react-three-fiber';
import { useSpring, animated } from 'react-spring-three';
import { GTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

extend({OrbitControls})

const Controls = () => {
  const orbitRef = useRef();
  const {camera, gl} = useThree();

  useFrame(() => {
    orbitRef.current.update()
  })

  return (
    <orbitControls
    args={[camera, gl.domElement]}
    ref={orbitRef}
    />
  )
}
const helmet = () => {
  const [model, setmodel] = useState()
  useEffect(() => {
    new GTFLoader().load("", setmodel)
  })
}
const Plane = () => (
  <mesh rotation={[-Math.PI / 2 , 0, 0]} position={[0, -0.5, 0]}>
    <planeBufferGeometry attach="geometry" args={[50,50]} />
    <meshPhysicalMaterial attach="material" color="black" reflectivity/>
  </mesh>
)

const Box = () => {
  const meshRef = useRef()
  const [ hovered, setHovered] = useState(false);
  const [ active, setActive] = useState(false);
  const props = useSpring({
    scale: active? [1.5, 1.5, 1.5] : [1,1,1],
    color: hovered ? "orange" : "grey",
  })
  useFrame (() => {
    meshRef.current.rotation.y += 0.01
  })


  return (
    <animated.mesh
      castShadow
      ref={meshRef}
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={props.scale}
      >
        
      <ambientLight/>
      <spotLight position={[0,2,10]} penumbra={1}/>
      <boxBufferGeometry 
        attach="geometry"
        arcs={1,1,1}
      />
    
      <animated.meshPhongMaterial attach="material" color={props.color}/>
    </animated.mesh>
  )
}

function App() {
  return (
  <Canvas camera={{ position: [0,0,5] }}>
    <fog attach="fog" args={["grey", 5, 20]}/>
    <Controls></Controls>
    <Box></Box>
    <Plane></Plane>
  </Canvas>
  );
}

export default App;
