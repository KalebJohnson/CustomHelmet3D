import './index.css';
import React , { useState, useRef, useEffect} from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Canvas, useFrame, extend, useThree } from 'react-three-fiber';
import { useSpring, animated } from 'react-spring-three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


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
const Helmet = () => {
  const [model, setmodel] = useState()
  useEffect(() => {
    new GLTFLoader().load('/AGV-Pista-GP-R.gltf', setmodel)
  },[])

  return  model ?
  <animated.mesh>
    <primitive object={model.scene}/>
    <spotLight position={[5,50,25]} penumbra={1}/>
    <spotLight position={[0,-5,0]} penumbra={1}/>
  </animated.mesh>
   : null
  
}
const Plane = () => (
  <mesh rotation={[-Math.PI / 2 , 0, 0]} position={[0, -7, 0]}>
    <boxBufferGeometry  attach="geometry" args={[200,200]} />
    <meshPhysicalMaterial attach="material" color="red" receiveShadow/>
  </mesh>
)


function App() {
  return (
  <Canvas shadowMap camera={{ position: [0,0,5] }}>
    <Controls></Controls>
    <Helmet/>
    <Plane></Plane>
  </Canvas>
  );
}

export default App;
