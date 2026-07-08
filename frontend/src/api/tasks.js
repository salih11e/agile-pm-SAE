import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export async function getTasks() {
  const res = await axios.get(`${BASE}/tasks`);
  return res.data;
}

export async function createTask(payload) {
  const res = await axios.post(`${BASE}/tasks`, payload);
  return res.data;
}

export async function updateTask(id, payload) {
  const res = await axios.put(`${BASE}/tasks/${id}`, payload);
  return res.data;
}

export async function deleteTask(id) {
  const res = await axios.delete(`${BASE}/tasks/${id}`);
  return res.data;
}
