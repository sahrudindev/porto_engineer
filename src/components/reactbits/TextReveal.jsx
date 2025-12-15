import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

export default function TextReveal({
    text,
    className = '',
    delay = 0,
    duration = 0.03,
    staggerChildren = 0.015,
    as = 'span'
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    const words = text.split(' ');

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay,
                staggerChildren,
            }
        }
    };

    const child = {
        hidden: {
            opacity: 0,
            y: 20,
            rotateX: -90,
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                duration,
            }
        }
    };

    const Component = motion[as] || motion.span;

    return (
        <Component
            ref={ref}
            className={className}
            variants={container}
            initial="hidden"
            animate={controls}
            style={{ display: 'inline-block', perspective: '1000px' }}
        >
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    variants={child}
                    style={{
                        display: 'inline-block',
                        marginRight: '0.25em',
                        transformStyle: 'preserve-3d',
                    }}
                >
                    {word}
                </motion.span>
            ))}
        </Component>
    );
}
