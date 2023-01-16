import Sun from '../../public/flex-ui-assets/sun.svg'
import Moon from '../../public/flex-ui-assets/moon.svg'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react';

export default function PrimaryHeader() {
    const { systemTheme, theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])
    const renderThemeChanger = () => {
        if (!mounted) return null

        const currentTheme = theme === "system" ? systemTheme : theme;
        return (
            currentTheme == "dark" ?
                <Sun onClick={() => { setTheme("light") }} className="absolute mr-3 cursor-pointer bg-white rounded-lg text-teal-500 h-8 w-8 justify-self-end justify-items-center" />
                :
                <Moon onClick={() => { setTheme("dark") }} className="absolute mr-3 cursor-pointer bg-white rounded-lg text-teal-500 h-8 w-8 justify-self-end justify-items-center" />

        )
    }
    return (
        <div className="fixed grid justify-items-center items-center top-10 w-full md:w-[50%] py-5 px-4 bg-teal-500  shadow-md rounded-t-2xl">
            <img loading="lazy" className="h-8"
                src="/flex-ui-assets/logos/tonto_logotipo_horizontal_white@2x.png"
                alt="tonto_logo" />
            {renderThemeChanger()}
        </div>
    )
}