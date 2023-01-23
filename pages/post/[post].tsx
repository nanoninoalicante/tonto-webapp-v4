import MetaTags from '../../components/MetaTags'
import React from "react"
import PrimaryHeader from '../../components/Primary/PrimaryHeader'
import PrimaryPost from '../../components/Primary/PrimaryPost'
import { GlobalPlayer } from '../../components/Player/GlobalPlayer'
import Head from 'next/head'
import PostNotFound from '../../components/PostNotFound'
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
    const { post } = context.query;
    let server = {
        data: postData,
        page: 1,
        back: 0,
        next: 0,
        existsId: true,
        randomId: 0,
        posts: []
    }

    const url = `${process.env.FEED_API}${post}${process.env.API_END}`;
    await fetch(url, { method: "GET" })
        .then((response) => response.json())
        .then(async (data) => {
            console.log(data)
            server.data = data?.data[0] || postData
            if (!server.data.uuid) {
                server.existsId = false
                const urlUuid = `${process.env.FEED_API}/profile${process.env.API_END}&limit=150&page=1`;
                await fetch(urlUuid, { method: "GET" })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data)
                        server.posts = data.data
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } else {
                server.existsId = true;
            }
        })
        .catch(error => {
            console.log(error)
        })
    return { props: server }
};

const Post = (props: any) => {
    return (
        <>
            {props.data?.uuid !== "" ?
                <div>
                    <MetaTags data={props.data} />
                    <main className='fixed grid gris-cols-3 justify-center'>
                        <PrimaryHeader />
                        <div className=''>
                            <PrimaryPost
                                data={props.data}
                                page={props.page}
                                back={props.back}
                                next={props.next}
                                existsId={props.existsId}
                            />
                            <GlobalPlayer
                                data={props.data}
                                page={props.page}
                                back={props.back}
                                next={props.next}
                                existsId={props.existsId} />
                            <div className="text-white hidden flex flex-row items-center text-lg fixed bottom-0 z-50 px-4 w-full h-[4rem] bg-black opacity-70 shadow-lg mouse transition ease-in duration-200 focus:outline-none">
                                <span className='flex-col'>Get the full experience...</span>
                                <Link href={"https://gettonto.com"} className='flex-col ml-auto bg-teal-500 px-4 py-2 rounded-md'>Open</Link>
                            </div>
                        </div>
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
