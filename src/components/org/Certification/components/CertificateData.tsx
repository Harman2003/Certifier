import { useState } from "react";
import CertificateTable from "./CertificateTable";
import { certificateSample, CertificatesProp } from "@/utils/sample";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Range } from "@/components/ui/InputRange";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { AiOutlineFileAdd as AddIcon } from "react-icons/ai";
// import { TextField } from "@mui/material";
import { TextField, Select } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import AsyncInput from "@/components/utils/AsyncInputEvents";

const CertificateData = () => {
  const [data, setData] = useState<CertificatesProp[]>(certificateSample);
  const [search, setSearch] = useState("");


  return (
    <div className=" w-full h-[90vh] overflow-y-auto">
      <div className="flex justify-between h-[120px] p-10 bg-slate-100">
        <div className="text-4xl font-Poppins font-bold">Certificates</div>
        <Link to={"/org/certificates/add"}>
          <Button className="gap-1 py-5 rounded-full bg-green-500 hover:bg-green-600">
            <AddIcon size={22} />
            <div>Create New Certificates</div>
          </Button>
        </Link>
      </div>
      <CertificateTable data={data}>
        <div className="flex gap-3 pr-3">
          <div className="flex-1">
            <TextField.Input
              id="eventName"
              size="3"
              placeholder="Search by Certificate ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Select.Root
              size={"3"}
              defaultValue={""}
              // onValueChange={field.onChange}
            >
              <Select.Trigger className="w-full" placeholder="Status" />
              <Select.Content position="popper">
                <Select.Item value="all">All</Select.Item>
                <Select.Item value="active">Active</Select.Item>
                <Select.Item value="revoked">Revoked</Select.Item>
                <Select.Item value="expired">Expired</Select.Item>
              </Select.Content>
            </Select.Root>
          </div>
          <div className="flex-1">
            <TextField.Input
              id="eventId"
              size="3"
              placeholder="Event ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        {/* <Accordion
          type="single"
          collapsible
          className="w-full"
          value={isfilterOpen}
        >
          <AccordionItem value="open" className="border-0">
            <div className="flex items-center">
              <TextField
                label="Search By Certificate ID / Holder Name"
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
                  className="bg-green-500 hover:bg-green-600 mx-3 col-span-2"
                  onClick={() => {
                    handleFilter();
                  }}
                >
                  Apply Filters
                </Button>
              )}
            </div>
            <AccordionContent>
              <div className="w-[38%] grid grid-cols-[1fr,2fr] gap-x-10 gap-y-4 mt-6 font-semibold">
                <div className="h-10 flex items-center">Certificate Status</div>
                <div className="h-10 flex items-center bg-">
                  <Box sx={{ minWidth: 120, width: "100%" }}>
                    <FormControl
                      sx={{ minWidth: 120, width: "100%" }}
                      size="small"
                    >
                      <InputLabel id="demo-simple-select-label">
                        Status
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Status"
                        onChange={(event: SelectChangeEvent) => {
                          setType(event.target.value as string);
                        }}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"active"}>Active</MenuItem>
                        <MenuItem value={"revoked"}>Revoked</MenuItem>
                        <MenuItem value={"expired"}>Expired</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                <div className="h-10 flex items-center">Event ID/Name</div>
                <div className="h-10 flex items-center">
                  <AsyncInput onValueChange={() => {}} />
                </div>

                {isfilterOpen == "open" && (
                  <div className="col-span-2 ml-auto">
                    <Button
                      className="bg-green-500 hover:bg-green-600 col-span-2"
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
        </Accordion> */}
      </CertificateTable>
    </div>
  );
};

export default CertificateData;
