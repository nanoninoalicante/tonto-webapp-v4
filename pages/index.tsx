import Head from 'next/head'
import Image from 'next/image'
import MetaTags from '../components/MetaTags'
import PrimaryHeader from '../components/Primary/PrimaryHeader'
import PrimaryPost from '../components/Primary/PrimaryPost'
import React from 'react'
import GlobalPlayer from '../components/Player/GlobalPlayer'
import { render } from 'react-dom'

type Props = {
  post: string
}

type State = {
  post: string
}
class Home extends React.Component<Props,State> {
  state: State = {
    post: "62135d919fe293000fd41dce"
  }
  render(){
    return (
      <div>
        <MetaTags />
        <main>
          <PrimaryHeader/>
          <PrimaryPost postId={this.state.post}/>
          <GlobalPlayer/>
        </main>
      </div>
    )
  }
}
export default Home;