import TextField from "@mui/material/TextField";
export interface Range {
  min: string;
  max: string;
}
interface InputRangeProps {
  range: Range;
  setrange: React.Dispatch<React.SetStateAction<Range>>;
}
const InputRange:React.FC<InputRangeProps>=({range, setrange})=>{
  return (
    <div className="flex items-center gap-4">
      <TextField
        label="From"
        id="outlined-size-small"
        value={range.min}
        onChange={(e) =>
          setrange((prev) => {
            return { ...prev, min: e.target.value };
          })
        }
        size="small"
      />
      <div className="border-t-[1px] border-black w-4" />
      <TextField
        label="To"
        id="outlined-size-small"
        value={range.max}
        onChange={(e) =>
          setrange((prev) => {
            return { ...prev, max: e.target.value };
          })
        }
        size="small"
      />
    </div>
  );
}

export default InputRange;