"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, useAnimation } from "framer-motion";

interface PageTransitionContextValue {
  navigate: (href: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextValue>({
  navigate: () => {},
});

export function usePageTransition() {
  return useContext(PageTransitionContext);
}

// Three layers: dark green → mid green → amber
const LAYERS = [
  "#0d3314", // sap green
  "#2d8042", // lighter green
  "#c87c2e", // amber / yellow ochre
];

const DURATION = 0.7; // per layer
const STAGGER = 0.12;  // delay between layers
const EASE: [number, number, number, number] = [0.65, 0, 0.15, 1];

export default function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const layerControls = [useAnimation(), useAnimation(), useAnimation()];
  const pendingHref = useRef<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // After new page mounts, slide all layers back down (staggered, reverse order)
  useEffect(() => {
    if (!isTransitioning) return;

    const slideOut = async () => {
      await Promise.all(
        [...layerControls].reverse().map((ctrl, i) =>
          ctrl.start({
            y: "-100%",
            transition: { duration: DURATION, ease: EASE, delay: i * STAGGER },
          })
        )
      );
      setIsTransitioning(false);
      layerControls.forEach((ctrl) => ctrl.set({ y: "100%" }));
    };

    slideOut();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const navigate = useCallback(
    async (href: string) => {
      if (href === pathname) return;
      pendingHref.current = href;
      setIsTransitioning(true);

      // Slide layers up to cover screen (staggered)
      await Promise.all(
        layerControls.map((ctrl, i) =>
          ctrl.start({
            y: "0%",
            transition: { duration: DURATION, ease: EASE, delay: i * STAGGER },
          })
        )
      );

      window.scrollTo({ top: 0, behavior: "instant" });
      router.push(href);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname, router]
  );

  return (
    <PageTransitionContext.Provider value={{ navigate }}>
      {children}

      {LAYERS.map((color, i) => (
        <motion.div
          key={color}
          initial={{ y: "100%" }}
          animate={layerControls[i]}
          aria-hidden="true"
          className="fixed pointer-events-none"
          style={{
            backgroundColor: color,
            zIndex: 9990 + i,
            left: '-10%',
            right: '-10%',
            bottom: '-5%',
            height: '130vh',
            borderRadius: '50% 50% 0 0 / 8% 8% 0 0',
          }}
        />
      ))}
    </PageTransitionContext.Provider>
  );
}
