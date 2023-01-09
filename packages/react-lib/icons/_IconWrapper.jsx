import React from "react";

function IconWrapper({
  width = "32",
  height = "32",
  fill = "#000",
  viewBox = "0 0 32 32",
  xmlns = "http://www.w3.org/2000/svg",
  children,
  ...rest
}) {
  return (
    <svg width={width} height={height} fill={fill} viewBox={viewBox} xmlns={xmlns} {...rest}>
      {children}
    </svg>
  );
}

export default IconWrapper;
