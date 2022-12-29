import PrimaryHeader from "./Primary/PrimaryHeader";
import { FaRandom } from "react-icons/fa"
import Link from "next/link";

const PostNotFound = (props: any) => {
    const handleRandom = () => {
        window.location.href = `/post/${props?.randomId}`
    }

    const handleClick = (uuid) => {
        window.location.href = `/post/${uuid}`
    }

    console.log(props)
    return (
        <>
            <PrimaryHeader />
            <div className="fixed md:w-[50%] w-full mt-28 bg-white rounded-b-xl">
                <div className="flex flex-col justify-center items-center">
                    <img src="/flex-ui-assets/images/tontoprofile_defualt.png" className="my-7 rounded-full w-24 h-24 bg-slate-300" />
                    <div className="">Audio not found</div>
                    <button onClick={handleRandom} className="border-2 border-gray-300 text-white flex flex-row items-center gap-2 hover:border-teal-500 bg-teal-500 rounded-lg p-2 my-4">
                        Random
                        <FaRandom />
                    </button>
                </div>
            </div>
            <div className="fixed md:bottom-[50%] bottom-[20em] md:w-[50%] w-full max-h-[5em]">
                <div className="bg-teal-500 rounded-t-xl text-white font-bold text-lg px-3">Posts</div>
                <ul className="divide-y divide-slate-200 md:max-h-[25em] max-h-[15em] shadow-lg overflow-scroll no-scrollbar bg-white rounded-b-xl">
                    {props.posts.map((post, i) => {
                        if (post.userInfo.profileImg === "") post.userInfo.profileImg = "/flex-ui-assets/images/tontoprofile_defualt.png"
                        return (
                            <Link href={`/post/${post.uuid}`} key={i} className="flex flex-row p-3 hover:bg-teal-50" >
                                <img className="rounded-full" width={75} height={75} src={post.userInfo.profileImg}></img>
                                <div className="ml-3">
                                    <div className="underline">{post.userInfo.userName}</div>
                                    <div className="max-h-10 text-xs my-2 text-gray-500 truncate">{post.description}</div>
                                </div>
                            </Link>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default PostNotFound;