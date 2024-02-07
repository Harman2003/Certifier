import Arrows from "@/assets/arrow.svg?react";
import Edit from "@/assets/edit.svg?react";
import Delete from "@/assets/delete.svg?react";
import Info from "@/assets/info.svg?react";
import { Link } from "react-router-dom";
import { durationFormatter } from "@/utils/durationFormatter";
import { dateFormatter } from "@/utils/dateFormatter";
import { EventProps } from "@/utils/sample";
import { Heading, HoverCard, Text } from "@radix-ui/themes";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useApiSender from "@/setup/hooks/api/useApiSender";
import { deleteEvent } from "@/webApi/deleteEvent";

interface EventCardProps{
  data: EventProps,
  refetch:()=>Promise<any>
}
const EventCard = ({data, refetch}: EventCardProps) => {
  const { image, name, type, duration, id, created, lastUpdated, description } = data;
  const { send, isLoading } = useApiSender(deleteEvent, true);
  const handleDelete = async () => {
    try {
      await send({ id: id });
      refetch();
    } catch (err) {
      
    }
  }
  return (
    <div className="w-[348px] bg-white shadow-md shadow-black/5 rounded-[20px]">
      <div className="relative rounded-t-[20px] h-[190px] p-2">
        <img
          src={`https://certify-events.s3.ap-south-1.amazonaws.com/${image}`}
          alt=""
          className="absolute top-0 left-0 w-full h-full rounded-t-[20px]"
        />
        
        <div className="relative z-10 flex justify-end">
          <div className="w-7 h-16 bg-white rounded-lg flex flex-col items-center justify-evenly">
            <Link to={`/org/events/edit/${id}`}>
              <Edit className="cursor-pointer" />
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="cursor-pointer">
                <Delete/>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this event and remove data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-green-500 hover:bg-green-600">
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-3 h-[188px]">
        <div className="flex items-center">
          <div className="bg-[#D9FFD6] text-[#19B000] text-sm font-semibold font-Nunito px-2 py-1 rounded-full">
            {type}
          </div>
          <div className="bg-[#ededed] text-[#828282] text-sm font-semibold font-Nunito px-2 py-1 ml-4 rounded-full">
            {durationFormatter(duration)}
          </div>
          <div className="ml-auto text-[#898989] text-sm">#{id}</div>
        </div>
        <div className="text-[#828282] text-sm font-semibold font-Nunito italic mt-2">
          {dateFormatter(created)}
        </div>
        {description ? (
          <HoverCard.Root>
            <HoverCard.Trigger>
              <div className="font-Poppins font-semibold text-lg mt-3 cursor-pointer">
                {name + "..."}
              </div>
            </HoverCard.Trigger>
            <HoverCard.Content>
              <Heading size="3" as="h3">
                Description
              </Heading>
              <Text as="div" size="2" style={{ maxWidth: 300 }}>
                {description}
              </Text>
            </HoverCard.Content>
          </HoverCard.Root>
        ) : (
          <div className="font-Poppins font-semibold text-lg mt-3 cursor-pointer">
            {name + "..."}
          </div>
        )}

        <div className="mt-auto flex justify-between items-end font-Nunito italic">
          <div className="text-[#828282] text-xs">
            <div className="font-semibold">Last Updated</div>
            <div>{dateFormatter(lastUpdated)}</div>
          </div>
          <Link to={"/org/certificates"}>
            <div className="text-[#624CF5] text-sm flex gap-1 items-center px-1">
              View Certificates
              <Arrows />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
