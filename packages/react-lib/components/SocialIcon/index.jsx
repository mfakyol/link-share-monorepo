import classes from "./style.module.scss";

import ColoredYoutubeIcon from "@packages/react-lib/icons/social/colored/YoutubeIcon";
import ColoredTwitterIcon from "@packages/react-lib/icons/social/colored/TwitterIcon";
import ColoredTiktokIcon from "@packages/react-lib/icons/social/colored/TiktokIcon";
import ColoredSpotifyIcon from "@packages/react-lib/icons/social/colored/SpotifyIcon";
import ColoredInstagramIcon from "@packages/react-lib/icons/social/colored/InstagramIcon";
import ColoredFacebookIcon from "@packages/react-lib/icons/social/colored/FacebookIcon";
import ColoredAppleMusicIcon from "@packages/react-lib/icons/social/colored/AppleMusicIcon";

import FillYoutubeIcon from "@packages/react-lib/icons/social/fill/YoutubeIcon";
import FillTwitterIcon from "@packages/react-lib/icons/social/fill/TwitterIcon";
import FillTiktokIcon from "@packages/react-lib/icons/social/fill/TiktokIcon";
import FillSpotifyIcon from "@packages/react-lib/icons/social/fill/SpotifyIcon";
import FillInstagramIcon from "@packages/react-lib/icons/social/fill/InstagramIcon";
import FillFacebookIcon from "@packages/react-lib/icons/social/fill/FacebookIcon";
import FillAppleMusicIcon from "@packages/react-lib/icons/social/fill/AppleMusicIcon";

import OutlineYoutubeIcon from "@packages/react-lib/icons/social/outline/YoutubeIcon";
import OutlineTwitterIcon from "@packages/react-lib/icons/social/outline/TwitterIcon";
import OutlineTiktokIcon from "@packages/react-lib/icons/social/outline/TiktokIcon";
import OutlineSpotifyIcon from "@packages/react-lib/icons/social/outline/SpotifyIcon";
import OutlineInstagramIcon from "@packages/react-lib/icons/social/outline/InstagramIcon";
import OutlineFacebookIcon from "@packages/react-lib/icons/social/outline/FacebookIcon";
import OutlineAppleMusicIcon from "@packages/react-lib/icons/social/outline/AppleMusicIcon";

const socialIcons = {
  color: {
    youtube: ColoredYoutubeIcon,
    twitter: ColoredTwitterIcon,
    tiktok: ColoredTiktokIcon,
    spotify: ColoredSpotifyIcon,
    instagram: ColoredInstagramIcon,
    facebook: ColoredFacebookIcon,
    "apple-music": ColoredAppleMusicIcon,
  },
  fill: {
    youtube: FillYoutubeIcon,
    twitter: FillTwitterIcon,
    tiktok: FillTiktokIcon,
    spotify: FillSpotifyIcon,
    instagram: FillInstagramIcon,
    facebook: FillFacebookIcon,
    "apple-music": FillAppleMusicIcon,
  },
  outline: {
    youtube: OutlineYoutubeIcon,
    twitter: OutlineTwitterIcon,
    tiktok: OutlineTiktokIcon,
    spotify: OutlineSpotifyIcon,
    instagram: OutlineInstagramIcon,
    facebook: OutlineFacebookIcon,
    "apple-music": OutlineAppleMusicIcon,
  },
};

function SocialIcon({ className = "", theme = "colored", type }) {
  const SocialIconComponent = socialIcons[theme][type];
  return <SocialIconComponent className={`${classes.socialİcon} ${className}`} />;
}

export default SocialIcon;
