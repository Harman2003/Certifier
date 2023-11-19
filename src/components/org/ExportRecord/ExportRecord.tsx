import { useState } from "react";
import ExportSvg from "@/assets/export.svg?react";
import { TextField } from "@mui/material";
import AsyncInput from "@/components/utils/AsyncInputEvents";
import { Button } from "@/components/ui/button";

const ExportRecord = () => {
  const [filename, setfileName] = useState<string>("");
  const [eventId, setEventId] = useState<string>("");
  return (
    <div className=" w-full h-[90vh] p-10 flex flex-col bg-slate-100">
      <div className="text-2xl font-Poppins font-bold md:text-4xl">
        Export Records
      </div>
      <div className="w-full flex justify-center flex-grow pt-10">
        <div className="w-2/3 h-full shadow-xl rounded-3xl bg-white flex">
          <div className="w-1/2 bg-blue-50/50 overflow-hidden flex flex-col items-center justify-center text-gray-500 font-Nunito">
            <ExportSvg className="h-[300px]" />
            <div>Export All Events Record</div>
            <div>
              <span className="text-blue-600 font-semibold cursor-pointer">
                Download
              </span>
            </div>
          </div>
          <div className="border-[1px] border-gray-100 relative">
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
              OR
            </div>
          </div>
          <div className="w-1/2 p-10 h-fit grid grid-cols-[1fr,2fr] gap-x-2 gap-y-6 my-auto items-center justify-between text-center text-gray-500">
            <div className="col-span-2 text-xl font-bold font-Nunito italic">
              Export One Event Record
            </div>

            <div>Name</div>
            <div>
              <TextField label="File Name" size="small" fullWidth value={filename} onChange={(e)=>setfileName(e.target.value)}/>
            </div>
            <div>Event ID</div>
            <div>
              <AsyncInput
                onValueChange={(eventId) => {
                  console.log(eventId);
                }}
              />
            </div>
            <Button className="col-span-2 bg-blue-700 hover:bg-blue-800">
              Export Certificates
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportRecord;
