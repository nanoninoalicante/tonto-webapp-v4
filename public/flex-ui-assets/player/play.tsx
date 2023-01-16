const Play = (props) => {
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
                    x="-12.5%"
                    y="-11.2%"
                    width="125%"
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
                    d="M25.002 2.946 4.894 14.492c-1.19.683-1.193 2.236-.006 2.922l20.108 11.637c1.295.75 3.004-.081 3.004-1.46V4.409c0-1.375-1.703-2.206-2.998-1.462Z"
                    id="b"
                />
            </defs>
            <g fill="none" fillRule="evenodd">
                <path
                    d="M25 0c13.807 0 25 11.193 25 25S38.807 50 25 50 0 38.807 0 25 11.193 0 25 0Zm0 2C12.297 2 2 12.297 2 25s10.297 23 23 23 23-10.297 23-23S37.703 2 25 2Z"
                    fill="#4A4A4A"
                />
                <g transform="rotate(180 22 20.5)">
                    <use fill="#000" filter="url(#a)" xlinkHref="#b" />
                    <use fill="#4A4A4A" xlinkHref="#b" />
                </g>
            </g>
        </svg>
    )
}
export default Play
