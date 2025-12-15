import "./GradientText.css";

export default function GradientText({
    children,
    className = "",
    colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
    animationSpeed = 8,
    showBorder = false,
}) {
    const gradientStyle = {
        backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
        animationDuration: `${animationSpeed}s`,
    };

    return (
        <span className={`gradient-text-wrapper ${className}`}>
            {showBorder && (
                <span className="gradient-text-border" style={gradientStyle}></span>
            )}
            <span className="gradient-text-content" style={gradientStyle}>
                {children}
            </span>
        </span>
    );
}
