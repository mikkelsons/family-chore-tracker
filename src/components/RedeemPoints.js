import { useState } from "react";

import Button from "./Button";

function RedeemPoints({ family, onSetFamily, onClose }) {
  const [familyMember, setFamilyMember] = useState("");
  const [redeemedPoints, setRedeemedPoints] = useState(null);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const user = family.find((member) => member.name === familyMember);
    if (user.currentPoints < Number(redeemedPoints)) {
      setError("Not enough points to redeem");
      return;
    }
    onSetFamily((prev) =>
      prev.map((member) =>
        member.id === user.id
          ? {
              ...member,
              currentPoints:
                member.currentPoints - Number(redeemedPoints) >= 0
                  ? member.currentPoints - Number(redeemedPoints)
                  : member.currentPoints,
            }
          : member
      )
    );
    onClose();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Whose points would you like to redeem?
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
        <h3>
          {familyMember}'s current points:{" "}
          {family.find((member) => member.name === familyMember).currentPoints}
        </h3>
      )}
      <label>
        How many points would you like to redeem?
        <input
          type="number"
          name="points"
          value={redeemedPoints}
          min="0"
          onChange={(e) => setRedeemedPoints(e.target.value)}
          required
        ></input>
      </label>
      {error && <p className="error">{error}</p>}

      <div className="modal-actions">
        <Button type="button" onClick={onClose} className="button-delete">
          Cancel
        </Button>
        <Button type="submit" className="button-add">
          Redeem Points
        </Button>
      </div>
    </form>
  );
}

export default RedeemPoints;
