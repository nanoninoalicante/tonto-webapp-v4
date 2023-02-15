import MetaTags from '../../components/MetaTags'
import React, { useState } from "react"
import PrimaryHeader from '../../components/Primary/PrimaryHeader'
import PrimaryPost from '../../components/Primary/PrimaryPost'
import { GlobalPlayer } from '../../components/Player/GlobalPlayer'
import Head from 'next/head'
import PostNotFound from '../../components/PostNotFound'
import Comments from '../../components/Comments'
import Subtitles from '../../components/Subtitles/Subtitles'


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

    const getPost = `${process.env.FEED_API}/post/${post}${process.env.API_KEY}`;
    await fetch(getPost, { method: "GET" })
        .then((response) => response.json())
        .then(async (data) => {
            server.data = data?.data[0] || postData
        })
        .catch(error => {
            console.log(error)
        })

    const getUser = `${process.env.FEED_API}/user/${server.data.userInfo.id}${process.env.API_KEY}`
    server?.data.uuid &&
        await fetch(getUser, { method: "GET" })
            .then((response) => response.json())
            .then(async (data) => {
                const postsIds = data.data.postIds;
                server.posts = postsIds.length
                const index = postsIds.indexOf(post);
                if (index !== -1 && postsIds.length > 1) {
                    if (index === 0) {
                        server.back = postsIds[postsIds.length - 1]
                        server.next = postsIds[index + 1]
                    } else if (index === postsIds.length - 1) {
                        server.back = postsIds[index - 1]
                        server.next = postsIds[0]
                    } else {
                        server.back = postsIds[index - 1]
                        server.next = postsIds[index + 1]
                    }
                }
            })
            .catch(error => {
                console.log(error)
            })
    const getComment = `${process.env.FEED_API}post/${server.data.uuid}/comments${process.env.API_KEY}`
    server?.data.uuid &&
        await fetch(getComment, { method: "GET" })
            .then((response) => response.json())
            .then(async (data) => {
                server.comments = data?.data
            })
            .catch(error => {
                console.log(error)
            })

    return { props: server }
};

const Post = (props: any) => {
    const [selected, setSelected] = useState("comments")
    return (
        <>
            {props.data?.uuid !== "" ?
                <div>
                    <MetaTags data={props.data} />
                    <main className='grid place-items-center'>
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
                        <nav className='w-[94%] md:w-[50%] pt-2 flex flex-row justify-center'>
                            <button className="flex flex-col justify-center items-center h-14 bg-[#5F5F5F] w-full rounded-tl-lg" 
                                    onClick={() => setSelected("comments")}
                            >
                                <span className={selected === "comments" ? "text-white" : "text-white/50"}>COMMENTS</span>
                                {selected === "comments" &&
                                    <div className='w-[75%] h-1 bg-white/70 rounded-lg' />
                                }
                            </button>
                            <button className="flex flex-col justify-center items-center h-14 bg-[#5F5F5F] w-full rounded-tr-lg"
                                    onClick={() => setSelected("subtitles")}
                            >
                                <span className={selected === "subtitles" ? "text-white" : "text-white/50"}>SUBTITLES</span>
                                {selected === "subtitles" &&
                                    <div className='w-[75%] h-1 bg-white/70 rounded-lg' />
                                }
                            </button>
                        </nav>
                        {
                            {
                                "comments": <Comments data={props.comments} />,
                                "subtitles": <Subtitles />
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
        </>
    )
}

export default Post;
