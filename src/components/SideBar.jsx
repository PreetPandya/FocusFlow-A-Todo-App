import React from "react";
import { useDispatch } from "react-redux";
import { deleteAllData } from "../features/todo/todoSlice";
import { filterData } from "../features/todo/todoSlice";
import { useEffect } from "react";

const SideBar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterData("All"));
  }, []);

  const handleClick = () => {
    document.getElementById("my-drawer").checked = false;
    document.getElementById("my_modal_1").showModal();
  };

  const handleDeleteAllData = () => {
    document.getElementById("my-drawer").checked = false;
    document.getElementById("my_modal_2").showModal();
  };

  const handleConfirmDelete = () => {
    dispatch(deleteAllData());
    document.getElementById("my_modal_2").close(); // Close modal after delete
  };

  return (
    <div>
      <div className="drawer z-50">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer"
            className="btn swap swap-rotate fixed top-4 left-4"
          >
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" />

            {/* hamburger icon */}
            <svg
              className="swap-off fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>

            {/* close icon */}
            <svg
              className="swap-on fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 py-16 gap-5 text-[18px]">
            {/* Sidebar content here */}
            <li>
              <h1 className="text-3xl m-auto font-semibold">FocusFlow</h1>
            </li>
            <li>
              <button
                className="btn btn-primary text-white"
                onClick={() => handleClick()}
              >
                Add a task
              </button>
            </li>
            <li>
              <a onClick={() => dispatch(filterData("All"))}>All tasks</a>
            </li>
            <li>
              <a onClick={() => dispatch(filterData("Today"))}>Today's tasks</a>
            </li>

            <li>
              <a onClick={() => dispatch(filterData("High"))}>
                High priority tasks
              </a>
            </li>
            <li>
              <a onClick={() => dispatch(filterData("Moderate"))}>
                Moderate priority tasks
              </a>
            </li>
            <li>
              <a onClick={() => dispatch(filterData("Low"))}>
                Low priority tasks
              </a>
            </li>
            <li>
              <button
                className="btn btn-ghost"
                onClick={() => handleDeleteAllData()}
              >
                Delete all data
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <p className="py-4">All data will be deleted permanently.</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-ghost mx-2">Cancel</button>
              <button
                className="btn btn-primary text-white"
                onClick={handleConfirmDelete} // Use the function here
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SideBar;
