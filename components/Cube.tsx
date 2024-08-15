// import { RenderTexture, Text, PerspectiveCamera } from "@react-three/drei";
// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// const Cube = () => {
//   const textRef = useRef();
//   useFrame(
//     (state) =>
//       (textRef.current.position.x = Math.sin(state.clock.elapsedTime) * 2)
//   );
//   return (
//     <mesh>
//       <boxGeometry args={[2, 2, 2]} />
//       <meshStandardMaterial>
//         <RenderTexture attach="map">
//           <PerspectiveCamera makeDefault position={[0, 0, 2]} />
//           <color attach="background" args={["pink"]} />
//           <Text color="#555" fontSize={1} ref={textRef}>
//             Hello
//           </Text>
//         </RenderTexture>
//       </meshStandardMaterial>
//     </mesh>
//   );
// };

// export default Cube;
