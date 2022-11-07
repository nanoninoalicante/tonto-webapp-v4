import React from "react"
import { PlayCircle, PauseCircle } from "react-feather"
export default function PlayPauseButton() {
    return (
        <React.Fragment>
            <div className="cursor-pointer flex justify-center bg-teal-600 p-2 text-white rounded-full">
                <PlayCircle size={50}></PlayCircle>
                {/* <PauseCircle size={50}></PauseCircle> */}
            </div>
        </React.Fragment>

    )
}