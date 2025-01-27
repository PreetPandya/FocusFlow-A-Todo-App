import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, editData } from "../features/todo/todoSlice";

const Todo = () => {
  const todos = useSelector((state) => state.todos); // Select todos from state
  const filter = useSelector((state) => state.filter); // Select filter from state
  const dispatch = useDispatch();

  const [editTask, setEditTask] = useState(null); // Track the task being edited
  const [showEditModal, setShowEditModal] = useState(false); // Control modal visibility

  // Format date for display
  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  // Get today's formatted date
  const timestamp = Date.now();
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = new Date(timestamp).toLocaleDateString(
    "en-GB",
    options
  );

  // Filter todos based on selected criteria
  const filteredData = () => {
    if (filter === "All") {
      return todos;
    } else if (filter === "Today") {
      return todos.filter((item) => formatDate(item.date) === formattedDate);
    } else {
      return todos.filter((item) => item.priority === filter);
    }
  };

  const filteredTodos = filteredData();

  // Handle opening the edit modal
  const handleEdit = (task) => {
    setEditTask(task);
    setShowEditModal(true);
  };

  // Handle saving the edited task
  const handleSaveEdit = (updatedTask) => {
    dispatch(editData(updatedTask));
    setShowEditModal(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 text-center my-5">
        {filteredTodos.length === 0 && <p>Nothing to show</p>}
      </div>
      <div className="m-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTodos.map((item) => (
          <div
            className="card bg-base-300 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 w-full"
            key={item.id}
          >
            <div className="card-body p-6">
              <h2 className="card-title text-xl font-bold mb-2">
                {item.title}
              </h2>
              <p className="text-base mb-4">{item.desc}</p>
              <div className="flex items-center justify-between text-sm mb-6">
                <span>{formatDate(item.date)}</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.priority === "High"
                      ? "bg-red-100 text-red-600"
                      : item.priority === "Moderate"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {item.priority}
                </span>
              </div>
              <div className="card-actions flex justify-end">
                <button
                  className="btn btn-primary text-white font-semibold px-4 py-2 rounded-lg shadow-md"
                  onClick={() => dispatch(removeTodo(item.id))}
                >
                  Completed
                </button>
                <button
                  className="btn btn-neutral text-white font-semibold px-4 py-2 rounded-lg shadow-md"
                  onClick={() => dispatch(removeTodo(item.id))}
                >
                  Delete
                </button>
                <button
                  className="btn btn-ghost "
                  onClick={() => handleEdit(item)} // Open edit modal
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}

        <div
          className="card bg-transparent w-full h-64 border-[2px] border-slate-700 border-dashed hover:cursor-pointer hover:bg-base-200"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          <div className="card-body justify-center m-auto">
            <h2 className="card-title">Add new task</h2>
          </div>
        </div>
        {/* Edit Task Modal */}
        {showEditModal && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            <dialog id="edit_modal" className="modal" open>
              <div className="modal-box bg-base-200">
                <h1 className="font-bold text-[30px]">Edit Task</h1>
                <form
                  className="card-body p-0 my-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveEdit(editTask);
                  }}
                >
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Title</span>
                    </label>
                    <input
                      type="text"
                      value={editTask.title}
                      className="input input-bordered"
                      onChange={(e) =>
                        setEditTask({ ...editTask, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Description</span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered"
                      value={editTask.desc}
                      onChange={(e) =>
                        setEditTask({ ...editTask, desc: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Date</span>
                    </label>
                    <input
                      type="date"
                      value={editTask.date}
                      className="input input-bordered"
                      onChange={(e) =>
                        setEditTask({ ...editTask, date: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Set Priority</span>
                    </label>
                    <select
                      value={editTask.priority}
                      className="select select-bordered"
                      onChange={(e) =>
                        setEditTask({ ...editTask, priority: e.target.value })
                      }
                    >
                      <option value="Low">Low</option>
                      <option value="Moderate">Moderate</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div className="modal-action">
                    <button
                      type="submit"
                      className="btn btn-primary text-white"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => setShowEditModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </dialog>
          </>
        )}
      </div>
    </>
  );
};

export default Todo;
