import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { DateRange } from "@mui/x-date-pickers-pro";
import dayjs, { Dayjs } from "dayjs";

interface DateRangePickerProps{
  value: DateRange<Dayjs>
  setValue: React.Dispatch<React.SetStateAction<DateRange<dayjs.Dayjs>>>
}
const BasicDateRangePicker:React.FC<DateRangePickerProps>=({value, setValue})=>{
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateRangePicker"]}>
        <DateRangePicker
          value={value}
          onChange={(newValue) => setValue(newValue)}
          slotProps={{ textField: { size: "small" } }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default BasicDateRangePicker;