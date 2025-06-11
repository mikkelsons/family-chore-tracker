import { useState } from "react";

import Button from "./Button";
import { chores as choreTemplates } from "./Data";

function NewChore({ family, onAddChore, onClose }) {
  const [choreType, setChoreType] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [points, setPoints] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const template = choreTemplates.find((chore) => chore.name === choreType);
    const newChore = {
      id: crypto.randomUUID(),
      name: choreType,
      assignedTo,
      status: "To Do",
      points: Number(points),
      image: template.image,
    };
    onAddChore(newChore);
    onClose();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Chore Type:
        <select
          name="choreName"
          value={choreType}
          onChange={(e) => setChoreType(e.target.value)}
          required
        >
          <option value="" selected disabled hidden>
            Please select an option
          </option>
          {choreTemplates.map((chore) => (
            <option key={chore.id} value={chore.name}>
              {chore.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Assigned To:
        <select
          name="assignedTo"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
        >
          <option value="" selected disabled hidden>
            Please select an option
          </option>
          {family.map((member) => (
            <option key={member.id} value={member.name}>
              {member.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Worth how many points:
        <input
          type="number"
          name="points"
          value={points}
          min="0"
          max="50"
          onChange={(e) => setPoints(e.target.value)}
          required
        ></input>
      </label>
      <div className="modal-actions">
        <Button type="button" onClick={onClose} className="button-delete">
          Cancel
        </Button>
        <Button type="submit" className="button-add">
          Add Chore
        </Button>
      </div>
    </form>
  );
}

export default NewChore;
