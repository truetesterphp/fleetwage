// src/components/DriverTable.js

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  useDraggable,
  useDroppable
} from "@dnd-kit/core";

// Draggable Driver Box
function DraggableDriver({ id, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    cursor: "grab"
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="driver-box routes-box"
    >
      {children}
    </div>
  );
}

// Droppable Table Cell
function DroppableCell({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <td
      ref={setNodeRef}
      style={{
        backgroundColor: isOver ? "#f0f8ff" : undefined,
        padding: "10px",
        minHeight: "80px",
        border: "1px solid #ccc",
        width: "200px",
        verticalAlign: "top"
      }}
    >
      {children}
    </td>
  );
}

// Main Component
export default function DriverTable() {
  const [drivers, setDrivers] = useState([
    { id: "driver-1", name: "Courtney Henry" },
    { id: "driver-2", name: "Floyd Miles" }
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      console.log("Drag from:", active.id, "to", over.id);
      // Logic to update driver column (e.g., move between cells)
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Standby</th>
            <th>Assigned</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <DroppableCell id="standby">
              {drivers.map((driver) => (
                <DraggableDriver key={driver.id} id={driver.id}>
                  <div className="routes-box-content">
                    <h6>{driver.name}</h6>
                    <span>Driver</span>
                  </div>
                </DraggableDriver>
              ))}
            </DroppableCell>

            <DroppableCell id="assigned">
              {/* Add logic to move drivers here */}
            </DroppableCell>
          </tr>
        </tbody>
      </table>
    </DndContext>
  );
}
