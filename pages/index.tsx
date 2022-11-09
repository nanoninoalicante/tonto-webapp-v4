import MetaTags from '../components/MetaTags'
import PrimaryHeader from '../components/Primary/PrimaryHeader'
import PrimaryPost from '../components/Primary/PrimaryPost'
import React from 'react'
import GlobalPlayer from '../components/Player/GlobalPlayer'

type Props = {
  post: string
}

type State = {
  post: string
}
//santeetji: 62b131b4db1ec8000f04084e
//begaes: 628e108820eaae000f00a887
class Home extends React.Component<Props,State> {
  state: State = {
    post: "62b131b4db1ec8000f04084e"
  }
  render(){
    return (
      <div>
        <MetaTags />
        <main>
          <PrimaryHeader/>
          <PrimaryPost postId={this.state.post}/>
          <GlobalPlayer postId={this.state.post}/>
        </main>
      </div>
    )
  }
}
export default Home;