import MetaTags from '../../components/MetaTags'
import React, { useEffect, useState, useRef } from "react"
import PrimaryHeader from '../../components/Primary/PrimaryHeader'
import PrimaryPost from '../../components/Primary/PrimaryPost'
import { useRouter } from 'next/router'
import { GlobalPlayer } from '../../components/Player/GlobalPlayer'
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
//const slug = "62b131b4db1ec8000f04084e"

const post = {
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
  updatedAt: "",
  userInfo: { id: '', userName: '', profileImg: '', isUserVerified: null },
  uuid: "",
  visibility: ""
}
export const getServerSideProps = async (context: any) => {
  const { id } = context.query;
  return {
    props: { post: id }
  };
};

export default function Post(props: any) {
  const [data, setData] = useState(post)
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    //console.log(props)
    setIsLoading(true)
    const url = `https://webfeed-dev.apis.gettonto.com/posts/${props.post}?api_key=16dea2a1-35e8-4332-8cd6-e534300d16b7`;
    fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setData(data.data[0])
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => { setIsLoading(false) })
  }, [])

  return (
    <div>
      <MetaTags />
      <main >
        <PrimaryHeader />
        {!isLoading &&
          <React.Fragment>
            <PrimaryPost props={data} />
            <GlobalPlayer props={data} />
          </React.Fragment>
        }
      </main>
    </div>
  )
}

/* useEffect(() => {
  const urlUuid = `https://feed-dev.apis.urloapp.com/feed/${data.uuid}/profile?api_key=16dea2a1-35e8-4332-8cd6-e534300d16b7`;
  fetch(urlUuid, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      console.log("data: ", data)
    })
}, [data]) 
  useEffect(() => {
*/