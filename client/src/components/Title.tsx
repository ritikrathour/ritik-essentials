import React from "react";

type titleType = {
  text: string;
  className?: string;
};

const Title: React.FC<titleType> = ({ text, className }) => {
  return (
    <>
      <h1 className={`text-2xl capitalize font-bold my-5 ${className}`}>
        {text}
      </h1>
    </>
  );
};
export default Title;
