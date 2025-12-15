import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const TiltCard = ({
    children,
    className = "",
    maxTilt = 10,
    perspective = 1000,
    scale = 1.02,
    transitionSpeed = 400,
    glareEnabled = true,
    glareMaxOpacity = 0.3,
    glareColor = "#ffffff",
}) => {
    const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 150 };
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig);
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig);

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const normalizedX = (e.clientX - centerX) / rect.width;
        const normalizedY = (e.clientY - centerY) / rect.height;

        x.set(normalizedX);
        y.set(normalizedY);

        // Update glare position
        setGlarePosition({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective,
                transformStyle: "preserve-3d",
            }}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    scale: isHovered ? scale : 1,
                    transition: `scale ${transitionSpeed}ms ease-out`,
                    transformStyle: "preserve-3d",
                    position: "relative",
                    width: "100%",
                    height: "100%",
                }}
            >
                {children}
                {glareEnabled && (
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, ${glareColor} 0%, transparent 50%)`,
                            opacity: isHovered ? glareMaxOpacity : 0,
                            pointerEvents: "none",
                            borderRadius: "inherit",
                            transition: `opacity ${transitionSpeed}ms ease-out`,
                        }}
                    />
                )}
            </motion.div>
        </motion.div>
    );
};

export default TiltCard;
