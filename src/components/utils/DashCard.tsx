import React from 'react'
import IncGraph from "@/assets/inc_chart.svg?react";
import DecGraph from "@/assets/dec_chart.svg?react";
import { BsArrowUpCircle } from "react-icons/bs";
import { BsArrowDownCircle } from "react-icons/bs";

interface DashCardProps{
  head: string,
  value: number,
  isIncreasing: boolean,
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  change:string
}
const DashCard:React.FC<DashCardProps> = ({head, value,isIncreasing, Icon, change}) => {
  return (
    <div className="p-4 flex-1 flex flex-col rounded-2xl bg-white overflow-hidden">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6">
          <Icon />
        </div>
        <div className="font-bold font-Montserrat">{head}</div>
      </div>
      <div className="flex items-end flex-grow overflow-hidden">
        <div className="ml-2">
          <div className="flex items-center gap-2 font-semibold">
            <div className="text-2xl">{value}</div>
            <div
              className="flex gap-1 items-center"
              css={{ color: isIncreasing ? "rgb(34,197,94)" : "rgb(239,68,68)" }}
            >
              <div className='text-sm'>{change}</div>
              {isIncreasing ? (
                <BsArrowUpCircle size={15} />
              ) : (
                <BsArrowDownCircle />
              )}
            </div>
          </div>
          <div className="text-gray-400 text-sm">compared to last month</div>
        </div>
        <div className="w-28 h-20 flex items-center justify-end">
          {isIncreasing ? <IncGraph /> : <DecGraph />}
        </div>
      </div>
    </div>
  );
}

export default DashCard
