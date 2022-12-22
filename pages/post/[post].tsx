import MetaTags from '../../components/MetaTags'
import React from "react"
import PrimaryHeader from '../../components/Primary/PrimaryHeader'
import PrimaryPost from '../../components/Primary/PrimaryPost'
import { GlobalPlayer } from '../../components/Player/GlobalPlayer'
import { Server } from 'http'

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
        existsId: true
    }

    const url = `https://webfeed-dev.apis.gettonto.com/posts/${post}?api_key=16dea2a1-35e8-4332-8cd6-e534300d16b7`;
    await fetch(url, { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
            server.existsId = true
            server.data = data.data[0]
        })
        .catch(error => {
            server.existsId = false
            console.log(error)
        })


    await getUuids();

    async function getUuids() {
        const limit = 150
        if (server.data.userInfo.id !== "") {
            const urlUuid = `https://feed-dev.apis.urloapp.com/feed/${server.data.userInfo.id}/profile?api_key=16dea2a1-35e8-4332-8cd6-e534300d16b7&limit=${limit}&page=${server.page}`;
            await fetch(urlUuid, { method: "GET" })
                .then((response) => response.json())
                .then((profile) => {
                    if (profile?.data) {
                        let postPos = 0;
                        for (let i = 0; i < profile.data.length; i++)
                            if (profile.data[i].uuid === post) postPos = i;

                        if (postPos >= 0) {
                            if (postPos !== 0 && postPos !== profile.data.length - 1) {
                                server.next = profile.data[postPos + 1].uuid
                                server.back = profile.data[postPos - 1].uuid
                            } else if (postPos === 0) {
                                server.next = profile.data[postPos + 1].uuid
                                server.back = profile.data[profile.data.length - 1].uuid
                            } else if (postPos === profile.data.length - 1) {
                                server.next = profile.data[0].uuid
                                server.back = profile.data[postPos - 1].uuid
                                server.page = server.page + 1
                            }
                        }
                    } else {
                        console.log("error: ", profile)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    return { props: server }
};

const Post = (props: any) => {
    console.log(props.server)
    return (
        <div>
            <MetaTags />
            <main >
                <React.Fragment>
                    <PrimaryHeader />
                    <PrimaryPost 
                        data={props.server.data} 
                        page={props.server.page} 
                        back={props.server.back} 
                        next={props.server.next}
                        existsId={props.server.existsId}
                    />
                    <GlobalPlayer 
                        data={props.server.data} 
                        page={props.server.page} 
                        back={props.server.back} 
                        next={props.server.next}
                        existsId={props.server.existsId} />
                </React.Fragment>
            </main>
        </div>
    )
}

export default Post;
