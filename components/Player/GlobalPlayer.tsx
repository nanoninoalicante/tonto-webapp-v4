import React, { useEffect, useState, useRef } from "react"
import AudioPlayerHolder from "./AudioPlayerHolder"
import BackSkipButton from "./BackSkipButton"
import ForwardSkipButton from "./ForwardSkipButton"
import {PlayerSeeker} from "./PlayerSeeker"
import PlayPauseButton from "./PlayPauseButton"
import TimeDisplay from "./TimeDisplay"
import ReactPlayer from "react-player"
import { BiRightArrowAlt } from "react-icons/bi"
import { BiLeftArrowAlt } from "react-icons/bi"
import { FaPlay } from "react-icons/fa"
import { FaPause } from "react-icons/fa"
import style from "../../styles/GlobalPlayer.module.css"
interface Props {
    postId: string
}
interface State {
    streamingUrl: string
}

const GlobalPlayer = (props: any) => {
    // state
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    // references
    const audioPlayer: any = useRef();
    const progressBar: any = useRef();
    const animationRef: any = useRef();
    
    useEffect(() => {
        const url = `${process.env.FEED_API_BASE_URL}posts/${props.postId}?api_key=16dea2a1-35e8-4332-8cd6-e534300d16b7`;
        fetch(url, { method: "GET" })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                //this.setState(data.data[0])
            })
        const seconds = Math.floor(audioPlayer.current.duration)
        setDuration(seconds)
        progressBar.current.max = seconds
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

    const togglePlayPause = () => { 
        const prevValue = isPlaying
        setIsPlaying(!prevValue); 
        
        if(!prevValue){
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
        const returnMin = minutes < 10 ? `0${minutes}`:`${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnSecs = seconds < 10 ? `0${seconds}`:`${seconds}`;
        return `${returnMin}:${returnSecs}`
    }

    const onChangeRange = () =>{
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
    }

    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
        setCurrentTime(progressBar.current.value)
    }

    return (
        <div className="md:w-1/3  mx-auto py-10 px-2  bg-gray-400 bg-opacity-30 border border-gray-100 rounded-b-3xl shadow-3xl">
            <div className="flex flex-row justify-center items-center w-full py-4 px-2">
                <audio ref={audioPlayer} src="https://d3ctxlq1ktw2nl.cloudfront.net/staging/2022-10-4/295063124-44100-2-967bc9c977063.mp3" preload="metadata" />
                <button className="p-3 mx-7 bg-teal-500 rounded-full"><BiLeftArrowAlt size={30} /></button>
                <button onClick={togglePlayPause} className="p-3 mx-7 bg-teal-500 rounded-full">
                    {isPlaying ? <FaPause size={30} /> : <FaPlay size={30} />}
                </button>
                <button className="p-3 mx-7 bg-teal-500 rounded-full"><BiRightArrowAlt size={30} /></button>
            </div>
            <div className="flex flex-row justify-center font-mono items-center w-full py-4 px-2">
                {/* current time */}
                <div className="p-1 mx-7 bg-teal-500 rounded-md">
                    {calculateTime(currentTime)}
                </div>

                {/* progress bar */}
                <div className="">
                    <input type="range" defaultValue="0" className={style.progressBar} ref={progressBar} onChange={onChangeRange}/>
                </div>

                {/* duration */}
                <div className="p-1 mx-7 bg-teal-500 rounded-md">
                    {(duration && !isNaN(duration)) && calculateTime(duration)}
                </div>
            </div>
        </div>
    );
}
export { GlobalPlayer };