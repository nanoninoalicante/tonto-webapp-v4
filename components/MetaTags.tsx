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
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://gettonto.com"/>
            <meta property="og:title" content={title}></meta>
            <meta property="og:audio" content={data.data.downloadUrl[0]}></meta>
            <meta property="og:description" content={data.data.description} />
            <meta property="og:image" content={image}></meta>
            <meta property="og:image:width" content="1200"></meta>
            <meta property="og:image:height" content="630"></meta>
            <meta property="og:image:url" content={image}></meta>

            {/* TWITTER */}
            {/** do the twitter meta tags */}
            
            {/* LINKEDIN */}    
            <meta property="og:site_name" content="Tonto - Social Audio App" />
            <meta property="og:locale" content="en_US" />
            <meta property="og:audio:secure_url" content={data.data.downloadUrl[0]}></meta>
            <meta property="og:audio:type" content="audio/mpeg"></meta>
            <meta property="og:audio:alt" content={data.data.description}></meta>
            <meta property="og:audio:title" content={title}></meta>
            <meta property="og:audio:artist" content={data.data.userInfo.userName}></meta>
            <meta property="og:audio:album" content="Tonto - Social Audio App"></meta>
            <meta property="og:audio:duration" content={data.data.duration}></meta>
            <meta property="og:audio:secure_url" content={data.data.downloadUrl[0]}></meta>
            <meta property="og:audio:type" content="audio/mpeg"></meta>
            


        </Head>
    )
}

export default MetaTags