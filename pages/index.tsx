import MetaTags from '../components/MetaTags'
import PrimaryHeader from '../components/Primary/PrimaryHeader'
import PrimaryPost from '../components/Primary/PrimaryPost'
import React from 'react'
import { useRouter } from 'next/router'
import {GlobalPlayer} from '../components/Player/GlobalPlayer'

type Props = {
  post: string
}

type State = {
  post: string
}
//santeetji: 62b131b4db1ec8000f04084e
//begaes: 628e108820eaae000f00a887
function Home() {
  const router = useRouter()
  const state = {
    post: "63777792256a00603a8e3aa4"
  }
    return (
      <div>
        <MetaTags />
        <main >
          <PrimaryHeader/>
          <PrimaryPost postId={state.post}/>
          <GlobalPlayer postId={state.post}/>
        </main>
      </div>
    )
}
export default Home;