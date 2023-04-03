import MetaTags from '../../components/MetaTags'
import React, { useState } from "react"
import PrimaryHeader from '../../components/Primary/PrimaryHeader'
import PrimaryPost from '../../components/Primary/PrimaryPost'
import { GlobalPlayer } from '../../components/Player/GlobalPlayer'
import Head from 'next/head'
import PostNotFound from '../../components/PostNotFound'
import Comments from '../../components/Comments'
import Icon from "../../public/flex-ui-assets/logos/icon.svg"
import Subtitles from '../../components/Subtitles/Subtitles'
import { getCommentsByUser, getPost, getUserInfo } from '../../utils/post'
import Link from 'next/link'


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
    const { post, deeplink } = context.query;
    const link = deeplink || process.env.APP_LINK!
    console.log(link)
    const { req } = context;
    const userAgent = req.headers["user-agent"];
    let isPhone: boolean = false;
    if (userAgent.indexOf("iPhone") !== -1 || userAgent.indexOf("Android") !== -1) {
        isPhone = true
    }
    let server = {
        data: postData,
        page: 1,
        back: 0,
        next: 0,
        existsId: true,
        randomId: 0,
        posts: 0,
        comments: [],
        isPhone: isPhone,
        link: link
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
    const { data, page, back, next, posts, existsId, comments, isPhone, randomId, link } = props;
    return (
        <main>
            {data?.uuid !== "" ?
                <div>
                    <MetaTags data={data} />
                    {isPhone &&
                        <div className="fixed z-50 bottom-0 inset-x-0 w-full h-20 bg-white flex flex-row items-center text-black">
                            <Icon className="mx-3 w-15 h-15 rounded-full" />
                            <div className="flex flex-col">
                                <div className="text-md font-medium"> Tonto - Social Audio App </div>
                                <div className="text-sm font-light leading-3"> Open in Tonto App </div>
                            </div>
                            <Link href={`${link}`}
                                className="bg-[#109C90] text-white ml-auto font-medium rounded-2xl px-3 py-1 mr-3 h-8 flex items-center">
                                GET TONTO
                            </Link>
                        </div>
                    }
                    <main className='grid place-items-center relative md:top-[10vh]'>
                        <PrimaryHeader />
                        <PrimaryPost
                            data={data}
                            page={page}
                            back={back}
                            next={next}
                            posts={posts}
                            existsId={existsId}
                            link={link}
                        />
                        <GlobalPlayer
                            data={data}
                            page={page}
                            back={back}
                            next={next}
                            existsId={existsId}
                            link={link} 
                        />
                        {
                            comments.length ?
                                <div className='w-[94%] md:w-[50%] pt-2 grid place-items-center font-medium'>
                                    {/* <button className="flex flex-col justify-center items-center h-14 bg-[#5F5F5F] dark:bg-[#F8F8F8] w-full rounded-tl-lg" 
                                        onClick={() => setSelected("comments")}
                                >
                                    <span className={selected === "comments" ? "text-white dark:text-[#3C3C3C]" : "text-white/50 dark:text-[#3C3C3C]/50"}> COMMENTS </span>
                                    {selected === "comments" &&
                                        <div className='w-[75%] h-1 dark:bg-[#3C3C3C] bg-white rounded-lg' />
                                    }
                                </button> */}
                                    <div className='flex justify-center items-center h-14 bg-[#5F5F5F] dark:bg-[#F8F8F8] w-full rounded-t-lg text-white dark:text-[#3C3C3C]'>
                                        COMMENTS
                                    </div>
                                    {/* <button className="flex flex-col justify-center items-center h-14 bg-[#5F5F5F] dark:bg-[#F8F8F8] w-full rounded-tr-lg"
                                        onClick={() => setSelected("subtitles")}
                                >
                                    <span className={selected === "subtitles" ? "text-white dark:text-[#3C3C3C]" : "text-white/50 dark:text-[#3C3C3C]/50"}>SUBTITLES</span>
                                    {selected === "subtitles" &&
                                        <div className='w-[75%] h-1 dark:bg-[#3C3C3C] bg-white rounded-lg' />
                                    }
                                </button> */}
                                    <div className='w-full'>
                                        <Comments data={comments} />
                                    </div>
                                </div> : ""
                        }

                        {/* {
                            {
                                "comments": <Comments data={comments} />,
                                "subtitles": <Subtitles data={data}/>
                            }[selected]
                        } */}
                    </main>
                </div> :
                <>
                    <div className='flex justify-center'>
                        <Head>
                            <meta name="robots" content='noindex' />
                        </Head>
                        <PostNotFound randomId={randomId} posts={posts} />
                    </div>
                </>}
        </main>
    )
}

export default Post;
