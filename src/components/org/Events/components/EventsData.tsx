import { useState } from "react";
import EventTable from "@/components/org/Events/components/EventTable";
import sample, { EventProps } from "@/utils/sample";
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
import { AiOutlineFileAdd as AddIcon } from "react-icons/ai";
import { TextField } from "@mui/material";
import lastUpdate from "@/utils/lastUpdate";
import dayjs, { Dayjs } from "dayjs";
import { DateRange } from "@mui/x-date-pickers-pro";
import DurationFilter from "@/components/utils/DurationFilter";
import { Link } from "react-router-dom";

const Events = () => {
  const [data, setData] = useState<EventProps[]>(sample);
  const [query, setQuery] = useState("");
  const [isfilterOpen, setfilterOpen] = useState<string>("close");
  const [type, setType] = useState<(typeof event_types)[number]>(
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

  function handleFilter() {
    setfilterOpen("close");
  }

  return (
    <div className="w-full h-[90vh] p-10 overflow-y-auto">
      <div className="flex justify-between items-end mb-10">
        <div className="text-4xl font-Poppins font-bold">Events</div>
        <Link to={'/org/events/add'}>
          <Button className="bg-blue-700 gap-1 py-5 rounded-full hover:bg-blue-800">
            <AddIcon size={22} />
            <div>Add New Event</div>
          </Button>
        </Link>
      </div>
      <EventTable data={data}>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          value={isfilterOpen}
        >
          <AccordionItem value="open" className="border-0">
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
                <AccordionTrigger
                  onClick={() =>
                    setfilterOpen((prev) => (prev == "open" ? "close" : "open"))
                  }
                >
                  <MixerHorizontalIcon className="mr-2 h-4 w-4" />
                  More
                </AccordionTrigger>
              </div>
              {isfilterOpen == "close" && (
                <Button
                  className="bg-blue-700 hover:bg-blue-800 mx-3 col-span-2"
                  onClick={() => {
                    handleFilter();
                  }}
                >
                  Apply Filters
                </Button>
              )}
            </div>
            <AccordionContent>
              <div className="w-[60%] grid grid-cols-[1fr,4fr,1fr,4fr] gap-x-10 gap-y-4 mt-6 font-semibold">
                <div className="h-10 flex items-center">Event Type</div>
                <div className="h-10 flex items-center bg-">
                  <BasicSelect
                    type={type}
                    setType={setType}
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
                <div className="flex flex-col gap-8 col-span-3">
                  <DurationFilter
                    type={durationType}
                    setType={setDurationType}
                    value={durationValue}
                    setValue={setDurationValue}
                  />
                </div>
                {isfilterOpen == "open" && (
                  <div className="col-span-4 ml-auto">
                    <Button
                      className="bg-blue-700 hover:bg-blue-800 mx-3 col-span-2"
                      onClick={() => {
                        handleFilter();
                      }}
                    >
                      Apply Filters
                    </Button>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </EventTable>
    </div>
  );
};

export default Events;
