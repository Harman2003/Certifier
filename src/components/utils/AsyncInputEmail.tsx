import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { MdMail } from "react-icons/md";
import useApiReceiver from "@/hooks/useApiReceiver";

interface UserType {
  _id: string;
  name: string;
  email: string;
}

export default function AsyncInput({
  onValueChange,
  list
}: {
    onValueChange: (managers: string[]) => void;
  list:string[]
}) {
  const [value, setValue] = useState<UserType[]>(
    list ? list.map((email) => ({ _id: "", name: "", email: email })) : []
  );
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<readonly UserType[]>([]);

  const { data, receive } = useApiReceiver(
    "/org/get_managers",
    { search: inputValue },
    true
  );

  useEffect(() => {
    receive();
  }, [inputValue]);
  useEffect(() => {
    console.log(data);
    if (data) {
      setOptions([
        ...data?.filter(
          (item: UserType) => !value.some((val) => val.email === item.email)
        ),
      ]);
    }
  }, [data]);

  return (
    <Autocomplete
      multiple
      id="manager-emails"
      sx={{
        width: "100%",
        "& .MuiInputBase-input": {
          height: "20px",
        },
      }}
      ListboxProps={{
        style: {
          maxHeight: "200px",
        },
      }}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      // includeInputInList
      // filterSelectedOptions
      // isOptionEqualToValue={(option:UserType, value:UserType)=>option===value}
      value={value}
      noOptionsText="find by email"
      onChange={(event, newValues: UserType[]) => {
        setValue([...newValues]);
        onValueChange(newValues.map((item) => item.email));
      }}
      getOptionLabel={(option) => option.email}
      onInputChange={(e, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Event manager emails ..." fullWidth />
      )}
      renderOption={(props, option) => {
        return (
          <li {...props}>
            <Grid container alignItems="center" >
              <Grid item sx={{ display: "flex", width: 44, height:20 }}>
                <MdMail />
              </Grid>
              <Grid
                item
                sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
              >
                <Box sx={{fontSize:'14px'}}>{option.name}</Box>

                <Typography variant="body2" color="text.secondary" sx={{fontSize:'12px'}}>
                  {option.email}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
