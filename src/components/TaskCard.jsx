const TaskCard = function ({ task, onEdit, onDelete, onToggleStatus }) {
    return (
        <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <div>
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-500">{task.dueDate}</p>
                <span
                    className={`text-xs px-2 py-1 rounded-full ${task.status === "Done"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                        }`}
                >
                    {task.status}
                </span>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => onToggleStatus(task.id)}
                    className={`px-3 py-1 rounded text-sm ${task.status === "Pending"
                        ? "bg-green-600 text-white"
                        : "bg-yellow-500 text-white"
                        }`}
                >
                    {task.status === "Pending" ? "Mark Done" : "Mark Pending"}
                </button>

                <button
                    onClick={() => onEdit(task)}
                    className="text-blue-600 hover:underline"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    className="text-red-600 hover:underline"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
