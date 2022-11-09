import React, { Component } from "react";
import { useEffect, useState } from "react";

interface Props {
    postId: string;
}
interface State {
    commentsCount: number,
    createdAt: number,
    description: string,
    explicit: any,
    hasExplicitContent: boolean,
    language: string,
    likesCount: number,
    shareCount: number,
    status: string,
    streamingUrl: string,
    updateAt: number,
    userInfo: any,
    uuid: string,
    visibility: string
}

class PrimaryPost extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            commentsCount: 0,
            createdAt: Date.now(),
            description: "",
            explicit: {},
            hasExplicitContent: false,
            language: "",
            likesCount: 0,
            shareCount: 0,
            status: "",
            streamingUrl: "",
            updateAt: 0,
            userInfo: {},
            uuid: "",
            visibility: ""
        }
    }
    async componentDidMount(): Promise<void> {
        const url = `${process.env.FEED_API_BASE_URL}posts/${this.props.postId}?api_key=16dea2a1-35e8-4332-8cd6-e534300d16b7`;
        await fetch(url, { method: "GET" })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.setState(data.data[0])
            })
    }

    render(): React.ReactNode {
        console.log(this.state)
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
                        className="mb-4 w-20 rounded-full"
                        src={this.state.userInfo.profileImg}
                        alt="avatar"
                    />
                    <h2 className="mb-3 text-sm font-medium text-coolGray-900">
                        {this.state.userInfo.userName}
                    </h2>
                    <h3 className="mb-3 text-xs font-medium text-coolGray-400">
                        {this.state.description}
                    </h3>
                </div>
                <div className="flex flex-row pt-4 pb-6 -m-2">
                    <div className="w-full md:w-1/3 p-2">
                        <div className="text-center">
                            <p className="mb-1 text-xs text-coolGray-900 font-semibold">
                                {this.state.likesCount}
                            </p>
                            <p className="text-xs text-coolGray-400 font-medium">Likes</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 p-2">
                        <div className="text-center">
                            <p className="mb-1 text-xs text-coolGray-900 font-semibold">
                                {this.state.commentsCount}
                            </p>
                            <p className="text-xs text-coolGray-400 font-medium">
                                Comments
                            </p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 p-2">
                        <div className="text-center">
                            <p className="mb-1 text-xs text-coolGray-900 font-semibold">
                                {this.state.shareCount}
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