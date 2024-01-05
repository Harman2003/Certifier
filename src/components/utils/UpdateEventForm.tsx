import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Select, TextArea, TextField } from "@radix-ui/themes";
import event_types from "@/utils/eventTypes";
import AsyncInput from "@/components/utils/AsyncInputEmail";
import { BsBoxArrowLeft as Arrow } from "react-icons/bs";
import { AiOutlineArrowLeft as BackIcon } from "react-icons/ai";
import { AiOutlineArrowRight as NextIcon } from "react-icons/ai";
import useAuth from "@/setup/hooks/auth/useAuth";
import { useEffect, useLayoutEffect, useState } from "react";
import MultiStepProgressBar from "../common/ProgressBar";
import { useNavigate, useParams } from "react-router-dom";
import useApiSender from "@/setup/hooks/api/useApiSender";
import { SquareLoader } from "./contractLoader";
import useApiReceiver from "@/setup/hooks/api/useApiReceiver";
import ImageCard from "./ImageCard";
import { calcDuration } from "@/utils/calcDuration";
import { updateEvent } from "@/webApi/updateEvent";
import { calcDurationReverse } from "@/utils/calcDurationReverse";
import ImgLoader from "./ImgLoader";
import FormSkeletonLoader from "./FormSkeletonLoader";
const FormSchema = z.object({
  name: z.string(),
  type: z.string(),
  duration: z.string(),
  durationType: z.string(),
  org: z.string().optional(),
  description: z.string().optional(),
  managers: z.array(z.string()),
  templateId: z.string(),
  image: z.string(),
});

