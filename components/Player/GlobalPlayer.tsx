import AudioPlayerHolder from "./AudioPlayerHolder"
import BackSkipButton from "./BackSkipButton"
import ForwardSkipButton from "./ForwardSkipButton"
import PlayerSeeker from "./PlayerSeeker"
import PlayPauseButton from "./PlayPauseButton"
import TimeDisplay from "./TimeDisplay"

export default function GlobalPlayer() {
    return (
        <div className="fixed z-9 bottom-0 w-full p-6 md:p-12">
            <div
                className="
                    py-10
                    px-2
                    mx-auto
                    w-full
                    md:w-4/5
                    lg:w-[500px]
                    bg-white bg-opacity-30
                    backdrop-blur-lg
                    max-w-6xl
                    border border-gray-200
                    rounded-2xl
                    shadow-5xl
                "
            >
                <div className="flex flex-col justify-center items-center w-full py-4 px-2">
                    <AudioPlayerHolder />
                    <div
                        className="
                            flex flex-row
                            justify-center
                            items-center
                            w-full
                            mb-2
                        "
                        
                    >
                        <div
                            className="
                                flex
                                w-1/4
                                justify-center
                                w-full
                                mb-0
                                md:mb-0
                            "
                        >
                            <BackSkipButton/>
                        </div>
                        <div
                            className="flex w-1/5 justify-start w-full mb-0 md:mb-0"
                        >
                            <TimeDisplay
                                />{/* {{ playerStore.getCurrentTime }}
                            </TimeDisplay> */}
                        </div>
                        <div
                            className="
                                flex
                                w-1/5
                                justify-center
                                w-full
                                mb-0
                                md:mb-0
                            "
                        >
                            <PlayPauseButton />
                        </div>
                        <div
                            className="
                                flex
                                w-1/5
                                justify-start
                                pl-5
                                w-full
                                mb-0
                                md:mb-0
                            "
                        >
                            <TimeDisplay></TimeDisplay>{/* {{ playerStore.getTotalDuration }}
                            </TimeDisplay> */}
                        </div>
                        <div className="
                                flex
                                w-1/5
                                justify-center
                                w-full
                                mb-0
                                md:mb-0
                            "
                        >
                            <ForwardSkipButton></ForwardSkipButton>
                                {/* <SkipForwardIcon></SkipForwardIcon> */}
                            
                        </div>
                    </div>
                    <div className="w-full">
                        <PlayerSeeker />
                    </div>
                </div>
            </div>
        </div>
    )
}