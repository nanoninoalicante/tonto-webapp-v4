import { useEffect, useRef, useState } from "react";
import Cue from "./Cue";
import  useSubtitlesComposable from "./subtitlesComposable";
import Hls from "hls.js";

const Subtitles = (props) => {
  const { cuesHolder } = useSubtitlesComposable();
  const audioRef = useRef(null);
  const [cues, setCues] = useState([]);
  const [audioLoaded, setAudioLoaded] = useState(false);

  const loadHlsAudio = ({ streamingUrl }) => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      console.log("hls is supported: ", streamingUrl);
      if (audioRef.current) {
        hls.attachMedia(audioRef.current);
      }
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        console.log("media attached");
        hls.loadSource(streamingUrl);
      });

      hls.on(Hls.Events.MANIFEST_LOADED, () => {
        console.log("manifest loaded");
        for (let i = 0; i < audioRef.current.textTracks.length; i++) {
          audioRef.current.textTracks[i].mode = "showing";
          console.log("cuelist: ", audioRef.current.textTracks[i]);
          console.log("index: ", i);
          setCues(audioRef.current.textTracks[i].cues);
        }
      });
    }
    return "loadHlsAudio";
  };

  useEffect(() => {
    loadHlsAudio({
      streamingUrl:
        "https://audios-prod.cdn.urloapp.com/27jgIbd45RUcPbkalzT8joxa8Ue/62568ade65e17e000f6c0900/62568ade65e17e000f6c0900_1.m3u8",
    });
  }, []);

  return (
    <div className="container px-4 mx-auto">
      <h1 className="text-2xl my-4">Tonto</h1>
      <div className="flex">
        <audio
          ref={audioRef}
          controls
          crossOrigin="anonymous"
          preload="metadata"
          onLoadedMetadata={() => setAudioLoaded(true)}
        >
          <track
            label="English"
            kind="subtitles"
            srcLang="en"
            src="https://transcriptions-staging.cdn.gettonto.com/27jgIbd45RUcPbkalzT8joxa8Ue/62568ade65e17e000f6c0900/62568ade65e17e000f6c0900_1_static.mp4.vtt"
            default
          />
        </audio>
      </div>
      <div
        style={{ display: audioLoaded && cues.length > 0 ? "block" : "none" }}
        ref={cuesHolder}
        className="flex flex-col mt-8 h-[300px] overflow-y-scroll scroll-smooth"
      >
        {cues.map((cue) => (
          <div key={cue.id} className="">
            <Cue cue={cue} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subtitles;
