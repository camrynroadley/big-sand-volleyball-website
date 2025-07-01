"use client";

import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
  ReactNode,
  ReactElement,
  ElementType,
  MouseEvent,
} from "react";
import { cn } from "@/lib/utils";

type MouseEnterContextType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

const MouseEnterContext = createContext<MouseEnterContextType | undefined>(undefined);

export const useMouseEnter = (): MouseEnterContextType => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};

interface CardContainerProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: CardContainerProps): ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
  };

  const handleMouseLeave = () => {
    setIsMouseEntered(false);
    if (containerRef.current) {
      containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    }
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn("items-center justify-center", containerClassName)}
        style={{ perspective: "1000px" }}
        role="region"
        aria-label="Interactive 3D Card Container"
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "flex items-center justify-center relative transition-all duration-200 ease-linear",
            className
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export const CardBody = ({ children, className }: CardBodyProps): ReactElement => {
  return (
    <div
      className={cn(
        "h-96 w-96 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
        className
      )}
    >
      {children}
    </div>
  );
};

interface CardItemProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  translateX?: number;
  translateY?: number;
  translateZ?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  [key: string]: unknown;
}

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: CardItemProps): ReactElement => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMouseEntered] = useMouseEnter();

  const handleAnimations = useCallback(
    (active: boolean = isMouseEntered) => {
      if (!ref.current) return;
      ref.current.style.transform = active
        ? `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
        : `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    },
    [
      isMouseEntered,
      translateX,
      translateY,
      translateZ,
      rotateX,
      rotateY,
      rotateZ,
    ]
  );

  useEffect(() => {
    handleAnimations();
  }, [handleAnimations]);

  return (
    <Tag
      ref={ref}
      className={cn("w-fit transition duration-200 ease-linear", className)}
      tabIndex={0}
      onFocus={() => handleAnimations(true)}
      onBlur={() => handleAnimations(false)}
      onMouseEnter={() => handleAnimations(true)}
      onMouseLeave={() => handleAnimations(false)}
      {...rest}
    >
      {children}
    </Tag>
  );
};
