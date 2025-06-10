import { useState } from "react";
import Button from "./Button";
import { chores as choreTemplates } from "./Data";
import "../Modal.css";

export default function MenuModal({ family, onAddChore, onClose }) {
  const [formData, setFormData] = useState({
    choreName: choreTemplates[0]?.name,
    assignedTo: family[0]?.name,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const template = choreTemplates.find(
      (chore) => chore.name === formData.choreName
    );
    const newChore = {
      id: crypto.randomUUID(),
      name: formData.choreName,
      assignedTo: formData.assignedTo,
      status: "To Do",
      points: template.points,
      category: template.category,
      image: template.image,
    };
    onAddChore(newChore);
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Add New Chore</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Chore Type:
            <select
              name="choreName"
              value={formData.choreName}
              onChange={handleChange}
              required
            >
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
              value={formData.assignedTo}
              onChange={handleChange}
              required
            >
              {family.map((member) => (
                <option key={member.id} value={member.name}>
                  {member.name}
                </option>
              ))}
            </select>
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
      </div>
    </div>
  );
}
