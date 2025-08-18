"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  ReactNode,
  useMemo,
} from "react";
import Lenis from "lenis";

interface LenisContextType {
  lenis: Lenis | null;
  scrollTo: (
    target: string | number | HTMLElement,
    options?: {
      offset?: number;
      duration?: number;
      easing?: (t: number) => number;
    }
  ) => void;
}

const LenisContext = createContext<LenisContextType | undefined>(undefined);

export const useLenis = () => {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error("useLenis must be used within a LenisProvider");
  }
  return context;
};

interface LenisProviderProps {
  children: ReactNode;
  options?: {
    duration?: number;
    easing?: (t: number) => number;
    smooth?: boolean;
    mouseMultiplier?: number;
    smoothTouch?: boolean;
    touchMultiplier?: number;
    infinite?: boolean;
    orientation?: "vertical" | "horizontal";
    gestureOrientation?: "vertical" | "horizontal" | "both";
    wrapper?: HTMLElement;
    content?: HTMLElement;
    wheelEventsTarget?: HTMLElement;
    eventsTarget?: HTMLElement;
    smoothWheel?: boolean;
    syncTouch?: boolean;
    syncTouchLerp?: number;
    touchInertiaMultiplier?: number;
    __experimental__naiveDimensions?: boolean;
  };
}

export const LenisProvider = ({
  children,
  options = {},
}: LenisProviderProps) => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  // Memoize the Lenis options to prevent unnecessary re-initializations
  const lenisOptions = useMemo(
    () => ({
      duration: 1, // Increased for longer, more fluid scrolling
      easing: (t: number) => {
        // Custom easing for more "swingy" effect - ease-out-quart
        return 1 - Math.pow(1 - t, 3);
      },
      orientation: "vertical" as const,
      gestureOrientation: "vertical" as const,
      smooth: true,
      wheelMultiplier: 3, // Reduced for smoother mouse wheel response
      smoothTouch: false,
      touchMultiplier: 1.5, // Slightly reduced for better touch control
      infinite: false,
      syncTouch: false,
      syncTouchLerp: 0.1, // Increased for smoother lerp
      touchInertiaMultiplier: 25, // Reduced for less aggressive inertia
      wheelEventsTarget: typeof window !== "undefined" ? window : undefined,
      ...options, // Allow overriding defaults
    }),
    [options]
  );

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis(lenisOptions);
    lenisRef.current = lenis;

    // Improved RAF function with error handling
    const raf = (time: number) => {
      try {
        lenis.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      } catch (error) {
        console.error("Lenis RAF error:", error);
      }
    };

    rafRef.current = requestAnimationFrame(raf);

    // Handle window focus/blur for better performance
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      } else {
        if (!rafRef.current) {
          rafRef.current = requestAnimationFrame(raf);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup function
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [lenisOptions]);

  // Enhanced scrollTo function with better defaults
  const scrollTo = useMemo(
    () =>
      (
        target: string | number | HTMLElement,
        scrollOptions?: {
          offset?: number;
          duration?: number;
          easing?: (t: number) => number;
          lock?: boolean;
          force?: boolean;
          onComplete?: () => void;
        }
      ) => {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(target, {
            offset: 0,
            duration: lenisOptions.duration,
            easing: lenisOptions.easing,
            ...scrollOptions,
          });
        }
      },
    [lenisOptions.duration, lenisOptions.easing]
  );

  const contextValue = useMemo(
    () => ({
      lenis: lenisRef.current,
      scrollTo,
    }),
    [scrollTo]
  );

  return (
    <LenisContext.Provider value={contextValue}>
      {children}
    </LenisContext.Provider>
  );
};
