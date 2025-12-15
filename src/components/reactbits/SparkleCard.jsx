import { useState, useEffect, useRef } from "react";
import "./SparkleCard.css";

// Generate random sparkle position
const generateSparkle = (id) => {
    return {
        id,
        size: Math.random() * 24 + 16,
        top: Math.random() * 80 + 10,
        left: Math.random() * 80 + 10,
        delay: Math.random() * 2,
        duration: Math.random() * 2 + 2,
        rotation: Math.random() * 30 - 15,
    };
};

// Code bracket SVG component (replacing star)
const CodeBracket = ({ size, style }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={style}
        className="sparkle-svg"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
);

const SparkleCard = ({
    name = "Sahrudin",
    title = "Data Engineer",
    username = "@sahrudindev",
    avatarUrl = "",
    contactUrl = "#contact",
    sparkleCount = 10,
    showAvatar = true,
}) => {
    const [sparkles, setSparkles] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
        // Initialize sparkles
        const initialSparkles = Array.from({ length: sparkleCount }, (_, i) =>
            generateSparkle(i)
        );
        setSparkles(initialSparkles);

        // Regenerate sparkles periodically
        const interval = setInterval(() => {
            setSparkles((prev) =>
                prev.map((s) => ({
                    ...s,
                    top: Math.random() * 80 + 10,
                    left: Math.random() * 80 + 10,
                    delay: Math.random() * 0.5,
                }))
            );
        }, 4000);

        return () => clearInterval(interval);
    }, [sparkleCount]);

    return (
        <div ref={containerRef} className="sparkle-card">
            <div className="sparkle-card-inner">
                {/* Code Bracket Sparkles */}
                <div className="sparkles-container">
                    {sparkles.map((sparkle) => (
                        <CodeBracket
                            key={sparkle.id}
                            size={sparkle.size}
                            style={{
                                position: "absolute",
                                top: `${sparkle.top}%`,
                                left: `${sparkle.left}%`,
                                animationDelay: `${sparkle.delay}s`,
                                animationDuration: `${sparkle.duration}s`,
                                transform: `rotate(${sparkle.rotation}deg)`,
                                color: getSparkleColor(sparkle.id),
                            }}
                        />
                    ))}
                </div>

                {/* Header Content */}
                <div className="sparkle-card-content">
                    <h2 className="sparkle-card-name">{name}</h2>
                    <p className="sparkle-card-title">{title}</p>
                </div>

                {/* Avatar Image */}
                {showAvatar && avatarUrl && (
                    <div className="sparkle-card-avatar">
                        <img src={avatarUrl} alt={name} />
                    </div>
                )}

                {/* Footer with Contact */}
                <div className="sparkle-card-footer">
                    <div className="sparkle-card-user">
                        {avatarUrl && (
                            <img src={avatarUrl} alt={name} className="sparkle-card-mini-avatar" />
                        )}
                        <div className="sparkle-card-user-info">
                            <span className="sparkle-card-username">{username}</span>
                            <span className="sparkle-card-status">
                                <span className="status-dot-online"></span>
                                Online
                            </span>
                        </div>
                    </div>
                    <a href={contactUrl} className="sparkle-card-contact-btn">
                        Contact Me
                    </a>
                </div>
            </div>
        </div>
    );
};

// Helper function for sparkle colors
function getSparkleColor(index) {
    const colors = [
        "#60a5fa", // blue
        "#a78bfa", // purple
        "#34d399", // green
        "#fbbf24", // yellow
        "#f472b6", // pink
        "#22d3ee", // cyan
    ];
    return colors[index % colors.length];
}

export default SparkleCard;
