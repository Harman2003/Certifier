import {useRef } from "react";

const useMultiRef = (fields: Record<string, number>) => {
  const ref = useRef<(HTMLInputElement | null)[]>([]);
  const length = Object.keys(fields).length;
  ref.current.fill(null, 0, length);
  const getRef = (keys: string[]) => {
    return keys.map((key)=>ref.current[fields[key]])
  };
    return { ref, getRef };
};
export default useMultiRef;
