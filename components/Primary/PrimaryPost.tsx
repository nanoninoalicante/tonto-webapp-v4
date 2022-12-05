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
    const [userData, setUserData] = useState(userInfo)
    
    console.log(props)

    useEffect(() => {
        if (userData.profileImg === "")
            setUserData({ ...userData, profileImg: "/flex-ui-assets/images/tontoprofile_defualt.png" })
    }, [])

    return (
/*         isLoading ? */
        <div className="mx-full mt-28 justify-center bg-white rounded-b-xl">
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
                    {props.data.description}
                </h3>
            </div>
            <div className="flex flex-wrap pt-4 pb-6 m-2 rounded-b ">
                <div className="p-2 w-1/3">
                    <div className="text-center">
                        <p className="mb-1 text-xs text-coolGray-900 font-semibold">
                            {props.data.likesCount}
                        </p>
                        <p className="text-xs text-coolGray-400 font-medium">Likes</p>
                    </div>
                </div>
                <div className="p-2 w-1/3">
                    <div className="text-center">
                        <p className="mb-1 text-xs text-coolGray-900 font-semibold">
                            {props.data.commentsCount}
                        </p>
                        <p className="text-xs text-coolGray-400 font-medium">
                            Comments
                        </p>
                    </div>
                </div>
                <div className="p-2 w-1/3">
                    <div className="text-center">
                        <p className="mb-1 text-xs text-coolGray-900 font-semibold">
                            {props.data.shareCount}
                        </p>
                        <p className="text-xs text-coolGray-400 font-medium">
                            Shared
                        </p>
                    </div>
                </div>
            </div>
        </div>/*  :
        <div className="container mx-auto mt-28 justify-center bg-white rounded-b-xl">
        <div className="flex flex-col justify-center items-center border-b-2">
            <img
                className="my-7 rounded-full w-24"
                alt="avatar"
            />
            <h2 className="mb-4 text-sm font-medium text-coolGray-900">
            </h2>
            <h3 className="mb-4 mx-4 text-xs font-medium text-coolGray-400">
            </h3>
        </div>
        <div className="flex flex-wrap pt-4 pb-6 m-2 rounded-b ">
            <div className="p-2 w-1/3">
                <div className="text-center">
                    <p className="mb-1 text-xs text-coolGray-900 font-semibold">
                    </p>
                    <p className="text-xs text-coolGray-400 font-medium">Likes</p>
                </div>
            </div>
            <div className="p-2 w-1/3">
                <div className="text-center">
                    <p className="mb-1 text-xs text-coolGray-900 font-semibold">
                    </p>
                    <p className="text-xs text-coolGray-400 font-medium">
                        Comments
                    </p>
                </div>
            </div>
            <div className="p-2 w-1/3">
                <div className="text-center">
                    <p className="mb-1 text-xs text-coolGray-900 font-semibold">
                    </p>
                    <p className="text-xs text-coolGray-400 font-medium">
                        Shared
                    </p>
                </div>
            </div>
        </div> 
    </div>*/
    )

}

export default PrimaryPost;