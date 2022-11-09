import React from "react"
import AudioPlayerHolder from "./AudioPlayerHolder"
import BackSkipButton from "./BackSkipButton"
import ForwardSkipButton from "./ForwardSkipButton"
import PlayerSeeker from "./PlayerSeeker"
import PlayPauseButton from "./PlayPauseButton"
import TimeDisplay from "./TimeDisplay"
import ReactPlayer from "react-player"

interface Props {
    postId: string
}
interface State {
    streamingUrl: string
}

class GlobalPlayer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            streamingUrl: ""
        }
    }
    async componentDidMount(): Promise<void> {
        const url = `${process.env.FEED_API_BASE_URL}posts/${this.props.postId}?api_key=16dea2a1-35e8-4332-8cd6-e534300d16b7`;
        await fetch(url, { method: "GET" })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.setState(data.data[0])
            })
    }
    render(): React.ReactNode {
        console.log(this.state)
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
                                <BackSkipButton />
                            </div>
                            <div
                                className="flex w-1/5 justify-start w-full mb-0 md:mb-0"
                            >
                               {/*  <TimeDisplay
                                />{/*0{{playerStore.getCurrentTime}}
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
                            {/* <TimeDisplay></TimeDisplay>{ {{ playerStore.getTotalDuration }}
                            </TimeDisplay> } */}
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
}
export default GlobalPlayer;