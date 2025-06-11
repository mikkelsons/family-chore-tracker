import { useState } from "react";
import NewUser from "./NewUser";
import NewChore from "./NewChore";
import RedeemPoints from "./RedeemPoints";
import RemoveUserChore from "./RemoveUserChore";

import { menuOptions as options } from "./Data";
import "../Modal.css";
import DeleteUser from "./DeleteUser";

export default function MenuModal({
  family,
  onSetFamily,
  onAddFamilyMember,
  onAddChore,
  onClose,
  chores,
  setChores,
  currentUser,
}) {
  const [selectedOption, setSelectedOption] = useState("");

  function handleChange(e) {
    setSelectedOption(e.target.value);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Menu:</h2>
        <label>
          Action:
          <select
            name="menuOption"
            value={selectedOption}
            onChange={handleChange}
            required
          >
            <option value="" selected disabled hidden>
              Please select an option
            </option>
            {options.map((option) => (
              <option key={option.id} value={option.option}>
                {option.option}
              </option>
            ))}
          </select>
        </label>

        {selectedOption === "Add user" && (
          <NewUser onAddFamilyMember={onAddFamilyMember} onCancel={onClose} />
        )}
        {selectedOption === "Delete user" && (
          <DeleteUser
            family={family}
            onSetFamily={onSetFamily}
            onClose={onClose}
            chores={chores}
            setChores={setChores}
            currentUser={currentUser}
          />
        )}
        {selectedOption === "Add chore" && (
          <NewChore
            onAddFamilyMember={onAddFamilyMember}
            family={family}
            onClose={onClose}
            onAddChore={onAddChore}
          />
        )}
        {selectedOption === "Remove user chore" && (
          <RemoveUserChore
            chores={chores}
            setChores={setChores}
            family={family}
            onClose={onClose}
          />
        )}
        {selectedOption === "Redeem points" && (
          <RedeemPoints
            family={family}
            onSetFamily={onSetFamily}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}
