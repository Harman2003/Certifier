import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface BasicSelectProps{
  type:string,
  setType:React.Dispatch<React.SetStateAction<string>>,
  data:string[]
}
const BasicSelect:React.FC<BasicSelectProps>=({type, setType, data})=> {

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120, width:"100%" }}>
      <FormControl sx={{minWidth: 120, width:"100%" }} size="small">
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Age"
          onChange={handleChange}
        >
          {data.map((item, index) => (
            <MenuItem key={"type"+index} value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default BasicSelect;
