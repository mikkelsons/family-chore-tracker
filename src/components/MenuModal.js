import { useState } from "react";
import NewUser from "./NewUser";
import NewChore from "./NewChore";
import { menuOptions as options } from "./Data";
import "../Modal.css";

export default function MenuModal({
  family,
  onAddFamilyMember,
  onAddChore,
  onClose,
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
          <NewUser
            onAddFamilyMember={onAddFamilyMember}
            family={family}
            onCancel={onClose}
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
      </div>
    </div>
  );
}
