import { useRef } from "react";
import Input from "./Input";
import Model from "./Model";

export default function NewProject({ onAdd, onCancel }) {
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();
  const model = useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    // Validation for empty fields
    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      model.current.open(); // Open the modal if validation fails
      return;
    }

    // If inputs are valid, call onAdd with the project data
    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  }

  return (
    <>
      <Model ref={model} buttonCaption="Okay">
        <h2 className="text-stone-700 my-4 font-bold text-xl">Invalid Input</h2>
        <p className="text-stone-600 mb-4">
          Oops... it looks like you forgot to enter something.
        </p>
        <p className="text-stone-600 mb-4">
          Please make suer that you have entered all fields.
        </p>
      </Model>
      <div className="w-[35rem] mt-16">
        <menu className="flex gap-4 justify-end items-center my-4">
          <li>
            <button
              className="text-stone-600 hover:text-stone-950"
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-stone-800 hover:bg-stone-950 rounded-md text-stone-50"
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" ref={title} label="Title" />
          <Input ref={description} label="Description" textarea />
          <Input type="date" ref={dueDate} label="Due Date" />
        </div>
      </div>
    </>
  );
}
