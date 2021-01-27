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
      title: "Orders",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    8954: {
      id: "8954",
      title: "Driver 8954",
      taskIds: [],
    },
    2342: {
      id: "2342",
      title: "Driver 2342",
      taskIds: [],
    },
  },

  columnOrder: ["column-1", "8954", "2342"],
};
export default Data;
