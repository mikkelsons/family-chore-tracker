import Button from "./Button";

function ConfirmDelete({ userToDelete, onConfirm, onCancel }) {
  return (
    <div>
      <div className="modal-confirm">
        <h3>Confirm Deletion</h3>
        <p className="confirm">
          Are you sure you want to delete {userToDelete}?
        </p>
        <p className="confirm">This action cannot be undone.</p>
        <div className="modal-actions">
          <Button type="button" onClick={onCancel} className="button-delete">
            Cancel
          </Button>
          <Button type="submit" onClick={onConfirm} className="button-add">
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDelete;
