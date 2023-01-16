const Back = (props) => {
  return (
    <svg
      width={26}
      height={32}
      viewBox="0 0 26 32"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <defs>
        <filter
          x="-14.1%"
          y="-11.2%"
          width="128.1%"
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
          d="m2.133.27 16 12c.316.236.492.579.527.933l.006.132-.006.134c-.035.354-.21.696-.527.933l-16 12c-.879.66-2.133.032-2.133-1.066v-24C0 .237 1.254-.39 2.133.269Zm19.2-.268V26.67h-2.666V.002h2.666Z"
          id="b"
        />
      </defs>
      <g transform="matrix(-1 0 0 1 23.667 2.667)" fill="none" fillRule="evenodd">
        <use fill="#000" filter="url(#a)" xlinkHref="#b" />
        <use fill="#4A4A4A" xlinkHref="#b" />
      </g>
    </svg>
  )
}

export default Back;