import { FaFileDownload as DownloadIcon } from "react-icons/fa";
import { SlArrowRight as ArrowIcon } from "react-icons/sl";

const DownloadCard = () => {
  return (
    <div className="row-span-4 bg-white rounded-2xl px-4 text-center flex flex-col items-center">
      <img src="/report.jpg" alt="" className="w-56 h-56" />
      <button className="bg-slate-100 hover:bg-slate-200 w-full py-2 px-4 rounded-full flex justify-around items-center">
        <DownloadIcon className="bg-white rounded-full p-1" size={30} />
        <span className="text-gray-600 text-lg font-bold font-Nunito">
          Download Report
        </span>
        <ArrowIcon />
      </button>
    </div>
  );
};

export default DownloadCard;
