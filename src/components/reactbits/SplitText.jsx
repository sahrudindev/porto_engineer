import { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const SplitText = ({
    text = "",
    className = "",
    delay = 0,
    duration = 0.05,
    ease = "power2.out",
    splitType = "chars",
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 },
    threshold = 0.1,
    rootMargin = "-100px",
    textAlign = "center",
    onComplete,
}) => {
    const containerRef = useRef(null);
    const elementsRef = useRef([]);
    const hasAnimated = useRef(false);

    const splitContent = useMemo(() => {
        if (splitType === "chars") {
            return text.split("").map((char, index) => (
                <span
                    key={index}
                    ref={(el) => (elementsRef.current[index] = el)}
                    style={{
                        display: "inline-block",
                        opacity: 0,
                        whiteSpace: char === " " ? "pre" : "normal",
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ));
        }

        if (splitType === "words") {
            return text.split(" ").map((word, index) => (
                <span
                    key={index}
                    ref={(el) => (elementsRef.current[index] = el)}
                    style={{
                        display: "inline-block",
                        opacity: 0,
                        marginRight: "0.25em",
                    }}
                >
                    {word}
                </span>
            ));
        }

        if (splitType === "lines") {
            return text.split("\n").map((line, index) => (
                <span
                    key={index}
                    ref={(el) => (elementsRef.current[index] = el)}
                    style={{ display: "block", opacity: 0 }}
                >
                    {line}
                </span>
            ));
        }

        return text;
    }, [text, splitType]);

    useGSAP(() => {
        if (hasAnimated.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    gsap.to(elementsRef.current.filter(Boolean), {
                        ...to,
                        duration,
                        stagger: delay,
                        ease,
                        onComplete,
                    });
                    observer.disconnect();
                }
            },
            { threshold, rootMargin }
        );

        if (containerRef.current) {
            gsap.set(elementsRef.current.filter(Boolean), from);
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [text, delay, duration, ease, from, to, threshold, rootMargin, onComplete]);

    return (
        <span
            ref={containerRef}
            className={className}
            style={{
                display: "inline-block",
                textAlign,
                overflow: "hidden",
            }}
        >
            {splitContent}
        </span>
    );
};

export default SplitText;
