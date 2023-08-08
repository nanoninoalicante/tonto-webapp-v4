import { useRouter } from "next/router"
import { Context, ContextType } from "react"
import PrimaryHeader from "../../components/Primary/PrimaryHeader";
import { getProfile } from "../../utils/profile";
import Link from "next/link";
import MetaTags from "../../components/MetaTags";

export const getServerSideProps = async (context: any) => {
    try {
        const { profile, deeplink, userId } = context.query;
        const { req } = context;
        //const userAgent = req.headers["user-agent"];
        //let isPhone: boolean = false;
        const parsedUrl = new URL(req.url, 'https://web-dev.gettonto.com');
        const deeplinkParam = parsedUrl.searchParams.get('deeplink') || process.env.APP_LINK!;
        const deeplinkUrl = decodeURIComponent(deeplinkParam);

        /* if (userAgent.indexOf("iPhone") !== -1 || userAgent.indexOf("Android") !== -1) {
            isPhone = true
        } */
        const response = await getProfile(profile || userId);
        if (response.error) {
            return { props: { error: response.error } };
        }
        const data = {
            data: response.data,
            profileImg: response.data.profileImg,
            userName: response.data.userName || "",
            link: deeplinkUrl
        };
        return { props: data };

    } catch (error) {
        console.log(error);
    }

}

const Profile = (props: any) => {
    const image = props.profileImg || "/flex-ui-assets/images/tontoprofile_defualt.png";
    return (
        <main className="grid place-items-center relative md:top-[10vh]">
            <MetaTags data={props.data} />
            <section className="w-full flex flex-col items-center justify-center font-medium ">
                <PrimaryHeader />
                <div className="flex flex-col justify-center items-center mt-10">
                    <div className="relative inset-x-0 w-full md:w-1/3">
                        <img loading="lazy" className="w-full max-h-96 md:max-h-full" src={image}></img>
                    </div>
                    <div className="text-3xl font-bold mt-2">{props.userName || ""}</div>
                    <Link href={`${props.link}`} className="bg-teal-500/70 hover:bg-teal-600 dark:hover:bg-white dark:hover:text-teal-500  text-white rounded-[5px] py-3 px-4 mt-10"> See in the app </Link>
                </div>
            </section>
        </main>
    );
}

export default Profile;