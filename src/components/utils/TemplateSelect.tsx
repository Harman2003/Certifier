import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import useApiReceiver from "@/setup/hooks/api/useApiReceiver";
import useAuth from "@/setup/hooks/auth/useAuth";
import Skeleton from "react-loading-skeleton";
import { tw } from "@/pages/templates/utils/tw";
interface TemplatesProps {
  _id: string;
  img: string;
}
const TemplateSelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const { auth } = useAuth();
  const [isDefault, setDefault] = useState<boolean>(false);
  const { data, isLoading } = useApiReceiver(
    "/template",
    { id: auth.id, isDefault: isDefault },
    false
  );
  const [templates, setTemplates] = useState<TemplatesProps[]>([]);

  useEffect(() => {
    if (data) {
      setTemplates([...data.templates]);
      console.log(data);
    }
  }, [data]);
  return (
    <div className="w-full h-[200px] p-3  bg-gray-100 rounded-2xl flex flex-col">
      <div className="flex justify-between mb-2 gap-3">
        <Input type="text" placeholder="Search Template" className="w-fit" />
        <Select
          defaultValue="default"
          onValueChange={(value) =>
            setDefault(value === "default" ? true : false)
          }
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Select Collection" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Collection</SelectLabel>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-3 overflow-x-auto w-full flex-1 templates">
        {isLoading ? (
          <>
            <Skeleton className="w-[264px] h-[120px]" />
            <Skeleton className="w-[264px] h-[120px]" />
          </>
        ) : templates.length == 0 ? (
          <>No Template Found</>
        ) : (
          templates.map(({ _id, img }, index) => (
            <div
              key={index}
              className={tw(
                "bg-transparent h-full w-[264px] rounded-lg relative overflow-hidden border",
                _id === value && "border-black"
              )}
              onClick={() =>onChange(_id)}
            >
              <img
                src={`https://s3.ap-south-1.amazonaws.com/certify.templates/${img}`}
                alt=""
                className="w-full absolute right-1/2 translate-x-1/2"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TemplateSelect;
