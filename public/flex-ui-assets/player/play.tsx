const Play = (props) => {
    return (
        <svg
            width={59}
            height={59}
            viewBox="0 0 59 59"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <defs>
                <clipPath id="a">
                    <path d="M1920 0v1080H0V0h1920Z" />
                </clipPath>
                <clipPath id="b">
                    <path d="M29.5 0C45.792 0 59 13.208 59 29.5S45.792 59 29.5 59 0 45.792 0 29.5 13.208 0 29.5 0Z" />
                </clipPath>
                <clipPath id="c">
                    <path d="m0 0 2.144 1.4L23.58 15.181 2.144 28.962 0 30.362V0Z" />
                </clipPath>
            </defs>
            <g clipPath="url(#a)" transform="translate(-173 -190)">
                <g clipPath="url(#b)" transform="translate(173 190)">
                    <path fill="#3C3C3C" d="M0 0h59v59H0V0z" />
                </g>
                <g clipPath="url(#c)" transform="translate(190.8 204.819)">
                    <path fill="#F7F7F7" d="M0 0h23.581v30.363H0V0z" />
                </g>
            </g>
        </svg>

    )
}
export default Play


