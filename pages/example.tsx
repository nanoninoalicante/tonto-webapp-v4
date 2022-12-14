
import React from 'react'
import { useRouter } from 'next/router'
import {GlobalPlayer} from '../components/Player/GlobalPlayer'
import Link from 'next/link'
import Post from './post/[post]'

type Props = {
  post: string
}

type State = {
  post: string
}
//santeetji: 62b131b4db1ec8000f04084e
//begaes: 628e108820eaae000f00a887
function Example() {
    return (
        <div className="mx-full mt-28 justify-center bg-white rounded-b-xl">
        <div className="flex flex-col justify-center items-center border-b-2">
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
    </div>
    )
}
export default Example;