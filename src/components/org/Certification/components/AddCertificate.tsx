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
    <div className="font-Nunito w-full h-screen p-10 flex flex-col bg-slate-100">
      <div className="text-2xl font-Poppins font-bold md:text-4xl">
        Add Certificate
      </div>
      <div className="w-full flex justify-center flex-grow pt-10">
        <div className="w-2/3 h-[90%] shadow-xl rounded-3xl bg-white flex">
          <div className="w-1/2 bg-blue-50/50 overflow-hidden flex flex-col items-center justify-center text-xl text-gray-500 font-Nunito">
            <UploadSvg className="h-[300px]" />
            <div>Drop your excel file here</div>
            <div>
              or <span className="text-green-500 font-semibold">Browse</span>
            </div>
          </div>
          <div className="border-[1px] border-gray-100 relative">
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
              OR
            </div>
          </div>
          <div className="w-1/2 flex flex-col px-20 items-center justify-center text-center text-gray-500">
            
            {/* <div>Name</div> */}
           
              <TextField label="Name" size="small" fullWidth required margin="dense"/>
            
            {/* <div>Email</div> */}
          
              <TextField label="Email" size="small" fullWidth margin="dense"/>
            
            {/* <div>User ID</div> */}
            
              <TextField label="User ID" size="small" fullWidth margin="dense"/>
          
            {/* <div>Grade</div> */}
            
              <TextField label="Grade" size="small" fullWidth margin="dense"/>
            
            {/* <div>Created</div> */}
            
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]} sx={{width:'100%'}}>
                  <DatePicker
                    label="Creation Date"
                    slotProps={{ textField: { size: "small", fullWidth:true, required:true, margin:"dense" } }}
                  />
                </DemoContainer>
              </LocalizationProvider>
        
            {/* <div>Expiration</div> */}
            <div className="w-full mt-1">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]} sx={{width:'100%'}}>
                  <DatePicker
                    label="Expiry Date"
                    slotProps={{ textField: { size: "small" , fullWidth:true, margin:"dense"} }}
                  />
                </DemoContainer>
              </LocalizationProvider>
      </div>
            {/* <div>Event ID</div> */}
             <div className="w-full my-4">
              <AsyncInput
                onValueChange={(eventId) => {
                  console.log(eventId);
                }}
              />
           </div>
            <Button className="w-full bg-green-500 hover:bg-green-600">
              Create New Certificate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCertificate;
