import noProjectImage from "../assets/no-projects.png";
import Button from "./Button";

export default function NoProjectSelected({ onStartAddProject }) {
  return (
    <div className="mt-34 text-center w-2/3 my-16">
      <img
        src={noProjectImage}
        alt="an empty task list"
        className="w-16 h-16 object-contain mx-auto"
      />
      <h2 className="text-stone-500 my-4 font-bold text-xl">
        No project selected
      </h2>
      <p className="text-stone-400 mb-4">
        Please select a project or start a new one.
      </p>
      
      <p>
        <Button onClick={onStartAddProject} label="Create a new project" />
      </p>
    </div>
  );
}
