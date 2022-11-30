
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
function Home() {
    return (
      <Post />
    )
}
export default Home;