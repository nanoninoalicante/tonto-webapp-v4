import React, { useEffect, useState, useRef } from "react"
import style from "../../styles/GlobalPlayer.module.css"
import Hls from "hls.js"
import Play from "../../public/flex-ui-assets/player/play.svg"
import Pause from "../../public/flex-ui-assets/player/pause.svg"
import Next10 from "../../public/flex-ui-assets/player/next10.svg"
import Redo10 from "../../public/flex-ui-assets/player/redo10.svg"
import Next from "../../public/flex-ui-assets/player/next.svg"
import Back from "../../public/flex-ui-assets/player/back.svg"
import { FaVolumeUp } from "react-icons/fa"

const GlobalPlayer = (props: any) => {
    // state
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [speed, setSpeed] = useState(1);
    const [volume, setVolume] = useState(false)
    // references
    const audioPlayer: any = useRef(null);
    const hlsRef: any = useRef()
    const progressBar: any = useRef();
    const animationRef: any = useRef();

    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration)
        setDuration(seconds)
        progressBar.current.max = seconds

    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])



    useEffect(() => {
        if (Hls.isSupported()) {
            if (hlsRef?.current) {
                hlsRef.current.destroy()
            }
            if (audioPlayer?.current) {
                const config = {
                    enableWorker: false
                }
                hlsRef.current = new Hls(config);
                hlsRef.current.attachMedia(audioPlayer.current);
                hlsRef.current.on(Hls.Events.MEDIA_ATTACHED, () => {
                    hlsRef.current?.loadSource(props.data?.streamingUrl);
                    hlsRef.current?.on(Hls.Events.MANIFEST_PARSED, () => {
                        hlsRef.current?.on(Hls.Events.LEVEL_LOADED, (_: string, data: any) => {
                            const duration: number = data.details.totalduration;
                            setDuration(duration);
                            setCurrentTime(0);
                        })
                    });
                })
            }
        } else {
            audioPlayer.current.src = props.data?.streamingUrl;
            setDuration(duration);
            setCurrentTime(0);
        }
    }, [props.data])

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
        if (!isPlaying) {
            const play = audioPlayer.current.play();

            if (play !== undefined) {
                play.then(() => {
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
        //router.push(`/post/${props.props.data.next}`)      
    }

    const toggleVolume = () => {
        setVolume(!volume)
    }

    const handleVolume = () => {
        return <progress />
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
        <div className="fixed bottom-0 z-50 w-full md:w-[50%] bg-white rounded-t-xl">
            <div className="flex flex-row justify-center items-center w-full my-2">
                <audio ref={audioPlayer} preload="metadata" />

                {/* BACK AUDIO */}
                <button className="p-3 mx-2 rounded-full cursor-pointer" onClick={handleBack} >
                    <Back size={30} />
                </button>

                {/* REDO 10*/}
                <button className="p-3 mx-2 rounded-full" onClick={handleRedo}>
                    <Redo10 size={30} />
                </button>

                {/* PLAY / PAUSE */}
                <button onClick={togglePlayPause} className="p-3 mx-2 rounded-full">
                    {isPlaying ? <Pause size={30} /> : <Play size={30} />}
                </button>

                {/* NEXT 10 */}
                <button className="p-3 mx-2 rounded-full" onClick={handleNext10}>
                    <Next10 size={30} />
                </button>

                {/* NEXT AUDIO */}
                <button className="p-3 mx-2 rounded-full cursor-pointer" onClick={handleNext}>
                    <Next size={30} />
                </button>
            </div>
            <div className="flex flex-row justify-center items-center mb-2 gap-4">
                {/* SPEED CONTROL */}
                <button onClick={handleSpeed} className="w-14 border-2 border-gray-600 rounded-full">
                    {
                        {
                            1: "1x",
                            1.5: "1.5x",
                            2: "2x"
                        }[speed]
                    }
                </button>
            </div>
            <div className="flex flex-row justify-center font-mono items-center w-full py-0 px-0 mb-2">

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