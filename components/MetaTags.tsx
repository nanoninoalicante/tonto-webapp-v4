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
            {/* meta tags for audio card */}
            <meta property="og:type" content="music.song" />
            <meta property="og:url" content={data.data.downloadUrl[0]} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={data.data.description} />
            <meta property="og:image" content={image} />
            <meta property="music:duration" content="300" />
            <meta property="music:album" content="Tonto" />
            <meta property="music:album:disc" content="1" />
            <meta property="music:album:track" content="1" />
            <meta property="music:musician" content={data.data.userInfo.userName} />
            <meta property="music:song" content={data.data.userInfo.userName} />
            <meta property="music:song:disc" content="1" />
            <meta property="music:song:track" content="1" />
            <meta property="music:creator" content={data.data.userInfo.userName} />
                        


        </Head>
    )
}

export default MetaTags