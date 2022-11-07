import { TfiControlForward } from "react-icons/tfi"
export default function ForwardSkipButton() {
    return (
        <div className= "cursor-pointer flex justify-center bg-teal-600 p-2 text-white rounded-full">
            <TfiControlForward size={25} color="white">
                <slot></slot>
            </TfiControlForward>
        </div>
    )
}