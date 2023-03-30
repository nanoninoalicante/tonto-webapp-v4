import { useRouter } from "next/router"
import { Context, ContextType } from "react"
import PrimaryHeader from "../../components/Primary/PrimaryHeader";
import { getProfile } from "../../utils/profile";

export const getServerSideProps = async (context: any) => {
    const { profile } = context.query;
    const response = await getProfile(profile);
    const data = {
        profileImg: response.data.profileImg,
        userName: response.data.userName
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
                    <button className="bg-black/70 border-2 border-black/50 rounded-xl p-2 mt-10 hover:bg-slate-500"> See in the app</button>
                </div>
            </section>
        </main>
    );
}

export default Profile;