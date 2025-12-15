import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function AuroraPlane({ colorStops, amplitude, speed, blend }) {
    const meshRef = useRef(null);
    const materialRef = useRef(null);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uColorStops: { value: colorStops.map((c) => new THREE.Color(c)) },
            uAmplitude: { value: amplitude },
            uBlend: { value: blend },
        }),
        [colorStops, amplitude, blend]
    );

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = clock.getElapsedTime() * speed;
        }
    });

    const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

    const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColorStops[4];
    uniform float uAmplitude;
    uniform float uBlend;
    varying vec2 vUv;

    void main() {
      float wave1 = sin(vUv.x * 3.0 + uTime * 0.5 + vUv.y * 2.0) * uAmplitude;
      float wave2 = sin(vUv.x * 2.0 - uTime * 0.3 + vUv.y * 3.0) * uAmplitude * 0.8;
      float wave3 = sin(vUv.y * 4.0 + uTime * 0.4) * uAmplitude * 0.6;
      
      float combined = (wave1 + wave2 + wave3) * 0.5 + 0.5;
      combined = clamp(combined, 0.0, 1.0);

      vec3 color = mix(uColorStops[0], uColorStops[1], smoothstep(0.0, 0.33, combined));
      color = mix(color, uColorStops[2], smoothstep(0.33, 0.66, combined));
      color = mix(color, uColorStops[3], smoothstep(0.66, 1.0, combined));

      float alpha = uBlend * (0.3 + combined * 0.5);
      gl_FragColor = vec4(color, alpha);
    }
  `;

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <planeGeometry args={[10, 10, 32, 32]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

const Aurora = ({
    colorStops = ["#00d4ff", "#7c3aed", "#f97316", "#22d3ee"],
    amplitude = 0.5,
    speed = 0.5,
    blend = 0.6,
    className = "",
    style = {},
}) => {
    return (
        <div
            className={className}
            style={{
                position: "absolute",
                inset: 0,
                overflow: "hidden",
                pointerEvents: "none",
                ...style,
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 2], fov: 75 }}
                style={{ width: "100%", height: "100%" }}
                gl={{ alpha: true, antialias: true }}
            >
                <AuroraPlane
                    colorStops={colorStops}
                    amplitude={amplitude}
                    speed={speed}
                    blend={blend}
                />
            </Canvas>
        </div>
    );
};

export default Aurora;
