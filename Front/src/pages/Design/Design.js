import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { Canvas } from '@react-three/fiber';
import { useGLTF, AccumulativeShadows, RandomizedLight, Environment, CameraControls } from '@react-three/drei';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';

const Desing = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [modelColors, setModelColors] = useState(["#ffffff", "#ffffff", "#ffffff", "#ffffff"]); // Colores iniciales

  useEffect(() => {
    setPrevLocation(location.state?.data || "Inicio");
  }, [location]);

  const handleColorChange = (index, color) => {
    const newColors = [...modelColors];
    newColors[index] = color;
    setModelColors(newColors);
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Diseño 3D" prevLocation={prevLocation} />
      <div className="pb-30 h-[100vh] mt-2 mb-5 flex items-center">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {modelColors.map((color, index) => (
            <SwiperSlide key={index}>
              <ThreeDSlide modelPath="/shoe.gltf" color={color} />
              <input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(index, e.target.value)}
                className="absolute top-4 right-4" // Posición del selector de color
              />
              <div className="absolute bottom-4 left-4 text-black text-2xl">
                Modelo {index + 1}: {color}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

const ThreeDSlide = ({ modelPath, color }) => (
  <Canvas shadows camera={{ position: [5, 0, 5], fov: 35 }}>
    <ambientLight intensity={Math.PI} />
    <Model modelPath={modelPath} position={[0, 0, 0.85]} scale={10} color={color} />
    <Model modelPath={modelPath} position={[0, 0, -0.85]} rotation={[0, 0.5, Math.PI]} scale={-1} color={color} />
    <AccumulativeShadows position={[0, -0.5, 0]} temporal frames={100} alphaTest={0.75} opacity={0.9}>
      <RandomizedLight radius={6} position={[5, 5, -10]} bias={0.001} />
    </AccumulativeShadows>
    <CameraControls />
    <Environment preset="city" />
  </Canvas>
);

function Model({ modelPath, color, ...props }) {
  const { nodes, materials } = useGLTF(modelPath);

  // Asegúrate de que el color se aplique a todos los materiales
  useEffect(() => {
    materials.laces.color.set(color);
    materials.mesh.color.set(color);
    materials.caps.color.set(color);
    materials.inner.color.set(color);
    materials.sole.color.set(color);
    materials.stripes.color.set(color);
    materials.band.color.set(color);
    materials.patch.color.set(color);
  }, [color, materials]);

  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.shoe.geometry} material={materials.laces} />
      <mesh castShadow receiveShadow geometry={nodes.shoe_1.geometry} material={materials.mesh} />
      <mesh castShadow receiveShadow geometry={nodes.shoe_2.geometry} material={materials.caps} />
      <mesh castShadow receiveShadow geometry={nodes.shoe_3.geometry} material={materials.inner} />
      <mesh castShadow receiveShadow geometry={nodes.shoe_4.geometry} material={materials.sole} />
      <mesh castShadow receiveShadow geometry={nodes.shoe_5.geometry} material={materials.stripes} />
      <mesh castShadow receiveShadow geometry={nodes.shoe_6.geometry} material={materials.band} />
      <mesh castShadow receiveShadow geometry={nodes.shoe_7.geometry} material={materials.patch} />
    </group>
  );
}

export default Desing;
