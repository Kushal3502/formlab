import DropArea from "./DropArea";

function Builder() {
  return (
    <div className=" py-2 gap-3 ">
      <div className=" h-[78vh] overflow-auto border rounded-lg shadow-md p-4">
        <DropArea />
      </div>
    </div>
  );
}

export default Builder;
