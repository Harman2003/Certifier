import Form from "../../../utils/AddEventForm";
const AddEvent = () => {
  return (
    <div className=" w-full h-[90vh] flex flex-col">
      <div className="text-4xl font-bold m-5 mb-10">Add Events</div>
      <Form />
    </div>
  );
};

export default AddEvent;
