import Logo from "./Logo";

export default function LogoHolder () {
    return (
        <div className="w-1/2 md:w-1/2">
        <a className="flex justify-center max-w-max mx-auto px-4">
            <Logo />
        </a>
    </div>
    )
}