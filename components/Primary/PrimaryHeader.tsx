import Link from "next/link"

export default function PrimaryHeader() {
    return (
        <div className="fixed grid justify-items-center items-center top-10 w-full md:w-[50%] py-5 px-4 bg-teal-500  shadow-md rounded-t-2xl">
            <img loading="lazy" className="h-8"
                src="/flex-ui-assets/logos/tonto_logotipo_horizontal_white@2x.png"
                alt="tonto_logo" />
            <Link href={"https://gettonto.com"} className="absolute bg-white rounded-xl mr-5 p-2 text-teal-500 justify-self-end justify-items-center border-2 border-teal-600 hover:">
                Get Tonto
            </Link>
        </div>
    )
}