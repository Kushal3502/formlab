import React from "react";
import PreviewButton from "./PreviewButton";
import SaveButton from "./SaveButton";
import PublishButton from "./PublishButton";

function Sidebar() {
  return (
    <div className=" border p-3 h-full rounded-xl flex flex-col ">
      <div className=" flex flex-col items-start">
        <h4>Title</h4>
        <div className=" flex justify-center items-center gap-2">
          <PreviewButton />
          <SaveButton />
          <PublishButton />
        </div>
      </div>
      Sidebar
    </div>
  );
}

export default Sidebar;
