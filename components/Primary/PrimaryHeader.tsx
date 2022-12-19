import LogoHolder from "./LogoHolder";

export default function PrimaryHeader() {
    return (
        <section className="fixed top-2 w-full left-0 bg-teal-500 shadow-md rounded-t-2xl">
            <nav className="flex justify-between p-6 px-4">
                <div className="flex justify-center items-center w-full">
                    <LogoHolder />
                </div>
            </nav>
        </section>
    )
}