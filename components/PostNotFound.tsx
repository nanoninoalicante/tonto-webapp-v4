import PrimaryHeader from "./Primary/PrimaryHeader";
import { FaRandom } from "react-icons/fa"
import Link from "next/link";
import PostsList from "./PostsList";

const PostNotFound = (props: any) => {
    return (
        <>
            <PrimaryHeader />
            <div className="fixed md:w-[50%] w-full mt-28 bg-white rounded-b-xl">
                <div className="flex flex-col justify-center items-center py-3">
                    <img src="/flex-ui-assets/images/tontoprofile_defualt.png" className="my-7 rounded-full w-24 h-24 bg-slate-300" />
                    <div className="">Post not found</div>
                </div>
            </div>
            <div className="fixed md:bottom-[50%] bottom-[20em] md:w-[50%] w-full max-h-[5em]">
                <div className="bg-teal-500 rounded-t-xl text-white font-bold text-lg px-3">Posts</div>
                <ul className="divide-y divide-slate-200 md:max-h-[25em] max-h-[15em] shadow-lg overflow-scroll no-scrollbar bg-white rounded-b-xl">
                    <PostsList posts={props.posts} />
                </ul>
            </div>
        </>
    )
}

export default PostNotFound;