import React, { useEffect, useState, useRef } from "react"
import { BiRightArrowAlt } from "react-icons/bi"
import { BiLeftArrowAlt } from "react-icons/bi"
import { FaPlay } from "react-icons/fa"
import { FaPause } from "react-icons/fa"
import style from "../../styles/GlobalPlayer.module.css"
import Hls from "hls.js"
interface Props {
    postId: string
}
const state = {
    commentsCount: 0,
    createdAt: "",
    description: "",
    explicit: { badWords: 'no', sex: 'no', content: 'no', others: 'no', violence: 'no' },
    hasExplicitContent: false,
    language: "en",
    likesCount: 0,
    shareCount: 0,
    status: "",
    streamingUrl: "",
    updatedAt: "",
    userInfo: { id: '', userName: '', profileImg: '', isUserVerified: null },
    uuid: "",
    visibility: ""
}

const GlobalPlayer = (props: any) => {
    // state
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [data, setData] = useState(state)
    // references
    const audioPlayer: any = useRef(null);
    const hlsRef: any = useRef<Hls | null>(null)
    const progressBar: any = useRef();
    const animationRef: any = useRef();

    useEffect( () => {        
        const seconds = Math.floor(audioPlayer.current.duration)
        setDuration(seconds)
        progressBar.current.max = seconds
        
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

    useEffect(() => {
        const url = `${process.env.FEED_API_BASE_URL}posts/${props.postId}?api_key=16dea2a1-35e8-4332-8cd6-e534300d16b7`;
        fetch(url, { method: "GET" })
        .then((response) => response.json())
        .then((data) => {            
            setData(data.data[0])
            console.log(data.data[0].userInfo.profileImg)
        })
    },[])
    
    useEffect(() => {
        if(hlsRef.current){
            hlsRef.current.destroy()
        }

        if(audioPlayer.current) {
            hlsRef.current = new Hls();
            hlsRef.current.attachMedia(audioPlayer.current);
            hlsRef.current.on(Hls.Events.MEDIA_ATTACHED, () => {
                hlsRef.current?.loadSource(data.streamingUrl);

                hlsRef.current?.on(Hls.Events.MANIFEST_PARSED, () => {
                    hlsRef.current?.on(Hls.Events.LEVEL_LOADED, (_: string, data: Hls.loadedmetadata) => {
                        const duration: number = data.details.totalduration;
                        setDuration(duration);
                        setCurrentTime(0);
                    })
                });
            })
        }
    },[data])

    const togglePlayPause = () => {
        const prevValue = isPlaying
        setIsPlaying(!prevValue);

        if (!prevValue) {
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying)
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current)
        }

    }

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying)
    }


    const calculateTime = (secs: number) => {
        const minutes = Math.floor(secs / 60);
        const returnMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnSecs = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnMin}:${returnSecs}`
    }

    const onChangeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
    }

    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
        setCurrentTime(progressBar.current.value)
    }

    return (
        <div className="md:w-1/3 lg:w-1/2 mt-70 bg-teal-500 border border-gray-200 shadow-2xl rounded-b-xl mx-auto">
            <div className="flex flex-row justify-center items-center w-full py-4 px-2">
                <audio ref={audioPlayer} preload="metadata" />
                <button className="p-3 mx-7 bg-teal-500 rounded-full"><BiLeftArrowAlt size={30} /></button>
                <button onClick={togglePlayPause} className="p-3 mx-7 bg-teal-500 rounded-full">
                    {isPlaying ? <FaPause size={30} /> : <FaPlay size={30} />}
                </button>
                <button className="p-3 mx-7 bg-teal-500 rounded-full"><BiRightArrowAlt size={30} /></button>
            </div>
            <div className="flex flex-row justify-center font-mono items-center w-full py-4 px-2">
                
                {/* current time */}
                <div className="p-1 mx-7 rounded-md">
                    {calculateTime(currentTime)}
                </div>

                {/* progress bar */}
                <div className="">
                    <input type="range" defaultValue="0" className={style.progressBar} ref={progressBar} onChange={onChangeRange} />
                </div>

                {/* duration */}
                <div className="p-1 relative mx-7 rounded-md">
                    {(duration && !isNaN(duration)) && calculateTime(duration)}
                </div>
            </div>
        </div>
    );
}
export { GlobalPlayer };