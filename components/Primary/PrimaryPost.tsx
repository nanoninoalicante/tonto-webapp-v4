import { redirect } from "next/dist/server/api-utils";
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

export const getServerSideProps = (props: any) => {
    return {props: props}
}
const PrimaryPost = (props: any) => {
    let post = props.data;
    const [userData, setUserData] = useState(post?.userInfo)

    useEffect(() => {
        if (userData?.profileImg === "")
            setUserData({ ...userData,profileImg: "/flex-ui-assets/images/tontoprofile_defualt.png" })
    }, [])


    return (
            userData?.id !== "" ?
                <div className="fixed md:w-[50%] w-full mt-28  bg-white rounded-b-xl">
                    <div className="flex flex-col justify-center items-center border-b-2">
                        <img
                            className="my-7 rounded-full w-24 h-24"
                            src={userData?.profileImg}
                            alt="avatar"
                        />
                        <h2 className="mb-4 text-sm font-medium text-coolGray-900">
                            {userData?.userName}
                        </h2>
                        <h3 className="static mb-4 mx-4 text-xs font-medium max-h-20 text-coolGray-400 overflow-scroll no-scrollbar">
                            {post?.description}
                        </h3>
                    </div>
                    <div className="flex  pt-1 pb-1 rounded-b">
                        <div className="p-2 w-1/3">
                            <div className="text-center">
                                <p className="mb-1 text-xs text-coolGray-900 font-semibold">
                                    {post?.likesCount}
                                </p>
                                <p className="text-xs text-coolGray-400 font-medium">Likes</p>
                            </div>
                        </div>
                        <div className="p-2 w-1/3">
                            <div className="text-center">
                                <p className="mb-1 text-xs text-coolGray-900 font-semibold">
                                    {post?.commentsCount}
                                </p>
                                <p className="text-xs text-coolGray-400 font-medium">
                                    Comments
                                </p>
                            </div>
                        </div>
                        <div className="p-2 w-1/3">
                            <div className="text-center">
                                <p className="mb-1 text-xs text-coolGray-900 font-semibold">
                                    {post?.shareCount}
                                </p>
                                <p className="text-xs text-coolGray-400 font-medium">
                                    Shared
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="w-[50%] mt-28 justify-center bg-white rounded-b-xl">
                    <div className="flex flex-col justify-center items-center border-b-2 animate-pulse">
                        <div className="my-7 rounded-full w-24 h-24 bg-slate-300" />
                        <div className="mb-2 h-2 w-48 bg-slate-300 rounded" />
                        <div className="mb-4 h-2 w-32 bg-slate-300 rounded" />
                        <div className="mb-4 mx-4 text-xs font-medium text-coolGray-400">
                        </div>
                    </div>
                    <div className="flex flex-wrap pt-4 pb-6 m-2 rounded-b ">
                        <div className="p-2 w-1/3">
                            <div className="text-center">
                                <p className="mb-1 text-xs text-coolGray-900 font-semibold">
                                    0
                                </p>
                                <p className="text-xs text-coolGray-400 font-medium">
                                    Likes
                                </p>
                            </div>
                        </div>
                        <div className="p-2 w-1/3">
                            <div className="text-center">
                                <p className="mb-1 text-xs text-coolGray-900 font-semibold">
                                    0
                                </p>
                                <p className="text-xs text-coolGray-400 font-medium">
                                    Comments
                                </p>
                            </div>
                        </div>
                        <div className="p-2 w-1/3">
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
    )

}

export default PrimaryPost;