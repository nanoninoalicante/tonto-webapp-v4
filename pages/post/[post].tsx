import MetaTags from '../../components/MetaTags'
import React, { useState } from "react"
import PrimaryHeader from '../../components/Primary/PrimaryHeader'
import PrimaryPost from '../../components/Primary/PrimaryPost'
import { GlobalPlayer } from '../../components/Player/GlobalPlayer'
import Head from 'next/head'
import PostNotFound from '../../components/PostNotFound'
import Comments from '../../components/Comments'
import Subtitles from '../../components/Subtitles/Subtitles'
import { getCommentsByUser, getPost, getUserInfo } from '../../utils/post'


//santeetji: 62b131b4db1ec8000f04084e
//begaes: 628e108820eaae000f00a887
//raul: 6381ce9059b930327afece05
//const slug = "62b131b4db1ec8000f04084e"

const postData = {
    commentsCount: 0,
    createdAt: "",
    description: "",
    explicit: { badWords: 'no', sex: 'no', content: 'no', others: 'no', violence: 'no' },
    hasExplicitContent: false,
    language: "en",
    likesCount: 0,
    shareCount: 0,
    status: "",
    streamingUrl: "",
    updatedAt: "",
    userInfo: { id: '', userName: '', profileImg: '', isUserVerified: null },
    uuid: "",
    visibility: ""
}

/**
 * It fetches the data from the API and returns it as props to the component
 * @param {any} context - This is the context object that Next.js passes to getServerSideProps. It
 * contains the query object, which is the object that contains the query string parameters.
 * @returns The server object is being returned.
 */
export const getServerSideProps = async (context: any) => {
    const { post } = context.query;
    let server = {
        data: postData,
        page: 1,
        back: 0,
        next: 0,
        existsId: true,
        randomId: 0,
        posts: 0,
        comments: []
    }

    const dataPost = await getPost(post)
    server.data = dataPost;
    const getUser = await getUserInfo(server.data.userInfo.id, post)
    const getComment = await getCommentsByUser(post)
    server.back = getUser.back;
    server.next = getUser.next;
    server.posts = getUser.posts;
    server.comments = getComment;

    return { props: server }
};

const Post = (props: any) => {
    const [selected, setSelected] = useState("comments")
    return (
        <main>
            {props.data?.uuid !== "" ?
                <div>
                    <MetaTags data={props.data} />
                    <main className='grid place-items-center relative md:top-[10vh]'>
                        <PrimaryHeader />
                        <PrimaryPost
                            data={props.data}
                            page={props.page}
                            back={props.back}
                            next={props.next}
                            posts={props.posts}
                            existsId={props.existsId}
                        />
                        <GlobalPlayer
                            data={props.data}
                            page={props.page}
                            back={props.back}
                            next={props.next}
                            existsId={props.existsId} />
                        <nav className='w-[94%] md:w-[50%] pt-2 flex flex-row justify-center font-medium'>
                            <button className="flex flex-col justify-center items-center h-14 bg-[#5F5F5F] dark:bg-[#F8F8F8] w-full rounded-tl-lg" 
                                    onClick={() => setSelected("comments")}
                            >
                                <span className={selected === "comments" ? "text-white dark:text-[#3C3C3C]" : "text-white/50 dark:text-[#3C3C3C]/50"}>COMMENTS</span>
                                {selected === "comments" &&
                                    <div className='w-[75%] h-1 dark:bg-[#3C3C3C] bg-white rounded-lg' />
                                }
                            </button>
                            <button className="flex flex-col justify-center items-center h-14 bg-[#5F5F5F] dark:bg-[#F8F8F8] w-full rounded-tr-lg"
                                    onClick={() => setSelected("subtitles")}
                            >
                                <span className={selected === "subtitles" ? "text-white dark:text-[#3C3C3C]" : "text-white/50 dark:text-[#3C3C3C]/50"}>SUBTITLES</span>
                                {selected === "subtitles" &&
                                    <div className='w-[75%] h-1 dark:bg-[#3C3C3C] bg-white rounded-lg' />
                                }
                            </button>
                        </nav>
                        {
                            {
                                "comments": <Comments data={props.comments} />,
                                "subtitles": <Subtitles data={props.data}/>
                            }[selected]
                        }
                    </main>
                </div> :
                <>
                    <div className='flex justify-center'>
                        <Head>
                            <meta name="robots" content='noindex' />
                        </Head>
                        <PostNotFound randomId={props.randomId} posts={props.posts} />
                    </div>
                </>}
        </main>
    )
}

export default Post;
