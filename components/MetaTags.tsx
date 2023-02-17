import Head from "next/head";

const MetaTags = (data: any) => {
    const image = data.data.userInfo.profileImg ? data.data.userInfo.profileImg : "/flex-ui-assets/images/tontoprofile_defualt.png"
    const title = `Tonto - Social Audio App - Record, Listen and Share audios - Posted by ${data.data.userInfo.userName}`
    return (
        <Head>
            <title>{title}</title>
            <meta name="title" content={title}></meta>
            <meta name="description" content={data.data.description}></meta>

            {/* FACEBOOK & INSTAGRAM */}
            <meta property="og:type" content="music.song" />
            <meta property="og:url" content="https://www.gettonto.com/" />
            <meta property="og:title" content={title}></meta>
            <meta property="og:audio" content={data.data.downloadUrl[0]}></meta>
            <meta property="og:description" content={data.data.description} />
            <meta property="og:image" content={image}></meta>
            <meta property="og:image:width" content="1200"></meta>
            <meta property="og:image:height" content="630"></meta>
            <meta property="og:image:url" content={image}></meta>

            {/* TWITTER */}
            <meta name="twitter:card" content="audio" />
            <meta name="twitter:site" content="@gettonto" />
            <meta name="twitter:url" content="https://www.gettonto.com/" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={data.data.description} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:player:width" content="1200"/>
            <meta name="twitter:player:height" content="630"/>
            <meta name="twitter:player" content={data.data.downloadUrl[0]} />
            <meta name="twitter:player:stream" content={data.data.downloadUrl[0]} />
            <meta name="twitter:player:stream:content_type" content="audio/mp3"></meta>


        </Head>
    )
}

export default MetaTags