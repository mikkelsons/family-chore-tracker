import { useState } from "react";
import Button from "./Button";
import "../Modal.css";

export default function PasswordModal({ onConfirm, onCancel }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setPassword(e.target.value);
    setError(""); // Clear error on input change
  }

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const correctPassword = "1111"; // Hardcoded for simplicity
    console.log(`Form submitted with password: ${correctPassword}`);

    if (password !== correctPassword) {
      setError(password === "" ? "Password is required" : "Incorrect password");
      return;
    }
    setTimeout(() => {
      onConfirm();
    }, 0);
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Parent Login</h2>
        <form onSubmit={handleSubmit} noValidate>
          {" "}
          {/* added noValidate because of browser or script validations
          interfering in pressing 'enter' to submit form */}
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter parent password"
            />
          </label>
          <h3>During developement password is 1111</h3>
          {error && <p className="error">{error}</p>}
          <div className="modal-actions">
            <Button type="button" onClick={onCancel} className="button-delete">
              Cancel
            </Button>
            <Button type="submit" className="button-add">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
