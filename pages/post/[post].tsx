import MetaTags from '../../components/MetaTags'
import PrimaryHeader from '../../components/Primary/PrimaryHeader'
import PrimaryPost from '../../components/Primary/PrimaryPost'
import React from 'react'
import { useRouter } from 'next/router'
import {GlobalPlayer} from '../../components/Player/GlobalPlayer'
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
const slug = "6381ce9059b930327afece05"
const Post = () => {
 /*  const router = useRouter()
  const { slug } = router.query */
  console.log(slug)
    return (
      <div>
        <MetaTags />
        <main >
          <PrimaryHeader/>
          <PrimaryPost postId={slug}/>
          <GlobalPlayer postId={slug}/>
        </main>
      </div>
    )
}
export default Post;