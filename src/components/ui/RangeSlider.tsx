import * as React from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

function valuetext(value: number) {
  return `${value}hr`;
}

export default function RangeSlider({
  value,
  setValue,
  max,
}: {
  value: number[];
  setValue: React.Dispatch<React.SetStateAction<number[]>>;
  max: number;
}) {
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  const CustomSlider = styled(Slider)(({ theme }) => ({
    "& .MuiSlider-valueLabel": {
      fontSize: 12,
      fontWeight: "normal",
      top: -4,
      backgroundColor: "#efe8e8",
      color: "black",
      "&:before": {
        display: "none",
      },
    },
  }));

  return (
    <Box className="w-full px-2">
      <Slider
        min={1}
        max={max}
        size={"small"}
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
        sx={{
          "& .MuiSlider-valueLabel": {
            color: "black",
             backgroundColor: "#efe8e8",
          },
        }}
      />
    </Box>
  );
}
