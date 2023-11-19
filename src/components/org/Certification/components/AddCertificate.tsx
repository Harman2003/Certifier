import React, { useState } from "react";
import UploadSvg from "@/assets/upload.svg?react";
import { TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AsyncInput from "@/components/utils/AsyncInputEvents";
import { Button } from "@/components/ui/button";

const AddCertificate = () => {

  const [eventId, setEventId] = useState<string>("");
  return (
    <div className=" w-full h-[90vh] p-10 flex flex-col bg-slate-100">
      <div className="text-2xl font-Poppins font-bold md:text-4xl">
        Add Certificate
      </div>
      <div className="w-full flex justify-center flex-grow pt-10">
        <div className="w-2/3 h-full shadow-xl rounded-3xl bg-white flex">
          <div className="w-1/2 bg-blue-50/50 overflow-hidden flex flex-col items-center justify-center text-xl text-gray-500 font-Nunito">
            <UploadSvg className="h-[300px]" />
            <div>Drop your excel file here</div>
            <div>
              or <span className="text-blue-600 font-semibold">Browse</span>
            </div>
          </div>
          <div className="border-[1px] border-gray-100 relative">
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
              OR
            </div>
          </div>
          <div className="w-1/2 grid grid-cols-[1fr,2fr] p-10 gap-x-2 items-center justify-center text-center text-gray-500">
            <div className="col-span-2 text-xl font-bold font-Nunito italic">
              Add One New Certificate
            </div>
            <div>Name</div>
            <div>
              <TextField label="Holder Name" size="small" fullWidth />
            </div>
            <div>User ID</div>
            <div>
              <TextField label="Unique ID" size="small" fullWidth />
            </div>
            <div>Grade</div>
            <div>
              <TextField label="Grade" size="small" fullWidth />
            </div>
            <div>Created</div>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Creation Date"
                    slotProps={{ textField: { size: "small" } }}
                    sx={{ paddingTop: 0 }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div>Expiration</div>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Expiry Date"
                    slotProps={{ textField: { size: "small" } }}
                  />
                </DemoContainer>
              </LocalizationProvider>
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
              Create Certificate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCertificate;
