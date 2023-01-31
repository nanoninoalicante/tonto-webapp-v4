var moment = require('moment');
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

                const audio = useRef()
                const progressBar = useRef()
                const animationRef = useRef()

                useEffect(() => {
                    const seconds = Math.floor(audio.current.duration)
                    setDuration(seconds)
                    progressBar.current.max = seconds
                }, [audio?.current?.loadedmetadata, audio?.current?.readyState])

                const calculateTime = (secs) => {
                    const minutes = Math.floor(secs / 60);
                    const returnMin = minutes < 10 ? `${minutes}` : `${minutes}`;
                    const seconds = Math.floor(secs % 60);
                    const returnSecs = seconds < 10 ? `0${seconds}` : `${seconds}`;
                    return `${returnMin}:${returnSecs}`
                }
                const togglePlay = () => {
                    setPlaying(!playing)

                    if (playing) {
                        audio.current.pause()
                        cancelAnimationFrame(animationRef.current);
                    } else {
                        audio.current.play()
                        animationRef.current = requestAnimationFrame(whilePlaying)
                    }
                }

                const whilePlaying = () => {
                    progressBar.current.value = audio.current.currentTime;
                    changePlayerCurrentTime();
                    animationRef.current = requestAnimationFrame(whilePlaying);
                }

                const changeRange = () => {
                    audio.current.currentTime = progressBar.current.value;
                    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
                }

                const changePlayerCurrentTime = () => {
                    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
                    setCurrentTime(progressBar.current.value);
                }

                return (
                    <div key={i} className="flex flex-row ml-2 mb-4 overflow-hidden">
                        <img className="flex flex-col w-9 h-9 rounded-full" src={comment.userInfo.profileImg} />
                        <div className="flex flex-col pl-4 text-[15px] mb-2">
                            <div className="flex flex-row">
                                <p>@{comment.userInfo.userName}</p>
                                <div className="ml-[8px] text-[14px] flex items-center text-[#EBEBEB]">
                                    {moment(comment.createdAt).fromNow()}
                                </div>
                            </div>
                            <div className='flex p-2 items-center place-items-center gap-2 w-full bg-[#109C90] rounded-r-xl rounded-bl-xl'>
                                <audio ref={audio} src={comment.downloadUrl[0]} />
                                <button onClick={togglePlay}>
                                    {playing ? <BsFillPauseFill size={30} /> : <BsFillPlayFill size={30} />}
                                </button>

                                <div>
                                    <input type="range" ref={progressBar} defaultValue={0} className={style.progressBar} onChange={changeRange} />
                                </div>

                                <div>
                                    {currentTime == 0 ? calculateTime(duration) : calculateTime(currentTime)}
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
            <span className='flex justify-center italic text-[14px] text-gray-300'>This post has no comments</span>
        )
    }

    return (
        <div className="w-[85%] sm:w-[94%] md:w-[50%] mx-4 mt-2 overflow-y-visible bg-[#5F5F5F] text-white rounded-lg">
            <div className="text-[14px] leading-4 flex flex-col justify-center place-items-center py-2">
                <p>
                    COMMENTS
                </p>
                <div className="h-1 w-12 bg-slate-300 rounded-lg" />
            </div>
            {data.length ? showComments() : noData()}
        </div>
    )
}

export default Comments