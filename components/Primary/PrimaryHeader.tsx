import Sun from '../../public/flex-ui-assets/sun.svg'
import Moon from '../../public/flex-ui-assets/moon.svg'
import LogoLight from '../../public/flex-ui-assets/logos/logo_light.svg'
import LogoDark from '../../public/flex-ui-assets/logos/logo_dark.svg'
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
        console.log(currentTheme, theme)
        return (
            currentTheme == "dark" ?
                <Sun onClick={() => { setTheme("light") }} className="absolute mr-3 cursor-pointer bg-white rounded-lg text-teal-500 h-8 w-8 justify-self-end justify-items-center" />
                :
                <Moon onClick={() => { setTheme("dark") }} className="absolute mr-3 cursor-pointer bg-white rounded-lg text-teal-500 h-8 w-8 justify-self-end justify-items-center" />

        )
    }
    return (
        <div className="fixed grid justify-items-start items-center top-10 w-full md:w-[50%] py-5 px-4">
            <LogoLight />
            {renderThemeChanger()}
        </div>
    )
}