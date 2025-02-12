import React from "react";
import DropArea from "./DropArea";
import Sidebar from "./Sidebar";
import { DndContext, useDroppable } from "@dnd-kit/core";

function Builder() {
  const droppable = useDroppable({
    id: "drop-area",
    data: {
      isDropArea: true,
    },
  });

  return (
    <DndContext>
      <div className="min-h-screen p-4 grid grid-cols-5 gap-3">
        <div className=" col-span-3">
          <DropArea />
        </div>
        <div className=" col-span-2">
          <Sidebar />
        </div>
      </div>
    </DndContext>
  );
}

export default Builder;
