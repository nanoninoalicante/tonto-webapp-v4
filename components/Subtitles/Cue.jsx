import { useState, useRef, useEffect } from "react";
import  useSubtitlesComposable  from "./subtitlesComposable";

const Subtitle = (props) => {
  const { cue } = props;
  const [isSelected, setIsSelected] = useState(false);
  const { y, top, offset } = useSubtitlesComposable();
  const cueItemRef = useRef<HTMLParagraphElement>(null);
  let cueItemY = 0;

  const handleEnter = (event) => {
    setIsSelected(true);
    const cueItemBox = cueItemRef.current?.getBoundingClientRect();
    cueItemY = cueItemBox?.y || 0;
    y.value = cueItemY - (top.value + offset);
    // Add this line
    y.set(y.value);
  };

  useEffect(() => {
    cue.addEventListener("enter", handleEnter);
    cue.addEventListener("exit", handleExit);
    return () => {
      cue.removeEventListener("enter", handleEnter);
      cue.removeEventListener("exit", handleExit);
    };
  }, [cue]);

  return (
    <p
      ref={cueItemRef}
      className={`text-gray-500 text-lg font-normal ${
        isSelected ? "font-bold text-gray-900" : ""
      }`}
    >
      {cue.text}
    </p>
  );
};

export default Subtitle;
