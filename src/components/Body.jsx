import { useState } from "react";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import TaskToolbar from "./TaskToolbar";
import taskList from "../utils/mockData";
import useDebounce from "../hooks/useDebounce";

const Body = function () {
    const [tasks, setTasks] = useState(taskList);
    const [editingTask, setEditingTask] = useState(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [sortBy, setSortBy] = useState("date");

    const debouncedSearch = useDebounce(search);

    const handleSave = (task) => {
        const exists = tasks.some((t) => t.id === task.id);

        setTasks(
            exists
                ? tasks.map((t) => (t.id === task.id ? task : t))
                : [...tasks, task]
        );

        setEditingTask(null);
    };

    const handleDelete = (id) => {
        setTasks(tasks.filter((t) => t.id !== id));
    };

    const toggleStatus = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id
                    ? {
                        ...task,
                        status: task.status === "Pending" ? "Done" : "Pending"
                    }
                    : task
            )
        );
    };

    const filteredTasks = tasks
        .filter((task) =>
            task.title.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
        .filter((task) =>
            filter === "All" ? true : task.status === filter
        )
        .sort((a, b) =>
            sortBy === "title"
                ? a.title.localeCompare(b.title)
                : new Date(a.dueDate) - new Date(b.dueDate)
        );

    return (
        <div className="max-w-4xl mx-auto p-6">
            <TaskForm onSave={handleSave} editingTask={editingTask} />

            <TaskToolbar
                search={search}
                setSearch={setSearch}
                filter={filter}
                setFilter={setFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />

            <div className="space-y-4 mt-6">
                {filteredTasks.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">
                        <p className="text-lg font-semibold">No tasks found</p>
                        <p className="text-sm">
                            Try adjusting your search or filter options.
                        </p>
                    </div>
                ) : (
                    filteredTasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onEdit={setEditingTask}
                            onDelete={handleDelete}
                            onToggleStatus={toggleStatus}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Body;
