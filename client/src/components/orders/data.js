const Data = {
  tasks: {
    "task-1": { id: "task-1", content: "i am task-1" },
    "task-2": { id: "task-2", content: "i am task-2" },
    "task-3": { id: "task-3", content: "i am task-3" },
    "task-4": { id: "task-4", content: "i am task-4" },
  },

  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    "column-2": {
      id: "column-2",
      title: "In progress",
      taskIds: [],
    },
  },

  columnOrder: ["column-1", "column-2"],
};
export default Data;