export default function UpdateEventForm() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { send, isLoading: isUpdating } = useApiSender(updateEvent, true);
  const { id } = useParams();
  const { data, isLoading } = useApiReceiver("/events", { search: id }, true);
  const eventData = data?.events[0];

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      type: "",
      duration: "",
      durationType: "hours",
      org: auth?.name,
      description: "",
      managers: [],
      templateId: "",
      image:''
    },
  });

  useEffect(() => {
    if (eventData) {
      const { name, type, duration, managers, description, template, image } = eventData;
      const { value, durationType } = calcDurationReverse(duration);
        form.setValue("name", name);
        form.setValue("type", type);
        form.setValue("duration", value);
        form.setValue("durationType", durationType);
        form.setValue("managers", managers);
        form.setValue("description", description);
        form.setValue("templateId", template);
        form.setValue("image", image);
    }
  }, [eventData]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setPage((prev) => prev + 1);
    try {
      await send({
        eventId:eventData.id,
        name: data.name,
        type: data.type,
        duration: data.duration,
        durationType:data.durationType,
        managers: data.managers,
        description: data.description,
        templateId: data.templateId,
        image: data.image,
      });
      navigate(-1);
    } catch (err) {
      console.log(err);
      setPage(1);
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
          {isLoading ? (
            <div className="w-[600px] h-[272px] flex flex-col gap-5 mt-10 justify-center items-center">
              <FormSkeletonLoader />
            </div>
          ) : (
            {
              1: (
                <div className="w-[600px] mt-5 grid grid-cols-2 gap-5 items-center">
                  <div className="col-span-2 w-full text-2xl font-semibold text-gray-600 text-center">
                    Enter few details about the event
                  </div>
                  <FormField
                    key={"eventName"}
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <TextField.Input
                          id="eventName"
                          size="3"
                          placeholder="Event Name"
                          value={field.value}
                          onChange={field.onChange}
                          style={{ paddingRight:8}}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <Select.Root
                          size="3"
                          defaultValue={field.value}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <Select.Trigger
                            className="w-full"
                            placeholder="Event Type"
                          />
                          <Select.Content position="popper">
                            {event_types.map((item) => (
                              <Select.Item key={item.id} value={item.value}>
                                {item.value}
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Root>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <TextField.Root className="flex items-center">
                          <TextField.Input
                            size="3"
                            placeholder="Event Duration"
                            defaultValue={field.value}
                            value={field.value}
                            onChange={field.onChange}
                            style={{ paddingRight: 20 }}
                          />
                          <FormField
                            control={form.control}
                            name="durationType"
                            render={({ field }) => (
                              <FormItem>
                                <Select.Root
                                  defaultValue={field.value}
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <Select.Trigger
                                    variant="ghost"
                                    className="relative right-4 top-[2px] focus:outline-none hover:bg-transparent"
                                  />
                                  <Select.Content>
                                    <Select.Item value="hours">
                                      hours
                                    </Select.Item>
                                    <Select.Item value="days">days</Select.Item>
                                    <Select.Item value="months">
                                      months
                                    </Select.Item>
                                  </Select.Content>
                                </Select.Root>
                              </FormItem>
                            )}
                          />
                        </TextField.Root>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="org"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <TextField.Input
                          size="3"
                          id="orgName"
                          placeholder="Organisation Name"
                          disabled
                          value={auth.name}
                          onChange={field.onChange}
                        />
                      </FormItem>
                    )}
                  />
                  {/* <FormField
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
                /> */}
                  <FormField
                    control={form.control}
                    key={"Event_Description"}
                    defaultValue=""
                    name="description"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <TextArea
                          placeholder="This event is about ..."
                          className="h-[100px]"
                          maxLength={200}
                          value={field.value}
                          onChange={field.onChange}
                          size={"3"}
                        />
                      </FormItem>
                    )}
                  />
                </div>
              ),
              2: (
                <div className="w-[600px] flex flex-col gap-5 mt-10 items-center">
                  <div className="col-span-2 text-2xl font-semibold text-gray-600 text-center">
                    Choose template for the certificates
                  </div>
                  <FormField
                    control={form.control}
                    key="Event_Template"
                    defaultValue=""
                    name="templateId"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <TextArea
                          placeholder="Not build yet"
                          className="h-[200px]"
                          size={"3"}
                          maxLength={200}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormItem>
                    )}
                  />
                </div>
              ),
              3: (
                <div className="w-[600px] flex flex-col gap-5 mt-10 items-center">
                  <div className="text-2xl font-semibold text-gray-600">
                    Upload Image Here
                  </div>
                  <FormField
                    control={form.control}
                    key="Event_Image"
                    defaultValue=""
                    name="image"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <ImageCard
                          isImage={field.value}
                          setIsImage={field.onChange}
                        />
                      </FormItem>
                    )}
                  />
                </div>
              ),
              4: (
                <div className="w-[600px] h-[272px] flex flex-col gap-5 mt-10 justify-center items-center">
                  <FormSkeletonLoader />
                </div>
              ),
            }[page]
          )}

          <div className="w-[600px] flex justify-end gap-3 mt-5">
            {page > 1 && page < 4 && (
              <Button
                type="button"
                className="bg-transparent border-[1px] border-green-500 text-green-700 font-semibold px-5 gap-3 hover:bg-gray-100"
                onClick={() => setPage((page) => page - 1)}
              >
                <BackIcon size={20} />
                <div>Prev</div>
              </Button>
            )}
            {page < 3 && (
              <Button
                type="button"
                className="bg-transparent border-[1px] border-green-500 text-green-700 font-semibold px-5 gap-3 hover:bg-gray-100"
                onClick={() => setPage((page) => page + 1)}
              >
                <NextIcon size={20} />
                <div>Next</div>
              </Button>
            )}
          </div>
          <div className="border-t-[1px] h-[80px] w-full mt-auto flex items-center justify-between px-8">
            <Button
              type="button"
              className="bg-transparent border-[1px] border-green-500 text-green-700 font-semibold px-5 gap-3 hover:bg-gray-100"
              onClick={() => navigate(-1)}
            >
              <Arrow size={20} />
              <div>Back</div>
            </Button>
            {page == 3 && (
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-600"
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Updating Event...
                  </>
                ) : (
                  "Update Event"
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    );
}
