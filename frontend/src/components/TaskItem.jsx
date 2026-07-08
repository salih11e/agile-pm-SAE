import React, { useState } from "react";
import { updateTask, deleteTask } from "../api/tasks";

export default function TaskItem({ task, onChange }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title || "");

  const save = async () => {
    await updateTask(task.id, { ...task, title });
    setEditing(false);
    onChange();
  };

  const remove = async () => {
    if (!confirm("Task löschen?")) return;
    await deleteTask(task.id);
    onChange();
  };

  return (
    <li className="task-item">
      {editing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <button onClick={save}>Speichern</button>
          <button onClick={() => setEditing(false)}>Abbrechen</button>
        </>
      ) : (
        <>
          <span>{task.title}</span>
          <div className="actions">
            <button onClick={() => setEditing(true)}>Bearbeiten</button>
            <button onClick={remove}>Löschen</button>
          </div>
        </>
      )}
    </li>
  );
}
