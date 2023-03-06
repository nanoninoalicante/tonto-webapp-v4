import { useRef } from "react";
import { useScroll } from "react-use";
import { useBoundingClientRect } from "@rooks/use-boundingclientrect";

const useSubtitlesComposable = () => {
  const cuesHolder = useRef<HTMLDivElement>(null);
  const { height: top } = useBoundingClientRect(cuesHolder);
  const { y } = useScroll(cuesHolder.current, { behavior: "smooth", throttle: 800 });
  const offset = 60;
  return {
    y,
    top,
    cuesHolder,
    offset,
  };
};

export default useSubtitlesComposable;
