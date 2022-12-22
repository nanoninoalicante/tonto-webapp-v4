import { GlobalPlayer } from "./Player/GlobalPlayer";
import PrimaryHeader from "./Primary/PrimaryHeader";
import { FaRandom } from "react-icons/fa"

const PostNotFound = (props: any) => {
    const handleRandom = () => {
        window.location.href = `/post/${props.randomId}`
    }
    return (
        <>
            <PrimaryHeader />
            <div className="mx-full mt-28 justify-center bg-white rounded-b-xl">
                <div className="flex flex-col justify-center items-center">
                    <img src="/flex-ui-assets/images/tontoprofile_defualt.png" className="my-7 rounded-full w-24 h-24 bg-slate-300" />
                    <div className="">Audio not found</div>
                    <button onClick={handleRandom} className="border-2 border-gray-300 text-white flex flex-row items-center gap-2 hover:border-teal-500 bg-teal-500 rounded-lg p-2 my-4">
                        Random
                        <FaRandom />
                    </button>
                </div>
            </div>
            <GlobalPlayer />
        </>
    )
}

export default PostNotFound;