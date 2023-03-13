import React from "react";

interface LogoProps {
  textColor: string;
}

const Logo: React.FC<LogoProps> = ({ textColor }) => {
  return (
    <div className="flex flex-row  items-center justify-center w-full  ">
      <img src="/images/launchwith-logo.png" alt="logo" width={80} height={80} />
      <p className={` text-${textColor} text-4xl md:text-5xl lg:text-6xl font-bold`}>LaunchWith</p>
    </div>
  );
};

export default Logo;
