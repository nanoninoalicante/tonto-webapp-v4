import PrimaryHeader from "./Primary/PrimaryHeader";
import { FaRandom } from "react-icons/fa"
import Link from "next/link";
import PostsList from "./PostsList";

const PostNotFound = (props: any) => {
    return (
        <main className="grid place-items-center dark:text-black w-3/4">
            <PrimaryHeader />
            <div className="relative grid place-items-center md:w-[50%] w-full mt-10 bg-white dark:bg-[#6C6C6C] rounded-xl">
                <div className="flex flex-col justify-center items-center py-3 text-[#222222] dark:text-white">
                    <img src="/flex-ui-assets/images/tontoprofile_defualt.png" className="my-7 rounded-full w-24 h-24 bg-slate-300" />
                    <div className="">Post not found</div>
                </div>
            </div>
            <div className="relative mt-3 w-1/2">
                <div className="bg-[#109C90] dark:text-[#00EEDC] dark:bg-[#6C6C6C] rounded-t-xl font-bold text-lg px-3">Posts</div>
                <ul className="divide-y divide-slate-200 md:max-h-[25em] max-h-[15em] shadow-lg overflow-scroll no-scrollbar bg-white rounded-b-xl">
                    <PostsList posts={props.posts} />
                </ul>
            </div> 
        </main>
    )
}

export default PostNotFound;