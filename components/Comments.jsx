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
                }, [])

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
                    <div key={i} className="w-[94%] md:w-[50%] bg-[#5F5F5F] p-4 flex flex-row mb-4">
                        <img className="flex flex-col w-9 h-9 rounded-full" src={comment.userInfo.profileImg || "/flex-ui-assets/images/tontoprofile_defualt.png"} />
                        <div className="flex flex-col pl-4 text-[15px] mb-2">
                            <div className="flex flex-row">
                                <p>@{comment.userInfo.userName}</p>
                                <div className="ml-[8px] text-[14px] flex items-center text-[#EBEBEB]">
                                    {moment(comment.createdAt).fromNow()}
                                </div>
                            </div>
                            <div className='flex p-2 items-center place-items-center gap-2 w-[228px] bg-[#109C90] rounded-r-xl rounded-bl-xl'>
                                <audio ref={audio} src={comment.downloadUrl[0]} />
                                <button onClick={togglePlay}>
                                    {playing ? <BsFillPauseFill size={30} /> : <BsFillPlayFill size={30} />}
                                </button>

                                <div>
                                    <input type="range" ref={progressBar} defaultValue={0} className={style.progressBar} onChange={changeRange} />
                                </div>

                                <div>
                                    {currentTime == '0:00' ? calculateTime(duration) : calculateTime(currentTime)}
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
        data.length ? showComments() : noData() 
    )
}

export default Comments