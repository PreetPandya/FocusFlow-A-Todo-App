import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

const AddTodo = () => {
  const { register, handleSubmit, reset } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(addTodo(data));
    reset();
    document.getElementById("my_modal_1").close();
  };

  return (
    <>
      <div className=" grid grid-cols-1 place-items-center">
        <button
          className="btn btn-primary w-60 text-white"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Add Task
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h1 className="font-bold text-[30px]">Add a task</h1>
            <form
              className="card-body p-0 my-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g Study for the test"
                  className="input input-bordered"
                  {...register("title", { required: true })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description (optional)</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Description"
                  {...register("desc")}
                ></textarea>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  className="input input-bordered"
                  {...register("date", { required: true })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Set Priority</span>
                </label>
                <select
                  className="select select-bordered w-full max-w-xs"
                  {...register("priority", { required: true })}
                >
                  <option value="">Select priority level</option>
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="modal-action">
                <button
                  type="submit"
                  className="btn btn-primary mx-3 text-white"
                >
                  Add a task
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => document.getElementById("my_modal_1").close()}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default AddTodo;
