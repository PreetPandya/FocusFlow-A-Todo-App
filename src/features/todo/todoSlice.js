import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    {
      id: nanoid(),
      title: "Schedule Dentist Appointment",
      desc: "Call the dentist office to book an appointment for a checkup.",
      date: "2024-11-29",
      priority: "Moderate",
      completed: false,
    },
    {
      id: nanoid(),
      title: "Clean Bedroom",
      desc: "Tidy up and organize the bedroom.",
      date: "2024-11-30",
      priority: "Low",
      completed: false,
    },
  ],
  filter: "",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const { title, desc, date, priority } = action.payload;
      const todo = {
        id: nanoid(),
        title,
        desc,
        date,
        priority,
      };
      state.todos.push(todo);
    },

    removeTodo: (state, action) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    deleteAllData: (state) => {
      state.todos = [];
    },
    editData: (state, action) => {
      const { id, title, desc, date, priority } = action.payload; // Get edited data
      const taskIndex = state.todos.findIndex((item) => item.id === id); // Find the task by ID
      if (taskIndex !== -1) {
        state.todos[taskIndex] = { id, title, desc, date, priority }; // Replace task
      }
    },

    filterData: (state, action) => {
      state.filter = action.payload;
      document.getElementById("my-drawer").checked = false;
    },
  },
});

export const { addTodo, removeTodo, deleteAllData, filterData, editData } =
  todoSlice.actions;

export default todoSlice.reducer;
