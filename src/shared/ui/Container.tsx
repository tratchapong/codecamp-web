import { ReactNode } from "react";

export function Container({
  className = "",
  children,
  size = "6xl",
}: {
  className?: string;
  children: ReactNode;
  size?: "6xl" | "2xl" | "full";
}) {
  const maxStyles = {
    "6xl": "max-w-6xl",
    "2xl": "max-w-screen-2xl",
    "full": "max-w-none",
  };

  return (
    <div className={`mx-auto w-full ${maxStyles[size]} px-6 md:px-10 ${className}`}>
      {children}
    </div>
  );
}
