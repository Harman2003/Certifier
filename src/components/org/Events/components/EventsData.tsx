import { useLayoutEffect, useState } from "react";
import EventTable from "@/components/org/Events/components/EventTable";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import event_types from "@/utils/eventTypes";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { AiOutlineFileAdd as AddIcon } from "react-icons/ai";
import { TextField } from "@radix-ui/themes";
import lastUpdate from "@/utils/lastUpdate";
import { Link } from "react-router-dom";
import { Select } from "@radix-ui/themes";
import EventCard from "@/components/utils/EventCard";
import useApiReceiver from "@/setup/hooks/api/useApiReceiver";
import { EventProps } from "@/utils/sample";
import EventLoader from "@/components/utils/EventLoader";

const Events = () => {
  const [search, setSearch] = useState("");
  const [isfilterOpen, setfilterOpen] = useState<string>("close");
  const [type, setType] = useState<string>("");
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [data, setData] = useState<EventProps[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [limit, setLimit] = useState<string>("1000");
  const [totalPages, setTotalPages] = useState<number>(1);

  const {
    data: eventData,
    isLoading,
    status,
    receive,
  } = useApiReceiver(
    "/events",
    { search, type, lastUpdated, sortBy, pageNumber, limit },
    true
  );

  useLayoutEffect(() => {
    if (eventData) {
      const reqEventData: EventProps[] = eventData.events.map((object: any) => {
        return {
          id: object.id,
          name: object.name,
          type: object.type,
          description: object.description,
          duration: object.duration,
          created: object.createdAt,
          lastUpdated: object.updatedAt,
          count: object.certificates,
          image: object.image,
        };
      });
      setData(reqEventData);
      setTotalPages(eventData.total);
    }
  }, [eventData]);

  return (
    <div className="w-full h-[90vh] overflow-y-auto">
      <div className="flex justify-between h-[120px] p-10 bg-slate-100">
        <div className="text-4xl font-Poppins font-bold">Events</div>
        <Link to={"/org/events/add"}>
          <Button className="bg-green-500 gap-1 py-5 rounded-full hover:bg-green-600">
            <AddIcon size={22} />
            <div>Add New Event</div>
          </Button>
        </Link>
      </div>
      <div className="py-10 px-20">
        <div className=" flex gap-3 mb-6">
          <div className="flex-1">
            <TextField.Input
              className="w-full"
              id="search_query"
              size="3"
              placeholder="Search By Event Name or ID"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="flex-1">
            <Select.Root
              size={"3"}
              defaultValue={type}
              onValueChange={(value) => setType(value)}
            >
              <Select.Trigger className="w-full" placeholder="Event Type" />
              <Select.Content position="popper">
                {event_types.map((item) => (
                  <Select.Item key={item.id} value={item.value}>
                    {item.value}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </div>
          <div className="flex-1">
            <Select.Root
              size={"3"}
              defaultValue={lastUpdated}
              onValueChange={(value) => setLastUpdated(value)}
            >
              <Select.Trigger className="w-full" placeholder="Last Updated" />
              <Select.Content position="popper">
                {lastUpdate.map((item) => (
                  <Select.Item key={item.id} value={`${item.value}`}>
                    {item.tag}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </div>
          <div className="flex-1">
            <Select.Root
              size={"3"}
              defaultValue={sortBy}
              onValueChange={(value) => setSortBy(value)}
            >
              <Select.Trigger className="w-full" placeholder="Sort By" />
              <Select.Content position="popper">
                <Select.Item value="none">...</Select.Item>
                <Select.Item value="name">Name</Select.Item>
                <Select.Item value="update">Last Updated</Select.Item>
                <Select.Item value="count">Certificates</Select.Item>
              </Select.Content>
            </Select.Root>
          </div>
        </div>
        <div className="w-full">
          {isLoading ? (
            <div className="flex flex-wrap gap-8">
              <EventLoader/>
              <EventLoader/>
              <EventLoader/>
            </div>
          ) : (
            <div className="flex flex-wrap gap-8">
              {data?.length > 0 ? (
                data.map((card) => (
                  <EventCard
                    key={card.id}
                    data={{
                      name: card.name,
                      type: card.type,
                      id: card.id,
                      created: card.created,
                      lastUpdated: card.lastUpdated,
                      duration: card.duration,
                      description: card.description,
                      image: card.image,
                      count: card.count,
                    }}
                    refetch={receive}
                  />
                ))
              ) : (
                <div className="w-full flex justify-center mt-10 text-3xl font-semibold font-Montserrat text-gray-400">
                  No Event Found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
