import { useRef } from "react";

export default function AudioPlayerHolder(){
 /*
Refs
 */
const audioHolderRef = useRef(null);
const audioRef = useRef(null);
    return (
        <div ref={audioHolderRef} className="m-0 h-0 w-0 p-0">
        <audio
            ref={audioRef}
            id="globalAudioPlayer"
            preload="metadata"
            /*@playing="playerStore.playing = true"
            @pause="playerStore.playing = false"
            @timeupdate="timeUpdated"
            @loadedmetadata="audioLoaded" */
        >
        </audio>
    </div>
    )    
}

