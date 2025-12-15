import { useRef, useState } from "react";
import { motion } from "framer-motion";

const Magnet = ({
    children,
    padding = 100,
    disabled = false,
    magnetStrength = 0.5,
    activeTransition = { type: "spring", stiffness: 160, damping: 15, mass: 0.1 },
    inactiveTransition = { type: "spring", stiffness: 300, damping: 20, mass: 0.5 },
    className = "",
}) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (disabled) return;

        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
        const magnetRadius = rect.width / 2 + padding;

        if (distance < magnetRadius) {
            const pull = 1 - distance / magnetRadius;
            setPosition({
                x: distanceX * magnetStrength * pull,
                y: distanceY * magnetStrength * pull,
            });
            setIsHovered(true);
        } else {
            setPosition({ x: 0, y: 0 });
            setIsHovered(false);
        }
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={position}
            transition={isHovered ? activeTransition : inactiveTransition}
            style={{ display: "inline-block" }}
        >
            {children}
        </motion.div>
    );
};

export default Magnet;
