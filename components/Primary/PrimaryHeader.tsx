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

    if (!mounted) return null
    const currentTheme = theme === "system" ? systemTheme : theme;
    return (
        <div className="relative flex flex-row justify-items-start items-center top-0 w-full md:w-[50%] dark:md:bg-transparent pt-4 px-6 dark:bg-gradient-to-b dark:md:from-transparent dark:md:to-transparent dark:from-[#6F6F6F] dark:to-[#3C3C3C]">
            {theme === "dark" ? <LogoDark /> : <LogoLight />}
            {currentTheme == "dark" ?
                <Sun onClick={() => { setTheme("light") }} className="relative pt-1 cursor-pointer rounded-lg text-teal-500 h-8 w-8 ml-auto" />
                :
                <Moon onClick={() => { setTheme("dark") }} className="relative pt-1 cursor-pointer rounded-lg text-teal-500 h-8 w-8 ml-auto" />
            }
        </div>
    )
}