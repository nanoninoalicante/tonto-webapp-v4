import { useRouter } from "next/router"
import { Context, ContextType } from "react"
import PrimaryHeader from "../../components/Primary/PrimaryHeader";
import { getProfile } from "../../utils/profile";
import Link from "next/link";

export const getServerSideProps = async (context: any) => {
    const { profile, deeplink } = context.query;
    const link = deeplink || process.env.APP_LINK!
    const { req } = context;
    const userAgent = req.headers["user-agent"];
    let isPhone: boolean = false;
    if (userAgent.indexOf("iPhone") !== -1 || userAgent.indexOf("Android") !== -1) {
        isPhone = true
    }
    const response = await getProfile(profile);
    const data = {
        profileImg: response.data.profileImg,
        userName: response.data.userName,
        link: link
    };

    return { props: data };
}

const Profile = (props: any) => {
    return (
        <main className="grid place-items-center relative md:top-[10vh]">
            <section className="w-full flex flex-col items-center justify-center font-medium ">
                <PrimaryHeader />
                <div className="flex flex-col justify-center items-center mt-10">
                    <img src={props.profileImg} className="w-[300px] rounded-full" alt="Profile" />
                    <div className="text-3xl font-bold mt-2">{props.userName}</div>
                    <Link href={`${props.link}`} className="bg-teal-500/70 hover:bg-teal-600 dark:hover:bg-white dark:hover:text-teal-500  text-white rounded-[5px] py-3 px-4 mt-10"> See in the app </Link>
                </div>
            </section>
        </main>
    );
}

export default Profile;