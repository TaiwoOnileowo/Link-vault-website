// @ts-nocheck
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Stage, OrbitControls, useGLTF, useAnimations } from "@react-three/drei";

export default function Model(props) {
  const group = React.useRef();
  const { nodes, materials, animations } = useGLTF("/Vault.glb");
  const { actions } = useAnimations(animations, group);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="door_control" position={[1.017, -0.272, -0.852]}>
          <mesh
            name="door"
            geometry={nodes.door.geometry}
            material={materials["Material.006"]}
            position={[-0.319, 0.01, 0.907]}
            rotation={[0, -0.718, 0]}
          >
            <mesh
              name="Cylinder"
              geometry={nodes.Cylinder.geometry}
              material={materials["Safe.002"]}
              position={[0.093, -0.227, -0.083]}
              rotation={[0.056, 0, -Math.PI / 2]}
              scale={0.739}
            />
          </mesh>
        </group>
        <group
          name="Cube008"
          position={[-0.338, -0.988, -0.077]}
          rotation={[0, 0, 1.153]}
          scale={0.083}
        >
          <mesh
            name="Cube015"
            geometry={nodes.Cube015.geometry}
            material={materials["Material.007"]}
          />
          <mesh
            name="Cube015_1"
            geometry={nodes.Cube015_1.geometry}
            material={materials["Material.005"]}
          />
        </group>
        <group
          name="Cube007"
          position={[-0.419, -1.055, -0.753]}
          rotation={[0, -0.816, 1.355]}
          scale={0.089}
        >
          <mesh
            name="Cube016"
            geometry={nodes.Cube016.geometry}
            material={materials["Material.003"]}
          />
          <mesh
            name="Cube016_1"
            geometry={nodes.Cube016_1.geometry}
            material={materials["Material.005"]}
          />
        </group>
        <group
          name="Cube006"
          position={[-0.2, -1.005, -0.077]}
          rotation={[0, 0, 1.355]}
          scale={0.083}
        >
          <mesh
            name="Cube016"
            geometry={nodes.Cube016.geometry}
            material={materials["Material.003"]}
          />
          <mesh
            name="Cube016_1"
            geometry={nodes.Cube016_1.geometry}
            material={materials["Material.005"]}
          />
        </group>
        <group name="Cube001" position={[-0.059, -0.176, -0.057]} scale={0.114}>
          <mesh
            name="Cube016"
            geometry={nodes.Cube016.geometry}
            material={materials["Material.003"]}
          />
          <mesh
            name="Cube016_1"
            geometry={nodes.Cube016_1.geometry}
            material={materials["Material.005"]}
          />
        </group>
        <group name="Cube002" position={[-0.175, -0.125, 0.26]} scale={0.083}>
          <mesh
            name="Cube016"
            geometry={nodes.Cube016.geometry}
            material={materials["Material.003"]}
          />
          <mesh
            name="Cube016_1"
            geometry={nodes.Cube016_1.geometry}
            material={materials["Material.005"]}
          />
        </group>
        <group name="Cube003" position={[-0.175, -0.125, -0.434]} scale={0.083}>
          <mesh
            name="Cube016"
            geometry={nodes.Cube016.geometry}
            material={materials["Material.003"]}
          />
          <mesh
            name="Cube016_1"
            geometry={nodes.Cube016_1.geometry}
            material={materials["Material.005"]}
          />
        </group>
        <group name="Cube004" position={[-0.338, -0.425, -0.077]} scale={0.083}>
          <mesh
            name="Cube016"
            geometry={nodes.Cube016.geometry}
            material={materials["Material.003"]}
          />
          <mesh
            name="Cube016_1"
            geometry={nodes.Cube016_1.geometry}
            material={materials["Material.005"]}
          />
        </group>
        <group name="Cube005" position={[-0.145, -0.085, -0.038]} scale={0.168}>
          <mesh
            name="Cube016"
            geometry={nodes.Cube016.geometry}
            material={materials["Material.003"]}
          />
          <mesh
            name="Cube016_1"
            geometry={nodes.Cube016_1.geometry}
            material={materials["Material.005"]}
          />
        </group>
        <mesh
          name="stand"
          geometry={nodes.stand.geometry}
          material={materials["Material.002"]}
          position={[0.048, -1.32, 0.372]}
          rotation={[0, -0.718, 0]}
        />
        <mesh
          name="vault"
          geometry={nodes.vault.geometry}
          material={materials["Material.006"]}
          position={[-0.03, -0.265, -0.589]}
          rotation={[0, -0.718, 0]}
        />
        <mesh
          name="Cylinder001"
          geometry={nodes.Cylinder001.geometry}
          material={materials["Material.002"]}
          position={[1.313, 0.237, -0.61]}
          rotation={[0, -0.718, 0]}
        />
        <mesh
          name="Cylinder002"
          geometry={nodes.Cylinder002.geometry}
          material={materials["Material.002"]}
          position={[1.323, 0.042, -0.605]}
          scale={[1, 0.71, 1]}
        />
        <mesh
          name="Cylinder003"
          geometry={nodes.Cylinder003.geometry}
          material={materials["Material.002"]}
          position={[1.313, -0.8, -0.61]}
          rotation={[-Math.PI, 0.718, 0]}
        />
        <mesh
          name="Cylinder004"
          geometry={nodes.Cylinder004.geometry}
          material={materials["Material.002"]}
          position={[1.313, -0.605, -0.61]}
          rotation={[-Math.PI, 0.718, 0]}
          scale={[1, 0.71, 1]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/Vault.glb");