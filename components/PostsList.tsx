import Link from "next/link"
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, Key } from "react"


const PostsList = (props: any) => {
    return (
        props?.posts &&
        props?.posts.map((post: any, i: number) => {
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
        })
    )
}

export default PostsList