var moment = require('moment');
import Hls from 'hls.js';
import { useEffect, useRef, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import style from "../styles/AudioComment.module.css"

const Comments = (props) => {
    const { data } = props
    const showComments = () => {
        return (
            data.map((comment, i) => {
                const [playing, setPlaying] = useState(false);
                const [duration, setDuration] = useState(0);
                const [currentTime, setCurrentTime] = useState(0);

                const audio: any = useRef(null)
                const hlsRef: any = useRef()
                const progressBar: any = useRef()
                const animationRef: any = useRef()

                useEffect(() => {
                    loadHlsAudio({ streamingUrl: comment.streamingUrl[0] })
                    const seconds = Math.floor(audio?.current.duration)
                    progressBar.current.max = seconds
                }, [comment])

                const loadHlsAudio = ({ streamingUrl }) => {
                    if (Hls.isSupported()) {
                        if (hlsRef?.current) {
                            hlsRef.current.destroy()
                        }
                        if (audio?.current) {
                            const config = {
                                enableWorker: false
                            }
                            hlsRef.current = new Hls(config);
                            hlsRef.current.attachMedia(audio.current);
                            hlsRef.current.on(Hls.Events.MEDIA_ATTACHED, () => {
                                hlsRef.current?.loadSource(streamingUrl);
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
                        audio.current.src = props.data?.streamingUrl;
                        setDuration(duration);
                        setCurrentTime(0);
                    }
                };
                const calculateTime = (secs) => {
                    const minutes = Math.floor(secs / 60);
                    const returnMin = minutes < 10 ? `${minutes}` : `${minutes}`;
                    const seconds = Math.floor(secs % 60);
                    const returnSecs = seconds < 10 ? `0${seconds}` : `${seconds}`;
                    return `${returnMin}:${returnSecs}`
                }
                const togglePlay = () => {
                    setPlaying(!playing);
                    if (!playing) {
                        const play = audio.current.play();

                        if (play !== undefined) {
                            play.then(() => {
                                progressBar.current.value = audio.current.currentTime
                                animationRef.current = requestAnimationFrame(whilePlaying)
                            }).catch((error: any) => {
                                console.log(error)
                            })
                        }
                    } else {
                        const pause = audio.current.pause();
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
                    progressBar.current.value = audio.current.currentTime;
                    changePlayerCurrentTime();
                    animationRef.current = requestAnimationFrame(whilePlaying);
                }

                const changeRange = () => {
                    audio.current.currentTime = progressBar.current.value;
                    changePlayerCurrentTime();
                }

                const changePlayerCurrentTime = () => {
                    if (currentTime !== progressBar.current.value) {
                        setCurrentTime(progressBar.current.value);
                    }
                    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / audio.current.duration * 100}%`)
                }

                return (
                    <div key={i} className="px-4 flex flex-row mb-4">
                        <img className="flex flex-col w-9 h-9 rounded-full" src={comment.userInfo.profileImg || "/flex-ui-assets/images/tontoprofile_defualt.png"} />
                        <div className="flex flex-col pl-4 text-[15px] mb-2">
                            <div className="flex flex-row">
                                <p className='text-white dark:text-[#3C3C3C] font-bold text-[15px] leading-[18px]'>@{comment.userInfo.userName}</p>
                                <div className="ml-[8px] text-[14px] dark:text-[#5F5F5F] font-light flex items-center text-[#EBEBEB]">
                                    {moment(comment.createdAt).fromNow()}
                                </div>
                            </div>
                            <div className='flex p-2 items-center place-items-center gap-2 w-full bg-[#109C90] rounded-r-xl rounded-bl-xl'>
                                <audio ref={audio} />
                                <button onClick={togglePlay} >
                                    {playing ? <BsFillPauseFill className="text-white" size={30} /> : <BsFillPlayFill className="text-white" size={30} />}
                                </button>

                                <div>
                                    <input type="range" ref={progressBar} defaultValue={0} className={style.progressBar} onChange={changeRange} />
                                </div>

                                <div className='text-white'>
                                    {currentTime == 0 && !isNaN(currentTime) ? calculateTime(duration) : calculateTime(currentTime)}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        )
    }
    const noData = () => {
        return (
            <span className='flex justify-center italic text-[14px] text-gray-300 bg-[#5F5F5F] w-[94%] md:w-[50%] py-3 rounded-b-lg'>This post has no comments</span>
        )
    }

    return (
        data.length ?
            <div className='w-full dark:bg-[#F8F8F8] bg-[#5F5F5F] max-h-[293px] overflow-y-scroll no-scrollbar rounded-b-xl'>
                {showComments()}
            </div>
            : noData()
    )
}

export default Comments