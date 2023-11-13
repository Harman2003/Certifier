import { useState } from "react";
import DataTableDemo from "@/pages/Table";
import sample, { Payment } from "@/utils/sample";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BasicDateRangePicker from "@/components/ui/DateRangePicker";
import BasicSelect from "@/components/ui/SingleSelect";
import event_types from "@/utils/eventTypes";
import InputRange, { Range } from "@/components/ui/InputRange";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { TextField } from "@mui/material";
import lastUpdate from "@/utils/lastUpdate";
import dayjs, { Dayjs } from "dayjs";
import { DateRange } from "@mui/x-date-pickers-pro";
import DurationFilter from "@/components/org/DurationFilter";

const Events = () => {
  const [data, setData] = useState<Payment[]>(sample);
  const [query, setQuery] = useState("");
  const [typefilter, setTypeFilter] = useState<(typeof event_types)[number]>(
    event_types[0]
  );
  const [date, setDate] = useState<DateRange<Dayjs>>([
    dayjs("2022-04-17"),
    dayjs("2022-04-21"),
  ]);
  const [cert_count, setCertCount] = useState<Range>({ min: "", max: "" });
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [durationType, setDurationType] = useState<string>("hours");
  const [durationValue, setDurationValue] = useState<number[]>([0, 24]);

  return (
    <div className=" w-full h-[90vh] p-10 overflow-y-auto">
      <DataTableDemo data={data}>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-0">
            <div className="flex items-center">
              <TextField
                label="Search By Event Name/ID"
                id="search-query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                size="small"
                className="w-[450px]"
              />
              <div className="ml-4 border-0 hidden h-8 lg:flex whitespace-nowrap shadow-none">
                <AccordionTrigger>
                  <MixerHorizontalIcon className="mr-2 h-4 w-4" />
                  More Filters
                </AccordionTrigger>
              </div>
            </div>
            <AccordionContent>
              <div className="w-[450px] grid grid-cols-[1fr,2fr] gap-4 mt-4 font-semibold">
                <div className="h-10 flex items-center">Event Type</div>
                <div className="h-10 flex items-center bg-">
                  <BasicSelect
                    type={typefilter}
                    setType={setTypeFilter}
                    data={event_types}
                  />
                </div>
                <div className="h-10 flex items-center">Created At</div>
                <div className="h-10 flex items-center">
                  <BasicDateRangePicker value={date} setValue={setDate} />
                </div>
                <div className="h-10 flex items-center">Certificate Count</div>
                <div className="h-10 flex items-center">
                  <InputRange range={cert_count} setrange={setCertCount} />
                </div>
                <div className="h-10 flex items-center">Last Updated</div>
                <div className="h-10 flex items-center">
                  <BasicSelect
                    type={lastUpdated}
                    setType={setLastUpdated}
                    data={lastUpdate.map((item) => item.tag)}
                  />
                </div>
                <div className="h-10 flex items-center">Duration</div>
                <div className="flex flex-col gap-8">
                  <DurationFilter
                    type={durationType}
                    setType={setDurationType}
                    value={durationValue}
                    setValue={setDurationValue}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DataTableDemo>
    </div>
  );
};

export default Events;
