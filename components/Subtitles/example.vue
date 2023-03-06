import { ref } from "vue";
import { useScroll, useElementBounding } from "@vueuse/core";
const cuesHolder = ref();
const { top } = useElementBounding(cuesHolder);
const { y } = useScroll(cuesHolder, { behavior: "smooth", throttle: 800 });
const offset = 60;
export const useSubtitlesComposable = () => {
    return {
        y,
        top,
        cuesHolder,
        offset
    };
};