import React, { useEffect, useState } from "react";
import { getTasks, createTask } from "./api/tasks";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data || []);
    } catch (err) {
      console.error("Fehler beim Laden der Tasks", err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container">
      <h1>Agile PM — Tasks</h1>
      <TaskForm
        onCreate={async (payload) => {
          await createTask(payload);
          await load();
        }}
      />
      {loading ? <p>Lädt...</p> : <TaskList tasks={tasks} onChange={load} />}
    </div>
  );
}
