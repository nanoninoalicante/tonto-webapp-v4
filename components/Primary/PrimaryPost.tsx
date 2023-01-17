import { redirect } from "next/dist/server/api-utils";
import React, { Component } from "react";
import { useEffect, useState } from "react";
import Heart from "../../public/flex-ui-assets/heart.svg"
import Comment from "../../public/flex-ui-assets/comment.svg"
import Share from "../../public/flex-ui-assets/share.svg"

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

    console.log(post)
    return (
            userData?.id !== "" ?
                <div className="fixed md:w-[50%] w-full mt-28 rounded-t-lg bg-white dark:bg-[#5f5f5f]">
                    <div className="flex flex-row">
                        <div className="flex flex-col ml-5">
                            <img
                                className="mt-7 mb-4 rounded-full w-24 h-24"
                                src={userData?.profileImg}
                                alt="avatar"
                            />
                            <h2 className="mb-1 text-medium font-medium text-[#222222]">
                                @{userData?.userName}
                            </h2>
                            <h3 className="text-sm text-[#5F5F5F]">
                                X followers · X posts
                            </h3>
                            <button className="bg-[#109C90] rounded-[4px] text-white text-[14px] w-[64px] py-0.5 mt-1">
                                follow
                            </button>
                        </div>
                        <div className="flex flex-col justify-around ml-auto mr-5 text-center text-[14px] py-4 gap-2">
                            <div className="text-[#F54F74]">
                                <Heart />
                                {post?.likesCount}
                            </div>
                            <div className="text-[#009D9D]">
                                <Comment />
                                {post?.commentsCount}
                            </div>
                            <div className="text-[#F6C116]">
                                <Share />
                                {post?.shareCount}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        AUDIO BAR
                    </div>
                    <div className="w-full relative px-2">
                        <div className="bg-[#D7D7D7] rounded-[4px] px-2 py-3">
                            INTERESTS
                        </div>
                        {/* HERE WILL BE A MAP */}
                    </div>
                    <div className="max-h-24 overflow-scroll px-4 text-[14px] text-[#5F5F5F] leading-4 mt-2">
                        {post.description}
                    </div>
                    <div className="px-4 mt-2 text-[12px] text-[#109C90] leading-[14px]">
                        2 min ago · 12M plays
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