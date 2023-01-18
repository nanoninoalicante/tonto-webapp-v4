import { useState } from "react"


const Description = (props) => {
    const [isReadMoreShown, setReadMoreShown] = useState(false)

    const toogleBtn = () => {
        setReadMoreShown(prevState => !prevState)
    }
    return (
        <div className="px-4 text-[14px] text-[#5F5F5F] dark:text-[#EBEBEB] leading-4 mt-2">
            {isReadMoreShown ? props.text + " " : props.text.substr(0, 200) + "... "}
            <button onClick={toogleBtn} className="font-bold text-[#109c90] dark:text-[#00eedc]">
                {isReadMoreShown ? ' see less' : 'see more'}
            </button>
        </div>
    )
}

export default Description