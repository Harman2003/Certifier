import AddEventForm from "../../../utils/AddEventForm";
const AddEvent = () => {
  return (
    <div className=" w-full h-[91vh] flex flex-col">
      <div className="text-4xl font-bold m-5 mb-10">Add Events</div>
      <AddEventForm />
    </div>
  );
};

export default AddEvent;
