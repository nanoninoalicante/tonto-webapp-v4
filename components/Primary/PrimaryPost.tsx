import React, { Component } from "react";
import { useEffect, useState } from "react";
import Heart from "../../public/flex-ui-assets/heart.svg";
import Comment from "../../public/flex-ui-assets/comment.svg";
import Share from "../../public/flex-ui-assets/share.svg";
import Description from "./Description";
import { GlobalPlayer } from "../Player/GlobalPlayer";
import DownloadApp from "../Modals/DownloadApp";
var moment = require("moment");

export const getServerSideProps = (props: any) => {
    return { props: props };
};
const PrimaryPost = (props: any) => {
    let post = props.data;
    const {
        likesCount = 0,
        shareCount = 0,
        commentsCount = 0,
        shortLink,
    } = props.firestore?.data || props.firestore || {};
    const { link } = props;
    const deeplink = link || shortLink;
    const [userData, setUserData] = useState(post?.userInfo);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        if (userData?.profileImg === "")
            setUserData({
                ...userData,
                profileImg: "/flex-ui-assets/images/tontoprofile_defualt.png",
            });
    }, []);

    return userData?.id !== "" ? (
        <div className="w-[94%] md:w-[50%] mx-4 mt-[17px] rounded-t-lg bg-[#F8F8F8] dark:bg-[#6C6C6C]">
            <div className="flex flex-row">
                <div className="flex flex-col ml-5">
                    <img
                        className="mt-7 mb-4 rounded-full w-[140px] h-[140px] dark:border-[1px] dark:border-white"
                        src={userData?.profileImg}
                        alt="avatar"
                    />
                    <h2 className="mb-1 text-[17px]  text-[#222222] dark:text-white leading-5">
                        @{userData?.userName}
                    </h2>
                    <h3 className="text-[15px] text-[#5F5F5F] dark:text-[#EBEBEB] leading-4">
                        {userData.followers} followers · {props.posts} posts
                    </h3>
                    <button
                        onClick={() => {
                            setModal(true);
                        }}
                        className="bg-[#CF2508] dark:bg-[#FE4424] dark:text-[#5F5F5F] rounded-[4px] text-white text-[14px] w-[64px] py-0.5 my-3"
                    >
                        follow
                    </button>
                </div>
                <div className="flex flex-col gap-x-2 ml-auto mr-5 text-center text-[14px] py-4 gap-2">
                    <button
                        onClick={() => {
                            setModal(true);
                        }}
                        className="text-[#F54F74] dark:text-[#EBEBEB]"
                    >
                        <Heart />
                        {likesCount}
                    </button>
                    <button
                        onClick={() => {
                            setModal(true);
                        }}
                        className="text-[#009D9D] dark:text-[#EBEBEB]"
                    >
                        <Comment />
                        {commentsCount}
                    </button>
                    <button
                        onClick={() => {
                            setModal(true);
                        }}
                        className="text-[#F6C116] dark:text-[#EBEBEB]"
                    >
                        <Share />
                        {shareCount}
                    </button>
                </div>
            </div>
            <div className="flex justify-center">{/*  WAVEFORM BAR */}</div>
            {/* <div className="container w-auto flex flex-row dark:text-[#EBEBEB] text-[#5F5F5F] px-4 py-3 text-[14px]">
                    <div className="dark:bg-[#3C3C3C] bg-[#D7D7D7] rounded-md px-2 py-1 mr-2">
                        Sport
                    </div>
                    <div className="dark:bg-[#3C3C3C] bg-[#D7D7D7] rounded-md px-2 py-1 mr-2">
                        Podcast
                    </div>
                </div> */}
            <Description text={post.description} />
            <div className="px-4 py-2 pb-5 mt-2 text-[12px] text-[#CF2508] dark:text-[#FE4424] leading-[14px]">
                {moment(post.createdAt).fromNow()}
            </div>
            <DownloadApp
                link={deeplink}
                show={modal}
                close={() => setModal(false)}
            />
        </div>
    ) : (
        <div className="w-[50%] mt-28 justify-center bg-white rounded-b-xl">
            <div className="flex flex-col justify-center items-center border-b-2 animate-pulse">
                <div className="my-7 rounded-full w-24 h-24 bg-slate-300" />
                <div className="mb-2 h-2 w-48 bg-slate-300 rounded" />
                <div className="mb-4 h-2 w-32 bg-slate-300 rounded" />
                <div className="mb-4 mx-4 text-xs font-medium text-coolGray-400"></div>
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
    );
};

export default PrimaryPost;
