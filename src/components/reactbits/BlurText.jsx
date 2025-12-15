import { useRef, useEffect, useMemo } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const BlurText = ({
    text = "",
    delay = 0.2,
    className = "",
    animateBy = "words",
    direction = "top",
    threshold = 0.1,
    rootMargin = "0px",
    animationFrom,
    animationTo,
    easing = [0.25, 0.1, 0.25, 1],
    onAnimationComplete,
}) => {
    const elements = animateBy === "words" ? text.split(" ") : text.split("");
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: rootMargin, amount: threshold });
    const controls = useAnimation();

    const defaultFrom = useMemo(() => {
        switch (direction) {
            case "top":
                return { filter: "blur(10px)", opacity: 0, y: -30 };
            case "bottom":
                return { filter: "blur(10px)", opacity: 0, y: 30 };
            case "left":
                return { filter: "blur(10px)", opacity: 0, x: -30 };
            case "right":
                return { filter: "blur(10px)", opacity: 0, x: 30 };
            default:
                return { filter: "blur(10px)", opacity: 0, y: -30 };
        }
    }, [direction]);

    const defaultTo = useMemo(() => {
        return { filter: "blur(0px)", opacity: 1, y: 0, x: 0 };
    }, []);

    const from = animationFrom || defaultFrom;
    const to = animationTo || defaultTo;

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [inView, controls]);

    return (
        <motion.span ref={ref} className={className} style={{ display: "inline-block" }}>
            {elements.map((element, index) => (
                <motion.span
                    key={index}
                    custom={index}
                    initial={from}
                    animate={controls}
                    variants={{
                        visible: (i) => ({
                            ...to,
                            transition: {
                                delay: i * delay,
                                duration: 0.5,
                                ease: easing,
                            },
                        }),
                    }}
                    style={{
                        display: "inline-block",
                        willChange: "transform, filter, opacity",
                    }}
                    onAnimationComplete={
                        index === elements.length - 1 ? onAnimationComplete : undefined
                    }
                >
                    {element === " " ? "\u00A0" : element}
                    {animateBy === "words" && index < elements.length - 1 ? "\u00A0" : ""}
                </motion.span>
            ))}
        </motion.span>
    );
};

export default BlurText;
