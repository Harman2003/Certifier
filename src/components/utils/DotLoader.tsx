import React from 'react'
import { ThreeDots } from 'react-loader-spinner';
import { BsExclamationLg as ErrorIcon } from "react-icons/bs";

const DotLoader = ({isError}:{isError:boolean}) => {
  return (
    <div
      className="w-[24px] h-[24px] border-[2px] rounded-full flex items-center justify-center"
      style={{ borderColor: isError ? "rgb(239 68 68)" : "rgb(30 64 175)" }}
    >
      {isError ? (
        <ErrorIcon color="rgb(239 68 68)" />
      ) : (
        <ThreeDots
          visible={true}
          height="18"
          width="18"
          color="rgb(30 64 175)"
          radius="1"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}
    </div>
  );
}

export default DotLoader
