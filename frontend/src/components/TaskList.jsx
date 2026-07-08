import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks = [], onChange }) {
  if (!tasks.length) return <p>Keine Tasks gefunden.</p>;
  return (
    <ul className="task-list">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onChange={onChange} />
      ))}
    </ul>
  );
}
