import { useEffect, useRef, useState } from "react";

export const useThemeDetector = () => {
  const getCurrentTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());
  const mqListener = (event: any) => {
    setIsDarkTheme(event.matches);
  };

  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    darkThemeMq.addListener(mqListener);
    return () => darkThemeMq.removeListener(mqListener);
  }, []);
  return isDarkTheme;
};
export const useHorizontalScroll = () => {
  const scrollArea = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleHorizontalScroll = (event: any) => {
      if (!scrollArea.current) return;
      const target = event.target as HTMLElement;
      if (
        scrollArea.current !== event.target &&
        !scrollArea.current.contains(target)
      )
        return;
      event.preventDefault();
      const current = scrollArea.current;
      if (current) {
        current.scrollLeft = current.scrollLeft + event.deltaY / 2;
      }
    };
    window.addEventListener("wheel", handleHorizontalScroll, {
      passive: false,
    });
    return () => window.removeEventListener("wheel", handleHorizontalScroll);
  }, [scrollArea.current]);
  return scrollArea;
};

export const useKeyboardListener = (key: string, callback: () => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) callback();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
};
