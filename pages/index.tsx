import Head from 'next/head'
import Image from 'next/image'
import MetaTags from '../components/MetaTags'
import PrimaryHeader from '../components/Primary/PrimaryHeader'
import PrimaryPost from '../components/Primary/PrimaryPost'
import React from 'react'
import GlobalPlayer from '../components/Player/GlobalPlayer'

export default function Home() {
  const postId : string = "62135d919fe293000fd41dce";

  return (
    <div>
      <MetaTags />
      <main>
        <PrimaryHeader/>
        <PrimaryPost postId={postId}/>
        <GlobalPlayer/>
      </main>
    </div>
  )
}
