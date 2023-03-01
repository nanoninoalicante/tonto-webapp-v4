import React, { useEffect, useState, useRef } from "react"
import style from "../../styles/GlobalPlayer.module.css"
import Hls from "hls.js"
import Play from "../../public/flex-ui-assets/player/play.svg"
import Pause from "../../public/flex-ui-assets/player/pause.svg"
import Next10 from "../../public/flex-ui-assets/player/next10.svg"
import Redo10 from "../../public/flex-ui-assets/player/redo10.svg"
import Next from "../../public/flex-ui-assets/player/next.svg"
import Back from "../../public/flex-ui-assets/player/back.svg"
import Options from "../../public/flex-ui-assets/player/options.svg"
import PlayDark from "../../public/flex-ui-assets/player/play_dark.svg"
import PauseDark from "../../public/flex-ui-assets/player/pause_dark.svg"
import Next10Dark from "../../public/flex-ui-assets/player/next10_dark.svg"
import Redo10Dark from "../../public/flex-ui-assets/player/redo10_dark.svg"
import NextDark from "../../public/flex-ui-assets/player/next_dark.svg"
import BackDark from "../../public/flex-ui-assets/player/back_dark.svg"
import OptionsDark from "../../public/flex-ui-assets/player/options_dark.svg"
import { useTheme } from 'next-themes'
import DownloadApp from "../Modals/DownloadApp"

const GlobalPlayer = (props: any) => {
    const { theme, systemTheme } = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;
    // state
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [speed, setSpeed] = useState(1);
    const [modal, setModal] = useState(false)

    // references
    const audioPlayer: any = useRef(null);
    const hlsRef: any = useRef();
    const progressBar: any = useRef();
    const animationRef: any = useRef();

    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration)
        setDuration(seconds)
        progressBar.current.max = seconds
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

    useEffect(() => {
    },[duration])

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
        if (!isPlaying) {
            const play = audioPlayer.current.play();

            if (play !== undefined) {
                play.then(() => {
                    progressBar.current.value = audioPlayer.current.currentTime
                    animationRef.current = requestAnimationFrame(whilePlaying)
                }).catch((error: any) => {
                    console.log(error)
                })
            }
        } else {
            const pause = audioPlayer.current.pause();
            if (pause !== undefined) {
                pause.then(() => {
                    cancelAnimationFrame(animationRef.current)
                }).catch((error: any) => {
                    console.log(error)
                })
            }
        }
    }
    
    const calculateTime = (secs: number) => {
        const minutes = Math.floor(secs / 60);
        const returnMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnSecs = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnMin}:${returnSecs}`
    }
    
    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying)
    }

    const onChangeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
    }

    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / audioPlayer.current.duration * 100}%`)
        setCurrentTime(progressBar.current.value)
    }

    const handleRedo = () => {
        audioPlayer.current.currentTime = audioPlayer.current.currentTime - 10
        progressBar.current.value = audioPlayer.current.currentTime
        changePlayerCurrentTime();
    }

    const handleNext10 = () => {
        audioPlayer.current.currentTime = audioPlayer.current.currentTime + 10
        progressBar.current.value = audioPlayer.current.currentTime
        changePlayerCurrentTime();
    }

    const handleBack = () => {
        if (props.back)
            window.location.href = `/post/${props.back}`
    }

    const handleNext = () => {
        if (props.next)
            window.location.href = `/post/${props.next}`
    }

    const handleSpeed = () => {
        switch (speed) {
            case 1:
                audioPlayer.current.playbackRate = 1.5;
                setSpeed(1.5)
                break;
            case 1.5:
                audioPlayer.current.playbackRate = 2;
                setSpeed(2)
                break;
            case 2:
                audioPlayer.current.playbackRate = 1;
                setSpeed(1)
                break
        }
    }

    return (
        <div className="relative z-10 w-[94%] sm:w-[94%] mx-4 md:w-[50%] bg-[#EAEAEA] rounded-b-lg dark:bg-[#5f5f5f]">
            <div className="flex flex-row overflow-hidden justify-center place-items-center gap-0 sm:gap-1 md:gap-2 lg:gap-3">
                <audio ref={audioPlayer} preload="metadata" src={props.data.downloadUrl[0]}/>

                {/* SPEED CONTROL */}
                <button onClick={handleSpeed} className="p-3 text-[#109C90] dark:text-[#00eedc]">
                    {
                        {
                            1: "1x",
                            1.5: "1.5x",
                            2: "2x"
                        }[speed]
                    }
                </button>

                {/* REDO 10*/}
                <button className="p-3 dark:hidden" onClick={handleRedo}>
                        <Redo10 />
                </button>

                <button className="p-3 hidden dark:block" onClick={handleRedo}>
                        <Redo10Dark />
                </button>

                {/* BACK AUDIO */}
                <button className="p-3 dark:hidden cursor-pointer" onClick={handleBack} >
                    <Back />
                </button>

                <button className="p-3 hidden dark:block cursor-pointer" onClick={handleBack} >
                    <BackDark />
                </button>

                {/* PLAY / PAUSE */}
                <button onClick={togglePlayPause} className="p-3 dark:hidden">
                        {isPlaying ? <Pause /> : <Play />}
                </button>

                <button onClick={togglePlayPause} className="p-3 hidden dark:block">
                        {isPlaying ? <PauseDark /> : <PlayDark />}
                </button>

                {/* NEXT AUDIO */}
                <button className="p-3 dark:hidden cursor-pointer" onClick={handleNext} >
                    <Next />
                </button>

                <button className="p-3 hidden dark:block cursor-pointer" onClick={handleNext} >
                    <NextDark />
                </button>

                {/* NEXT 10 */}
                <button className="p-3 dark:hidden" onClick={handleNext10}>
                        <Next10 />
                </button>

                <button className="p-3 hidden dark:block" onClick={handleNext10}>
                        <Next10Dark />
                </button>


                {/* OPTIONS */}
                <button onClick={() => { setModal(true) }} className="p-3 dark:hidden">
                        <Options />
                </button>

                <button onClick={() => { setModal(true) }} className="p-3 hidden dark:block">
                        <OptionsDark />
                </button>
            </div>
            <div className="relative px-2 grid grid-flow-row justify-center overflow-hidden items-center w-full py-0 mb-2">

                {/* progress bar */}
                <div className="mt-2">
                    <input type="range" defaultValue="0" className={style.progressBar} ref={progressBar} onChange={onChangeRange} />
                </div>

                <div className="grid grid-flow-col text-xs text-[#109C90] dark:text-[#00EEDC]">
                    {/* current time */}
                    <div className="p-1 mx-1 rounded-md">
                        {calculateTime(currentTime)}
                    </div>


                    {/* duration */}
                    <div className="p-1 rounded-md justify-self-end">
                        {duration ? calculateTime(duration) : calculateTime(0)}
                    </div>
                </div>
            </div>
            <DownloadApp show={modal} close={() => setModal(false)} />
        </div>
    );
}
export { GlobalPlayer };