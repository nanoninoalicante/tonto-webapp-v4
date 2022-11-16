import { useEffect, useRef, useState } from "react"
import style from "../../styles/GlobalPlayer.module.css"

const PlayerSeeker = (props: any) => {
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
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
        setCurrentTime(progressBar.current.value)
    }

    return (
        <div className="">
            <input type="range" defaultValue="0" className={style.progressBar} ref={progressBar} onChange={onChangeRange}/>
        </div>

    )
}
export { PlayerSeeker }

