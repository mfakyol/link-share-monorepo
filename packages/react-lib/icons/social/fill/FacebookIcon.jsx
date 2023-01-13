import IconWrapper from "../../_IconWrapper";

function FacebookIcon({ ...props }) {
  return (
    <IconWrapper {...props}>
      <g clipPath="url(#clip0_24_792)">
        <path
          d="M28 0H4C1.794 0 0 1.794 0 4V28C0 30.206 1.794 32 4 32H28C30.206 32 32 30.206 32 28V4C32 1.794 30.206 0 28 0Z"
        />
        <path
          d="M27 16H22V12C22 10.896 22.896 11 24 11H26V6H22C18.686 6 16 8.686 16 12V16H12V21H16V32H22V21H25L27 16Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_24_792">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </IconWrapper>
  );
}

export default FacebookIcon;
