import { useEffect, useState } from "react";

export const useClickOutside = (compoRef: any, e: any) => {
  const [isOutSide, setIsOutSide] = useState(false);
  const data = (e: any) => {
    if (compoRef?.current && !compoRef?.current?.containes(e.target)) {
      setIsOutSide(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", data);
    return () => document.removeEventListener("click", data);
  }, [data]);
  return { isOutSide };
};
