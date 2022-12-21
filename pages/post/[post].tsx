import MetaTags from '../../components/MetaTags'
import React, { useEffect, useState, useRef } from "react"
import PrimaryHeader from '../../components/Primary/PrimaryHeader'
import PrimaryPost from '../../components/Primary/PrimaryPost'
import { useRouter } from 'next/router'
import { GlobalPlayer } from '../../components/Player/GlobalPlayer'
import Link from 'next/link'

type Props = {
    post: string
}

type State = {
    post: string
}
//santeetji: 62b131b4db1ec8000f04084e
//begaes: 628e108820eaae000f00a887
//raul: 6381ce9059b930327afece05
//const slug = "62b131b4db1ec8000f04084e"

const post = {
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
export const getServerSideProps = async (context: any) => {
    const { post } = context.query;
    return {
        props: {
            id: post
        }
    }
};

const Post = (props: any) => {
    const [data, setData] = useState(post)
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1)
    const [back, setBack] = useState(0)
    const [next, setNext] = useState(0)
    const [existId, setExistsId] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        const url = `https://webfeed-dev.apis.gettonto.com/posts/${props.id}?api_key=16dea2a1-35e8-4332-8cd6-e534300d16b7`;
        fetch(url, { method: "GET" })
            .then((response) => response.json())
            .then((data) => {
                setExistsId(true)
                setData(data.data[0])
            })
            .catch(error => {
                setExistsId(false)
                console.log(error)
            })

    }, [])

    useEffect(() => {
        getUuids();
    }, [data])

    function getUuids() {
        const limit = 150
        if (data.userInfo.id !== "") {
            const urlUuid = `https://feed-dev.apis.urloapp.com/feed/${data.userInfo.id}/profile?api_key=16dea2a1-35e8-4332-8cd6-e534300d16b7&limit=${limit}&page=${page}`;
            fetch(urlUuid, { method: "GET" })
                .then((response) => response.json())
                .then((profile) => {
                    console.log(profile.data)
                    if (profile?.data) {
                        let postPos = 0;
                        for (let i = 0; i < profile.data.length; i++)
                            if (profile.data[i].uuid === props.id) postPos = i;

                        if (postPos >= 0) {
                            if (postPos !== 0 && postPos !== profile.data.length - 1) {
                                setNext(profile.data[postPos + 1].uuid)
                                setBack(profile.data[postPos - 1].uuid)
                            } else if (postPos === 0) {
                                setNext(profile.data[postPos + 1].uuid)
                                setBack(profile.data[profile.data.length - 1].uuid)
                            } else if (postPos === profile.data.length - 1) {
                                setNext(profile.data[0].uuid)
                                setBack(profile.data[postPos - 1].uuid)
                                setPage(page + 1)
                            }
                            setIsLoading(false)
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
    useEffect(() => {
        getUuids();
    }, [page])

    return (
        <div>
            <MetaTags />
            <main >
                <React.Fragment>
                    <PrimaryHeader />
                    <PrimaryPost props={{ user: { data, isLoading } }} />
                    <GlobalPlayer props={{ data: { data, back, next, isLoading } }} />
                </React.Fragment>
            </main>
        </div>
    )
}

export default Post;
