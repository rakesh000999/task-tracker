import { useEffect, useState } from "react";

const TaskForm = function ({ onSave, editingTask }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDueDate(editingTask.dueDate);
      setStatus(editingTask.status);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      id: editingTask?.id || Date.now(),
      title,
      dueDate,
      status
    });

    setTitle("");
    setDueDate("");
    setStatus("Pending");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow">
      <div className="grid md:grid-cols-3 gap-4">
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="border rounded-lg px-3 py-2"
        />
        <input
          type="date"
          required
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option>Pending</option>
          <option>Done</option>
        </select>
      </div>

      <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg">
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
