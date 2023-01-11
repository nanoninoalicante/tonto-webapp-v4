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
            <meta property="og:type" content="website"></meta>
            <meta property="og:url" content="https://www.gettonto.com/"></meta>
            <meta property="og:title" content={title}></meta>
            <meta property="og:description" content={data.data.description}></meta>
            <meta property="og:image" content={image}></meta>

            {/* TWITTER */}
            <meta property="twitter:card" content="summary_large_image"></meta>
            <meta property="twitter:url" content="https://www.gettonto.com/"></meta>
            <meta property="twitter:title" content={title}></meta>
            <meta property="twitter:description" content={data.data.description}></meta>
            <meta property="twitter:image" content={image}></meta>
        </Head>
    )
}

export default MetaTags