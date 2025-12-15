import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const AnimatedList = ({
    children,
    className = "",
    staggerDelay = 0.1,
    initialDelay = 0,
    direction = "up",
    threshold = 0.1,
    once = true,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount: threshold });

    const getInitialPosition = () => {
        switch (direction) {
            case "up":
                return { opacity: 0, y: 30 };
            case "down":
                return { opacity: 0, y: -30 };
            case "left":
                return { opacity: 0, x: 30 };
            case "right":
                return { opacity: 0, x: -30 };
            case "scale":
                return { opacity: 0, scale: 0.8 };
            default:
                return { opacity: 0, y: 30 };
        }
    };

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: initialDelay,
            },
        },
    };

    const itemVariants = {
        hidden: getInitialPosition(),
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            {Array.isArray(children)
                ? children.map((child, index) => (
                    <motion.div key={index} variants={itemVariants}>
                        {child}
                    </motion.div>
                ))
                : children}
        </motion.div>
    );
};

export default AnimatedList;
