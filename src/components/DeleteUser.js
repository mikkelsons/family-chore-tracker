import { useEffect, useState } from "react";
import Button from "./Button";

function DeleteUser({ family, onSetFamily, onClose, setChores, currentUser }) {
  const [userToDelete, setUserToDelete] = useState("");
  const [error, setError] = useState("");

  useEffect(
    function () {
      setError("");
    },
    [userToDelete]
  );

  function handleSubmit(e) {
    e.preventDefault();
    console.log(currentUser);
    const user = family.find((member) => member.name === userToDelete);
    if (!user) {
      setError("Please select a valid user to delete.");
      return;
    }
    if (currentUser && currentUser.id === user.id) {
      setError("You can't delete yourself.");
      return;
    }
    // Remove chores assigned to the user
    setChores((prev) => prev.filter((chore) => chore.assignedTo !== user.name));
    // Remove the user
    onSetFamily((previous) =>
      previous.filter((member) => member.id !== user.id)
    );
    setUserToDelete(""); // Reset selection
    onClose();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Which user would you like to delete?
        <select
          name="familyMember"
          value={userToDelete}
          onChange={(e) => setUserToDelete(e.target.value)}
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
      {error && <p className="error">{error}</p>}
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

export default DeleteUser;
