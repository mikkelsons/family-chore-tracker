import { useState } from "react";
import Button from "./Button";

function NewUser({ family, onAddFamilyMember, onCancel }) {
  const [newUser, setNewUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      id: crypto.randomUUID(),
      name: newUser,
      image: `https://api.dicebear.com/9.x/thumbs/svg?seed=${newUser}`,
      currentChores: [],
      currentPoints: 0,
      isAdmin: isAdmin === "true",
    };
    onAddFamilyMember(user);
    onCancel();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="newUser"
        placeholder="User name"
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
        required
      ></input>
      <label>
        {" "}
        Is this user an administrator?
        <select
          name="isAdmin"
          value={isAdmin}
          onChange={(e) => setIsAdmin(e.target.value)}
          required
        >
          <option value={false} selected>
            No
          </option>
          <option value={true} selected>
            Yes
          </option>
        </select>
      </label>
      <div className="modal-actions">
        <Button type="button" onClick={onCancel} className="button-delete">
          Cancel
        </Button>
        <Button type="submit" className="button-add">
          Submit
        </Button>
      </div>
    </form>
  );
}

export default NewUser;
