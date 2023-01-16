const Pause = (props) => {
    return (
        <svg
            width={50}
            height={50}
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <defs>
                <filter
                    x="-16.1%"
                    y="-11.3%"
                    width="132.1%"
                    height="122.5%"
                    filterUnits="objectBoundingBox"
                    id="a"
                >
                    <feOffset in="SourceAlpha" result="shadowOffsetOuter1" />
                    <feGaussianBlur
                        stdDeviation={1}
                        in="shadowOffsetOuter1"
                        result="shadowBlurOuter1"
                    />
                    <feColorMatrix
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                        in="shadowBlurOuter1"
                    />
                </filter>
                <path
                    d="M11.238 2.667c1.894 0 3.429 1.79 3.429 4v18.666c0 2.21-1.535 4-3.429 4h-1.143c-1.893 0-3.428-1.79-3.428-4V6.667c0-2.21 1.535-4 3.428-4h1.143Zm10.667 0c1.893 0 3.428 1.79 3.428 4v18.666c0 2.21-1.535 4-3.428 4h-1.143c-1.894 0-3.429-1.79-3.429-4V6.667c0-2.21 1.535-4 3.429-4h1.143Z"
                    id="b"
                />
            </defs>
            <g fill="none" fillRule="evenodd">
                <path
                    d="M25 0c13.807 0 25 11.193 25 25S38.807 50 25 50 0 38.807 0 25 11.193 0 25 0Zm0 2C12.297 2 2 12.297 2 25s10.297 23 23 23 23-10.297 23-23S37.703 2 25 2Z"
                    fill="#4A4A4A"
                />
                <g transform="translate(9 9)">
                    <use fill="#000" filter="url(#a)" xlinkHref="#b" />
                    <use fill="#4A4A4A" xlinkHref="#b" />
                </g>
            </g>
        </svg>
    )
}

export default Pause