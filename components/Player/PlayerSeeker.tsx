import { useState } from "react"

const PlayerSeeker = (props: any) => {
    const [_isPlayingOnMouseDown, setIsPlayingOnMouseDown] = useState(false)
    const [_onChangeUsed, _setOnChangeUsed] = useState(false)

    /* const shouldComponentUpdate: any = ({ media }: any) => {
        return (
            props.currentTime !== media.currentTime ||
            props.media.duration !== media.duration
        )
    } */

    const _handleMouseDown = () => {
        setIsPlayingOnMouseDown(props.isPlaying)
        props.media.pause()
    }

    const _handleMouseUp = ({ target: { value } }: any) => {
        // seek on mouseUp as well because of this bug in <= IE11
        // https://github.com/facebook/react/issues/554
        if (!_onChangeUsed) {
            props.media.seekTo(+value)
        }

        // only play if media was playing prior to mouseDown
        if (_isPlayingOnMouseDown) {
            props.media.play()
        }
    }

    const _handleChange = ({ target: { value } }: any) => {
        props.media.seekTo(+value)
        _setOnChangeUsed(true)
    }


    const { className, style, media } = props
    return (
        <input
            type="range"
            step="any"
            max=""
            value={0}
            onMouseDown={_handleMouseDown}
            onMouseUp={_handleMouseUp}
            onChange={_handleChange}
            className={className}
            /* style={{
                backgroundSize: currentTime * 100 / duration + '% 100%',
                ...style,
            }} */
        />
    )


}
export {PlayerSeeker}

