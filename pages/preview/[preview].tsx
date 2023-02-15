import Link from "next/link";
import MetaTags from "../../components/MetaTags";
import Icon from "../../public/flex-ui-assets/logos/icon.svg"

const previewData = {
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
    const { preview } = context.query;
    let server = {
        data: previewData
    }

    const getPost = `${process.env.FEED_API}/post/${preview}${process.env.API_KEY}`;
    console.log(getPost)
    await fetch(getPost, { method: "GET" })
        .then((response) => response.json())
        .then(async (data) => {
            server.data = data?.data[0] || previewData;
        })
        .catch(error => {
            console.log(error)
        })

    return { props: server }
};

const Preview = (props: any) => {
    let { profileImg, userName } = props.data.userInfo;
    if (!profileImg) profileImg = "/flex-ui-assets/images/tontoprofile_defualt.png";
    const { description } = props.data
    return (
        <div className="flex flex-col h-screen bg-white text-black">
            <MetaTags data={props.data} />
            <div className="top-0 inset-x-0 w-full">
                <img className="w-full" src={profileImg}></img>
            </div>
            <section className="mx-3">
                <div className="mt-10">
                    <p className="text-xs font-bold">
                        TONTO
                    </p>
                    <p className="text-xl ">
                        {userName}
                    </p>
                    <p>
                        {description}
                    </p>
                </div>
                <div className="flex flex-col mt-2">
                    <div className="flex flex-col items-center leading-2 text-sm font-thin justify-center">
                        See this content in the app
                        <div className="w-full h-[2px] bg-gray-400 "/>
                    </div>
                    <div className="flex flex-row mt-2">
                        <Icon className="rounded-xl ml-2 h-[56px]"/>
                        <Link href={"https://app.gettonto.com/download"} 
                            className='bg-gray-800 h-[56px] text-white px-10 py-4 ml-auto w-3/4 flex justify-center items-center'>
                            Get The App
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Preview;