import { useEffect } from "react";

export function useScroll() {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  return [];
}

export default useScroll;
