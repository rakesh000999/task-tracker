const TaskToolbar = function ({
  search,
  setSearch,
  filter,
  setFilter,
  sortBy,
  setSortBy
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mt-6">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks..."
        className="border rounded-lg px-4 py-2 w-full"
      />

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border rounded-lg px-4 py-2"
      >
        <option>All</option>
        <option>Pending</option>
        <option>Done</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border rounded-lg px-4 py-2"
      >
        <option value="date">Sort by Date</option>
        <option value="title">Sort by Title</option>
      </select>
    </div>
  );
};

export default TaskToolbar;
