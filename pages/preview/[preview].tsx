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
    const { req } = context;
    const userAgent = req.headers["user-agent"];
    let isPhone: boolean = false;
    if (userAgent.indexOf("iPhone") !== -1 || userAgent.indexOf("Android") !== -1) {
        isPhone = true
    }
    let server = {
        data: previewData,
        isPhone: isPhone
    }

    const getPost = `${process.env.FEED_API}/post/${preview}${process.env.API_KEY}`;
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
    const { isPhone } = props
    const { description } = props.data
    let { profileImg, userName } = props.data.userInfo;
    if (!profileImg) profileImg = "/flex-ui-assets/images/tontoprofile_defualt.png";
    return (
        <div className="flex flex-col h-screen bg-white text-black md:justify-center md:items-center md:relative">
            <MetaTags data={props.data} />
            { isPhone && 
                <div className="relative w-full h-20 bg-white flex flex-row items-center">
                    <Icon className="mx-3 w-15 h-15 rounded-full"/>
                    <div className="flex flex-col">
                        <div className="text-lg font-medium"> Tonto - Social Audio App</div>
                        <div className="text-sm font-light leading-3"> Open in Tonto App</div>
                    </div>
                    <Link href={"https://app.gettonto.com/download"}
                          className="bg-[#109C90] text-white ml-auto font-medium rounded-2xl px-3 py-1 mr-3 h-8 flex items-center">
                        OPEN
                    </Link>
                </div>
            }
            <div className="relative inset-x-0 w-full md:w-1/3">
                <img loading="lazy" className="w-full max-h-96 md:max-h-full" src={profileImg}></img>
            </div>
            <section className="mx-3 md:w-1/3 md:px-2">
                <div className="mt-10">
                    <p className="text-xs font-bold">
                        TONTO
                    </p>
                    <p className="text-xl ">
                        {userName}
                    </p>
                    <p className="max-h-20 overflow-y-scroll no-scrollbar">
                        {description}
                    </p>
                </div>
                <div className="flex flex-col mt-2">
                    <div className="flex flex-col items-center leading-2 text-sm font-thin justify-center">
                        See this content in the app
                        <div className="w-full h-[2px] bg-gray-400 " />
                    </div>
                    <div className="flex flex-row mt-2">
                        <Icon className="rounded-xl ml-2 h-[56px]" />
                        <Link href={"https://app.gettonto.com/download"}
                            className='bg-[#109C90] h-[56px] md:w-[85%] text-white px-10 py-4 ml-auto w-3/4 rounded-xl flex justify-center items-center'>
                            Get The App
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}


export default Preview;