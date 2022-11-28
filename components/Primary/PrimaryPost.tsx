import React, { Component } from "react";
import { useEffect, useState } from "react";

interface Props {
    postId: string;
}
const state = {
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
    userInfo: {},
    updatedAt: "",
    uuid: "",
    visibility: ""
}

const userInfo = { id: '', userName: '', profileImg: '', isUserVerified: null }

const PrimaryPost = (props: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(state)
    const [userData, setUserData] = useState(userInfo)

    useEffect(() => {
        const url = `https://webfeed-dev.apis.gettonto.com/posts/${props.postId}?api_key=16dea2a1-35e8-4332-8cd6-e534300d16b7`;
        setIsLoading(true)
        fetch(url, { method: "GET" })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
                setData(data.data[0])
                setUserData(data.data[0].userInfo)
                setIsLoading(false)
            })
    }, [])

    useEffect(() => {
        console.log(data)
        console.log(userData)
        if (userData.profileImg === "")
            setUserData({ ...userData, profileImg: "/flex-ui-assets/images/tontoprofile_defualt.png" })
    }, [data.userInfo])

    return (
        <>
            {!isLoading ?
                (<div className="container mx-auto mt-20 justify-center bg-teal-500 rounded-b-xl">
                    <div className="flex flex-col justify-center items-center border-b-2">
                        <img
                            className="my-7 rounded-full w-24"
                            src={userData.profileImg}
                            alt="avatar"
                        />
                        <h2 className="mb-4 text-sm font-medium text-coolGray-900">
                            {userData.userName}
                        </h2>
                        <h3 className="mb-4 mx-4 text-xs font-medium text-coolGray-400">
                            {data.description}
                        </h3>
                    </div>
                    <div className="flex flex-wrap pt-4 pb-6 m-2 rounded-b shadow-xl">
                        <div className="p-2 w-1/3 border-r-2">
                            <div className="text-center">
                                <p className="mb-1 text-xs text-coolGray-900 font-semibold">
                                    {data.likesCount}
                                </p>
                                <p className="text-xs text-coolGray-400 font-medium">Likes</p>
                            </div>
                        </div>
                        <div className="p-2 w-1/3 border-r-2">
                            <div className="text-center">
                                <p className="mb-1 text-xs text-coolGray-900 font-semibold">
                                    {data.commentsCount}
                                </p>
                                <p className="text-xs text-coolGray-400 font-medium">
                                    Comments
                                </p>
                            </div>
                        </div>
                        <div className="p-2 w-1/3">
                            <div className="text-center">
                                <p className="mb-1 text-xs text-coolGray-900 font-semibold">
                                    {data.shareCount}
                                </p>
                                <p className="text-xs text-coolGray-400 font-medium">
                                    Shared
                                </p>
                            </div>
                        </div>
                    </div>
                </div>) : (
                    <div className="animate-pulse md:w-1/3 lg:w-1/2 mt-40 bg-teal-500 border border-white shadow-2xl rounded-t-xl mx-auto">
                        <div
                            className="
                                flex flex-col
                                justify-center
                                items-center
                                px-4
                                pt-8
                                pb-6
                                border-b border-black
                        "
                        >
                            <div
                                className="mb-4 w-20 rounded-full bg-slate-700"
                            />
                            <div className="mb-3 rounded bg-slate-700">
                            </div>
                            <div className="mb-3 rounded bg-slate-700">
                            </div>
                        </div>
                        <div className="flex flex-row pt-4 pb-6 -m-2">
                            <div className="w-full md:w-1/3 p-2">
                                <div className="text-center">
                                    <p className="mb-1 text-xs text-coolGray-900 font-semibold">
                                        0
                                    </p>
                                    <p className="text-xs text-coolGray-400 font-medium">Likes</p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/3 p-2">
                                <div className="text-center">
                                    <p className="mb-1 text-xs text-coolGray-900 font-semibold">
                                        0
                                    </p>
                                    <p className="text-xs text-coolGray-400 font-medium">
                                        Comments
                                    </p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/3 p-2">
                                <div className="text-center">
                                    <p className="mb-1 text-xs text-coolGray-900 font-semibold">
                                        0
                                    </p>
                                    <p className="text-xs text-coolGray-400 font-medium">
                                        Shared
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                )}
        </>
    )

}

export default PrimaryPost;