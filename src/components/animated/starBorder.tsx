import React from "react";
import "./StarBorder.css";

// Predefined color variants for better UX
export const STAR_COLORS = {
  white: "#ffffff",
  gold: "#ffd700",
  golden: "#ffb700", // Warmer golden tone
  amber: "#ffc107",
  yellow: "#ffeb3b",
  blue: "#2196f3",
  purple: "#9c27b0",
  red: "#f44336",
  green: "#4caf50",
} as const;

export type StarColorVariant = keyof typeof STAR_COLORS;

type StarBorderProps<T extends React.ElementType> = Omit<
  React.ComponentPropsWithoutRef<T>,
  "color" | "speed"
> & {
  as?: T;
  className?: string;
  children?: React.ReactNode;
  /**
   * Color variant or custom hex/rgb color
   * @default "white"
   */
  color?: StarColorVariant | string;
  /**
   * Animation speed
   * @default "6s"
   */
  speed?: React.CSSProperties["animationDuration"];
  /**
   * Border thickness in pixels
   * @default 1
   */
  thickness?: number;
  /**
   * Opacity of the star effect
   * @default 0.7
   */
  opacity?: number;
  /**
   * Size of the radial gradient effect
   * @default 10
   */
  gradientSize?: number;
};

const StarBorder = <T extends React.ElementType = "button">({
  as,
  className = "",
  color = "white",
  speed = "6s",
  thickness = 1,
  opacity = 0.7,
  gradientSize = 10,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || "button";

  // Resolve color - check if it's a predefined variant or custom color
  const resolvedColor = (STAR_COLORS[color as StarColorVariant] ||
    color) as string;

  // Create gradient with better color stops for golden effect
  const createGradient = (baseColor: string) => {
    if (color === "gold" || color === "golden" || color === "amber") {
      // Enhanced golden gradient with multiple stops for richer effect
      return `radial-gradient(circle, ${baseColor} 0%, ${baseColor}cc 5%, ${baseColor}88 ${gradientSize}%, transparent ${
        gradientSize + 5
      }%)`;
    }
    return `radial-gradient(circle, ${baseColor}, transparent ${gradientSize}%)`;
  };

  const gradientStyle = createGradient(resolvedColor);

  return (
    <Component
      className={`star-border-container ${className}`}
      {...(rest as React.ComponentPropsWithoutRef<T>)}
      style={{
        padding: `${thickness}px 0`,
        ...(rest as any).style,
      }}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: gradientStyle,
          animationDuration: speed,
          opacity,
        }}
      />
      <div
        className="border-gradient-top"
        style={{
          background: gradientStyle,
          animationDuration: speed,
          opacity,
        }}
      />
      <div className="inner-content">{children}</div>
    </Component>
  );
};

export default StarBorder;
