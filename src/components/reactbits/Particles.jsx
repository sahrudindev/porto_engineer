import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleField({ count = 200, colors = ['#137fec', '#8b5cf6', '#22d3ee'], mouse }) {
    const mesh = useRef();
    const light = useRef();

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const time = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.005 + Math.random() / 200;
            const x = Math.random() * 2000 - 1000;
            const y = Math.random() * 2000 - 1000;
            const z = Math.random() * 2000 - 1000;

            temp.push({ time, factor, speed, x, y, z, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    const colorArray = useMemo(() => {
        const tempColors = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const color = new THREE.Color(colors[i % colors.length]);
            tempColors.set([color.r, color.g, color.b], i * 3);
        }
        return tempColors;
    }, [count, colors]);

    useFrame(() => {
        particles.forEach((particle, i) => {
            let { time, factor, speed, x, y, z } = particle;

            time = particle.time += speed;

            const a = Math.cos(time) + Math.sin(time * 1) / 10;
            const b = Math.sin(time) + Math.cos(time * 2) / 10;
            const s = Math.cos(time) * 0.5 + 1.5;

            // Mouse interaction
            const mouseX = mouse.current.x * 500;
            const mouseY = mouse.current.y * 500;

            particle.mx += (mouseX - particle.mx) * 0.01;
            particle.my += (mouseY - particle.my) * 0.01;

            dummy.position.set(
                x + particle.mx * 0.1 + Math.cos(time + factor) * factor * 0.1,
                y + particle.my * 0.1 + Math.sin(time + factor) * factor * 0.1,
                z + Math.cos(time + factor) * factor * 0.1
            );
            dummy.scale.set(s, s, s);
            dummy.rotation.set(a, b, 0);
            dummy.updateMatrix();

            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <sphereGeometry args={[2, 8, 8]} />
            <meshBasicMaterial transparent opacity={0.6}>
                <instancedBufferAttribute
                    attach="attributes-color"
                    args={[colorArray, 3]}
                />
            </meshBasicMaterial>
        </instancedMesh>
    );
}

export default function Particles({
    className = '',
    particleCount = 150,
    colors = ['#137fec', '#8b5cf6', '#22d3ee']
}) {
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className={`absolute inset-0 ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 500], fov: 75 }}
                style={{ background: 'transparent' }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.5} />
                <ParticleField count={particleCount} colors={colors} mouse={mouse} />
            </Canvas>
        </div>
    );
}
