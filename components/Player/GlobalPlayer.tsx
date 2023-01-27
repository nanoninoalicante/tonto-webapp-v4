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



const GlobalPlayer = (props: any) => {
    const { theme, systemTheme } = useTheme();
    console.log(props.data)
    const currentTheme = theme === "system" ? systemTheme : theme;
    // state
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [speed, setSpeed] = useState(1);

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
        audioPlayer.current.src = props.data.downloadUrl[0]
    }, [props.data])

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

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime
        animationRef.current = requestAnimationFrame(whilePlaying)
        changePlayerCurrentTime();
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
        <div className="relative z-10 w-[85%] sm:w-[94%] mx-4 md:w-[50%] bg-[#EAEAEA] rounded-b-lg dark:bg-[#5f5f5f]">
            <div className="flex flex-row overflow-hidden justify-center place-items-center gap-0 sm:gap-1 md:gap-2 lg:gap-3">
                <audio ref={audioPlayer} preload="metadata" />

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
                <button className="p-3" onClick={handleRedo}>
                    {theme === "dark" ?
                        <Redo10Dark /> :
                        <Redo10 className="dark:text-[#00eedc]" />
                    }
                </button>

                {/* BACK AUDIO */}
                <button className="p-3 cursor-pointer" onClick={handleBack} >
                    {theme === "dark" ?
                        <BackDark /> :
                        <Back size={30} />
                    }
                </button>

                {/* PLAY / PAUSE */}
                <button onClick={togglePlayPause} className="p-3">
                    {theme === "dark" ?
                        isPlaying ? <PauseDark /> : <PlayDark /> :
                        isPlaying ? <Pause /> : <Play />
                    }

                </button>

                {/* NEXT AUDIO */}
                <button className="p-3 cursor-pointer" onClick={handleNext}>
                    {theme === "dark" ?
                        <NextDark /> :
                        <Next size={30} />
                    }
                </button>

                {/* NEXT 10 */}
                <button className="p-3" onClick={handleNext10}>
                    {theme === "dark" ?
                        <Next10Dark /> :
                        <Next10 size={30} />
                    }
                </button>


                {/* OPTIONS */}
                <button className="p-3">
                    {theme === "dark" ?
                        <OptionsDark /> :
                        <Options size={30} />
                    }
                </button>
            </div>
            <div className=" flex flex-row justify-center overflow-hidden font-mono items-center w-full py-0 px-0 mb-2">

                {/* current time */}
                <div className="p-1 mx-1 rounded-md">
                    {calculateTime(currentTime)}
                </div>

                {/* progress bar */}
                <div>
                    <input type="range" defaultValue="0" className={style.progressBar} ref={progressBar} onChange={onChangeRange} />
                </div>

                {/* duration */}
                <div className="p-1 relative mx-1 rounded-md">
                    {duration && props.data ? calculateTime(duration) : calculateTime(0)}
                </div>
            </div>
        </div>
    );
}
export { GlobalPlayer };