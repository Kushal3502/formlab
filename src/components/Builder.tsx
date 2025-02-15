import DropArea from "./DropArea";
import Preview from "./Preview";

function Builder() {
  return (
    <div className=" p-4 gap-3 ">
      <div className=" h-[80vh] overflow-auto border rounded-lg shadow-md p-4">
        <DropArea />
      </div>
      {/* <div className=" h-[75vh] overflow-auto border rounded-lg shadow-md p-4">
        <Preview />
      </div> */}
    </div>
  );
}

export default Builder;
