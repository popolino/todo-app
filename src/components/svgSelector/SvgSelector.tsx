import React from "react";
import { colors, TColors } from "src/consts/colors";

type TSvgSelectorProps = {
  id: string;
  color?: TColors;
  className?: string;
  style?: Record<string, string>;
};

type TSvgMapItem = Record<string, JSX.Element>;

const SvgSelector: React.FC<TSvgSelectorProps> = ({
  id,
  className,
  style,
  color,
}) => {
  const colorCode = color ? colors[color] : "";
  const svgMap: TSvgMapItem = {
    search: (
      <svg className={className} style={style} viewBox="0 0 24 24">
        <path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" />
      </svg>
    ),
    placeholder: (
      <svg
        className={className}
        style={style}
        viewBox="0 0 30 26"
        fill={colorCode}
      >
        <path
          d="M25.6929 3.07269H4.30809C3.22416 3.07269 2.34546 3.95139 2.34546 5.03531V20.9654C2.34546 22.0494 3.22416 22.928 4.30809 22.928H25.6929C26.7768 22.928 27.6555 22.0494 27.6555 20.9654V5.03531C27.6555 3.95139 26.7768 3.07269 25.6929 3.07269Z"
          stroke={colorCode}
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <path
          d="M5.18188 20.0916V17.434L9.59697 13.0189L11.7974 15.2205L18.928 8.09111L24.7645 13.9277V20.0916H5.18188Z"
          fill={colorCode}
        />
        <path d="M10.4185 8.52751C10.3595 11.9695 5.2397 11.9684 5.18188 8.52751C5.24079 5.08555 10.3606 5.08664 10.4185 8.52751Z" />
      </svg>
    ),
    burger: (
      <svg
        className={className}
        style={style}
        viewBox="0 30 20 20"
        fill="#7E8DB7"
      >
        <rect y="35.5" width="20" height="2" rx="1" fill="#7E8DB7" />
        <rect y="42.5" width="20" height="2" rx="1" fill="#7E8DB7" />
      </svg>
    ),
    light_mode: (
      <svg
        className={className}
        style={style}
        viewBox="0 0 25 24"
        fill={colorCode}
      >
        <path d="M12.3077 6.54545C9.29677 6.54545 6.85313 8.98909 6.85313 12C6.85313 15.0109 9.29677 17.4545 12.3077 17.4545C15.3186 17.4545 17.7622 15.0109 17.7622 12C17.7622 8.98909 15.3186 6.54545 12.3077 6.54545ZM1.39859 13.0909H3.58041C4.18041 13.0909 4.67131 12.6 4.67131 12C4.67131 11.4 4.18041 10.9091 3.58041 10.9091H1.39859C0.798587 10.9091 0.307678 11.4 0.307678 12C0.307678 12.6 0.798587 13.0909 1.39859 13.0909ZM21.035 13.0909H23.2168C23.8168 13.0909 24.3077 12.6 24.3077 12C24.3077 11.4 23.8168 10.9091 23.2168 10.9091H21.035C20.435 10.9091 19.944 11.4 19.944 12C19.944 12.6 20.435 13.0909 21.035 13.0909ZM11.2168 1.09091V3.27273C11.2168 3.87273 11.7077 4.36364 12.3077 4.36364C12.9077 4.36364 13.3986 3.87273 13.3986 3.27273V1.09091C13.3986 0.490909 12.9077 0 12.3077 0C11.7077 0 11.2168 0.490909 11.2168 1.09091ZM11.2168 20.7273V22.9091C11.2168 23.5091 11.7077 24 12.3077 24C12.9077 24 13.3986 23.5091 13.3986 22.9091V20.7273C13.3986 20.1273 12.9077 19.6364 12.3077 19.6364C11.7077 19.6364 11.2168 20.1273 11.2168 20.7273ZM5.75131 3.90545C5.32586 3.48 4.62768 3.48 4.21313 3.90545C3.78768 4.33091 3.78768 5.02909 4.21313 5.44364L5.3695 6.6C5.79495 7.02545 6.49313 7.02545 6.90768 6.6C7.32222 6.17455 7.33313 5.47636 6.90768 5.06182L5.75131 3.90545ZM19.2459 17.4C18.8204 16.9745 18.1222 16.9745 17.7077 17.4C17.2822 17.8255 17.2822 18.5236 17.7077 18.9382L18.864 20.0945C19.2895 20.52 19.9877 20.52 20.4022 20.0945C20.8277 19.6691 20.8277 18.9709 20.4022 18.5564L19.2459 17.4ZM20.4022 5.44364C20.8277 5.01818 20.8277 4.32 20.4022 3.90545C19.9768 3.48 19.2786 3.48 18.864 3.90545L17.7077 5.06182C17.2822 5.48727 17.2822 6.18545 17.7077 6.6C18.1331 7.01455 18.8313 7.02545 19.2459 6.6L20.4022 5.44364ZM6.90768 18.9382C7.33313 18.5127 7.33313 17.8145 6.90768 17.4C6.48222 16.9745 5.78404 16.9745 5.3695 17.4L4.21313 18.5564C3.78768 18.9818 3.78768 19.68 4.21313 20.0945C4.63859 20.5091 5.33677 20.52 5.75131 20.0945L6.90768 18.9382Z" />
      </svg>
    ),
    dark_mode: (
      <svg className={className} style={style} viewBox="0 0 25 24" fill="none">
        <path
          d="M12.3077 0C5.68107 0 0.307739 5.37333 0.307739 12C0.307739 18.6267 5.68107 24 12.3077 24C18.9344 24 24.3077 18.6267 24.3077 12C24.3077 11.3867 24.2544 10.7733 24.1744 10.1867C22.8677 12.0133 20.7344 13.2 18.3077 13.2C14.3344 13.2 11.1077 9.97333 11.1077 6C11.1077 3.58667 12.2944 1.44 14.1211 0.133333C13.5344 0.0533332 12.9211 0 12.3077 0Z"
          fill={colorCode}
        />
      </svg>
    ),
    notification: (
      <svg className={className} style={style} viewBox="0 0 20 24" fill="none">
        <path
          d="M10.1538 24C11.5077 24 12.6154 22.8923 12.6154 21.5385H7.69229C7.69229 22.8923 8.78768 24 10.1538 24ZM17.5384 16.6154V10.4615C17.5384 6.68308 15.52 3.52 12 2.68308V1.84615C12 0.824615 11.1754 0 10.1538 0C9.13229 0 8.30768 0.824615 8.30768 1.84615V2.68308C4.77537 3.52 2.76922 6.67077 2.76922 10.4615V16.6154L0.307678 19.0769V20.3077H20V19.0769L17.5384 16.6154Z"
          fill={colorCode}
        />
      </svg>
    ),
    checkbox: (
      <svg className={className} style={style} viewBox="0 0 25 26" fill="none">
        <path
          d=" M12.5 24.5C18.8513 24.5 24 19.3513 24 13C24 6.64873 18.8513 1.5 12.5 1.5C6.14873 1.5 1 6.64873 1 13C1 19.3513 6.14873 24.5 12.5 24.5Z"
          stroke={colorCode}
          strokeWidth="2"
          strokeMiterlimit="10"
        />
      </svg>
    ),
    checked: (
      <svg className={className} style={style} viewBox="0 0 25 26" fill="none">
        <path
          fill={colorCode}
          opacity="0.3"
          d="M12.5 25.5C5.59625 25.5 0 19.9037 0 13C0 6.09625 5.59625 0.5 12.5 0.5C19.4037 0.5 25 6.09625 25 13C25 19.9037 19.4037 25.5 12.5 25.5ZM11.2537 18L20.0912 9.16125L18.3237 7.39375L11.2537 14.465L7.7175 10.9288L5.95 12.6962L11.2537 18Z"
        />
      </svg>
    ),
  };

  if (!svgMap.hasOwnProperty(id)) {
    console.warn(`Svg with id "${id}" doesn't exist`);
    return svgMap.placeholder;
  }

  return svgMap[id];
};

export default React.memo(SvgSelector);