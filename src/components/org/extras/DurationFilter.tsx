import React, { useEffect, useState } from "react";
import BasicSelect from "../../ui/SingleSelect";
import RangeSlider from "../../ui/RangeSlider";

interface SelectProps {
  hours: number;
  days: number;
  months: number;
  years: number;
}
interface DurationFilterProps {
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  value: number[];
  setValue: React.Dispatch<React.SetStateAction<number[]>>;
}
const DurationFilter: React.FC<DurationFilterProps> = ({
  type,
  setType,
  value,
  setValue,
}) => {
  const select: SelectProps = {
    hours: 24,
    days: 30,
    months: 12,
    years: 5,
  };

  const [max, setmax] = useState<number>(24);

  useEffect(() => {
      setmax(select[type as keyof SelectProps]);
      setValue([0, select[type as keyof SelectProps]]);
  }, [type]);

  return (
    <>
      <BasicSelect
        type={type}
        setType={setType}
        data={["hours", "days", "months", "years"]}
      />
          <RangeSlider value={value} setValue={setValue} max={max} />
    </>
  );
};

export default DurationFilter;
