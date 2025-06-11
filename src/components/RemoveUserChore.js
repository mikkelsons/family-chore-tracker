import { useState } from "react";
import Button from "./Button";

function RemoveUserChore({ family, chores, setChores, onClose }) {
  const [choreToDelete, setChoreToDelete] = useState("");
  const [familyMember, setFamilyMember] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const deletedChore = chores.find((chore) => chore.id === choreToDelete);

    setChores((prev) => prev.filter((chore) => deletedChore.id !== chore.id));
    onClose();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Which user's chore would you like to delete?
        <select
          name="familyMember"
          value={familyMember}
          onChange={(e) => setFamilyMember(e.target.value)}
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

      {familyMember && (
        <label>
          Which chore would you like to delete?
          <select
            name="chore"
            value={choreToDelete}
            onChange={(e) => setChoreToDelete(e.target.value)}
            required
          >
            <option value="" selected disabled hidden>
              Please select an option
            </option>
            {chores
              .filter((chore) => chore.assignedTo === familyMember)
              .map((chore) => (
                <option key={chore.id} value={chore.id}>
                  {chore.name}
                </option>
              ))}
          </select>
        </label>
      )}

      <div className="modal-actions">
        <Button type="button" onClick={onClose} className="button-delete">
          Cancel
        </Button>
        <Button type="submit" className="button-add">
          Submit
        </Button>
      </div>
    </form>
  );
}

export default RemoveUserChore;
