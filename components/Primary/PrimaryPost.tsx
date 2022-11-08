import { $fetch } from "ohmyfetch";
import React, { Component } from "react";
import { useEffect, useState } from "react";

interface Props {
    postId: string;
}

interface User {
    id: string,
    userName: string,
    profileImg: string,
    isUserVerified: boolean
}
interface State {
    commentsCount: number,
    createdAt: Date,
    description: string,
    explicit: any,
    hasExplicitContent: boolean,
    language: string,
    likesCount: number,
    shareCount: number,
    status: string,
    streamingUrl: string,
    updateAt: Date,
    userInfo: User,
    uuid: string,
    visibility: string
}

class PrimaryPost extends Component<Props> {
    async componentDidMount(): Promise<void> {
        const url = `${process.env.FEED_API_BASE_URL}posts/${this.props.postId}?api_key=16dea2a1-35e8-4332-8cd6-e534300d16b7`;
        //const [data, setData] = useState<State[]>([]);
        console.log("postId: ", this.props.postId)
        console.log("url:", url)
        fetch(url, { method: "GET" })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            //setData(data)
            console.log(data.data[0])
        })    
    }


    //console.log(post)
    render(): React.ReactNode {
        return (
            <div className="md:w-1/4 my-40 bg-white border border-gray-200 shadow-2xl rounded-2xl mx-auto">
                <div
                    className="
                flex flex-col
                justify-center
                items-center
                px-4
                pt-8
                pb-6
                border-b border-gray-200
            "
                >
                    <img
                        className="mb-4"
                        src="/flex-ui-assets/images/dashboard/cards/avatar.png"
                        alt="avatar"
                    />
                    <h2 className="text-sm font-medium text-coolGray-900">Raul</h2>
                    <h3 className="mb-3 text-xs font-medium text-coolGray-400">
                        johndoe@flex.co
                    </h3>
                    <button
                        className="
                    flex
                    items-center
                    px-4
                    py-2
                    font-medium
                    text-sm text-white
                    bg-green-500
                    hover:bg-green-600
                    rounded-md
                "
                    >
                        <svg
                            className="mr-2"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15.8333 3.33334H4.16666C3.50362 3.33334 2.86773 3.59673 2.39889 4.06557C1.93005 4.53441 1.66666 5.17029 1.66666 5.83334V14.1667C1.66666 14.8297 1.93005 15.4656 2.39889 15.9344C2.86773 16.4033 3.50362 16.6667 4.16666 16.6667H15.8333C16.4964 16.6667 17.1323 16.4033 17.6011 15.9344C18.0699 15.4656 18.3333 14.8297 18.3333 14.1667V5.83334C18.3333 5.17029 18.0699 4.53441 17.6011 4.06557C17.1323 3.59673 16.4964 3.33334 15.8333 3.33334V3.33334ZM4.16666 5H15.8333C16.0543 5 16.2663 5.0878 16.4226 5.24408C16.5789 5.40036 16.6667 5.61232 16.6667 5.83334L9.99999 9.9L3.33332 5.83334C3.33332 5.61232 3.42112 5.40036 3.5774 5.24408C3.73368 5.0878 3.94564 5 4.16666 5V5ZM16.6667 14.1667C16.6667 14.3877 16.5789 14.5996 16.4226 14.7559C16.2663 14.9122 16.0543 15 15.8333 15H4.16666C3.94564 15 3.73368 14.9122 3.5774 14.7559C3.42112 14.5996 3.33332 14.3877 3.33332 14.1667V7.73334L9.56666 11.5417C9.69334 11.6148 9.83704 11.6533 9.98332 11.6533C10.1296 11.6533 10.2733 11.6148 10.4 11.5417L16.6667 7.73334V14.1667Z"
                                fill="#F0FDF4"
                            ></path>
                        </svg>
                        <p>Message</p>
                    </button>
                </div>
                <div className="flex flex-row pt-4 pb-6 -m-2">
                    <div className="w-full md:w-1/3 p-2">
                        <div className="text-center">
                            <p className="mb-1 text-xs text-coolGray-900 font-semibold">
                                24
                            </p>
                            <p className="text-xs text-coolGray-400 font-medium">Likes</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 p-2">
                        <div className="text-center">
                            <p className="mb-1 text-xs text-coolGray-900 font-semibold">
                                42
                            </p>
                            <p className="text-xs text-coolGray-400 font-medium">
                                Comments
                            </p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 p-2">
                        <div className="text-center">
                            <p className="mb-1 text-xs text-coolGray-900 font-semibold">
                                2.7k
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
}

export default PrimaryPost;