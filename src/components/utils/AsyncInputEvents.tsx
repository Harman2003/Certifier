import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { MdMail } from "react-icons/md";
import useApiReceiver from "@/setup/hooks/api/useApiReceiver";

interface UserType {
  _id: string;
  name: string;
  eventId: string;
}

export default function AsyncInput({
  onValueChange,
}: {
  onValueChange: (eventId:string) => void;
}) {
  const [value, setValue] = useState<UserType | null>();
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
    if (data) {
      setOptions([...data]);
    }
  }, [data]);

  return (
    <Autocomplete
      id="event-list"
      size="small"
      filterOptions={(x) => x}
      options={options}
      autoComplete
      fullWidth
      isOptionEqualToValue={(option, value) => option.eventId === value.eventId}
      value={value}
      noOptionsText="Find By Event Name/ID"
      onChange={(event, newValues) => {
        // setValue([...newValues]);
        // onValueChange(newValues.map((item) => item.email));
      }}
      getOptionLabel={(option) => option.eventId}
      onInputChange={(e, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Event Name/ID" fullWidth />
      )}
      renderOption={(props, option) => {
        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: "flex", width: 44 }}>
                <MdMail />
              </Grid>
              <Grid
                item
                sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
              >
                <Box>{option.name}</Box>

                <Typography variant="body2" color="text.secondary">
                  {option.eventId}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
