import { TfiControlBackward } from "react-icons/tfi"
export default function BackSkipButton() {
    return (
        <div className= "cursor-pointer flex justify-center bg-teal-600 p-2 text-white rounded-full">
            <TfiControlBackward size={25} color="white">
                <slot></slot>
            </TfiControlBackward>
        </div>
    )
}