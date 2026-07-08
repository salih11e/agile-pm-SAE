import React, { useState } from "react";

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onCreate({ title });
    setTitle("");
  };

  return (
    <form onSubmit={submit} className="task-form">
      <input
        placeholder="Neuen Task eingeben..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Anlegen</button>
    </form>
  );
}
