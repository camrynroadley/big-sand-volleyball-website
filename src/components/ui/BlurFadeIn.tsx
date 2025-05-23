import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

interface BlurFadeInWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // delay in milliseconds
}

export const BlurFadeInWrapper: React.FC<BlurFadeInWrapperProps> = ({
  children,
  className = "",
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={classNames(
        "transition-all duration-1000 ease-out",
        "opacity-0 blur-md translate-y-8",
        {
          "opacity-100 blur-0 translate-y-0": isVisible,
        },
        className
      )}
    >
      {children}
    </div>
  );
};
