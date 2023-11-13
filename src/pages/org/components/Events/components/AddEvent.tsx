import Form from "../../../../../components/org/AddEventForm";
import useAuth from "@/setup/hooks/useAuth";
const AddEvent = () => {
  const { name, role } = useAuth();
  console.log(name, role)
  return (
    <div className=" w-full h-[90vh] flex flex-col">
      <div className="text-4xl font-bold m-5 mb-10">Add Events</div>
      <Form />
    </div>
  );
};

export default AddEvent;
