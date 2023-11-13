import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Select from "@mui/material/Select";
import event_types from "@/utils/eventTypes";
import AsyncInput from "@/components/org/AsyncInput";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { BsBoxArrowLeft as Arrow } from "react-icons/bs";
import { AiOutlineArrowLeft as BackIcon } from "react-icons/ai";
import { AiOutlineArrowRight as NextIcon } from "react-icons/ai";
import useAuth from "@/setup/hooks/useAuth";
import { useState } from "react";
import MultiStepProgressBar from "../common/ProgressBar";
import { toast } from "react-toastify";

const FormSchema = z.object({
  description: z.string(),
  name: z.string().min(2, {
    message: "Event name must be at least 2 characters.",
  }),
  type: z.string().min(1, {
    message: "Type must be defined",
  }),
  org: z.string().optional(),
  managers: z.array(z.string()),
  template: z.string(),
  duration: z.string().min(1, {
    message: "duration is required",
  }),
  durationType: z.string(),
});

export default function InputForm() {
  const [page, setPage] = useState<number>(1);
  const { name } = useAuth();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      type: "",
      managers: [],
      description: "",
      template: "",
      duration: "",
      durationType: "hours",
      org: name,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("came");
    console.log(data);
  }
  function checkErrors() {
    console.log(form.getValues());
    const { name, type, template } = form.getValues();
    if (!name || !type) {
      toast.error("Event : Name | Type | Template are required");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="self-center items-center flex flex-col h-full w-full"
      >
        <div className="w-[600px]">
          <MultiStepProgressBar page={page} onPageNumberClick={setPage} />
        </div>
        {
          {
            1: (
              <div className="w-[600px] mt-10 grid grid-cols-2 gap-5 items-center">
                <div className="col-span-2 w-full text-2xl font-semibold text-gray-600 text-center">
                  Enter few details about the event
                </div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <TextField
                        label="Event Name"
                        id="eventname"
                        value={field.value}
                        onChange={field.onChange}
                        size="medium"
                        className="w-full"
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <Box sx={{ minWidth: 120, width: "100%" }}>
                        <FormControl
                          sx={{ minWidth: 120, width: "100%" }}
                          size="medium"
                        >
                          <InputLabel id="demo-simple-select-label">
                            Event Type
                          </InputLabel>
                          <Select
                            defaultValue={field.value}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Event Type"
                            onChange={field.onChange}
                            size="medium"
                          >
                            {event_types.map((item, index) => (
                              <MenuItem key={"type" + index} value={item}>
                                {item}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="org"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <TextField
                        focused
                        value={name ? name : ""}
                        disabled
                        label="Organisation"
                        id="name"
                        onChange={field.onChange}
                        size="medium"
                        className="w-full"
                        sx={{
                          "& .MuiInput-underline:after": {
                            borderBottomColor: "white",
                          },

                          "& .MuiFilledInput-underline:after": {
                            borderBottomColor: "white",
                          },

                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "#9a9797",
                              borderWidth: "1px",
                            },
                          },
                        }}
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <TextField
                        size="medium"
                        label="Event Duration"
                        id="duration-label"
                        value={field.value}
                        onChange={field.onChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <FormField
                                control={form.control}
                                name="durationType"
                                render={({ field }) => (
                                  <FormItem className="col-span-1">
                                    <Select
                                      variant="standard"
                                      disableUnderline={true}
                                      defaultValue={"hours"}
                                      sx={{
                                        backgroundColor: "white",
                                      }}
                                      value={field.value}
                                      onChange={field.onChange}
                                    >
                                      <MenuItem value="hours">hours</MenuItem>
                                      <MenuItem value="days">days</MenuItem>
                                      <MenuItem value="months">months</MenuItem>
                                      <MenuItem value="years">years</MenuItem>
                                    </Select>
                                  </FormItem>
                                )}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="managers"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <AsyncInput
                        onValueChange={field.onChange}
                        list={field.value}
                      />
                    </FormItem>
                  )}
                />
              </div>
            ),
            2: (
              <div className="w-[600px] mt-10 grid grid-cols-2 gap-5 items-center">
                <div className="col-span-2 w-full text-2xl font-semibold text-gray-600 text-center">
                  Write few lines about your event
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <Textarea
                        id="eventdescription"
                        placeholder="This event is about ..."
                        onChange={field.onChange}
                        value={field.value}
                        className="min-h-[230px] text-md font-[400]"
                      />
                    </FormItem>
                  )}
                />
              </div>
            ),
            3: (
              <div className="w-[600px] mt-10 grid grid-cols-2 gap-5 items-center">
                <div className="col-span-2 w-full text-2xl font-semibold text-gray-600 text-center">
                  Choose one or more template for the certificates
                </div>
                <FormField
                  control={form.control}
                  name="template"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <Textarea
                        placeholder="This event is about ..."
                        value={field.value}
                        onChange={field.onChange}
                        className="min-h-[230px] text-md font-[400]"
                      />
                    </FormItem>
                  )}
                />
              </div>
            ),
          }[page]
        }
        <div className="w-[600px] flex justify-end gap-3 mt-5">
          {page !== 1 && (
            <Button
              type="button"
              className="bg-transparent border-[1px] border-blue-700 text-blue-700 font-semibold px-5 gap-3 hover:bg-gray-100"
              onClick={() => setPage((page) => page - 1)}
            >
              <BackIcon size={20} />
              <div>Prev</div>
            </Button>
          )}
          {page !== 3 && (
            <Button
              type="button"
              className="bg-transparent border-[1px] border-blue-700 text-blue-700 font-semibold px-5 gap-3 hover:bg-gray-100"
              onClick={() => setPage((page) => page + 1)}
            >
              <NextIcon size={20} />
              <div>Next</div>
            </Button>
          )}
        </div>
        <div className="shadow-2xl shadow-black h-[80px] w-full mt-auto flex items-center justify-between px-8">
          <Button
            type="submit"
            className="bg-transparent border-[1px] border-blue-700 text-blue-700 font-semibold px-5 gap-3 hover:bg-gray-100"
          >
            <Arrow size={20} />
            <div>Back</div>
          </Button>
          {page == 3 && (
          <Button
            type="submit"
            className="bg-blue-800 hover:bg-blue-950"
            onClick={() => checkErrors()}
          >
            Create New Event
          </Button>
          )} 
        </div>
      </form>
    </Form>
  );
}
