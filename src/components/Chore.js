import Button from "./Button";

export default function Chore({
  chore,
  family,
  currentUser,
  familyMember,
  onMarkAsDone,
  onApprove,
  onDeleteChore,
}) {
  const assignedMember = family.find(
    (member) => member.name === chore.assignedTo
  );

  // Determine button visibility and properties
  let showActionButton = false;
  let actionButtonText = "";
  let actionButtonAction = null;
  let showDeleteButton = false;
  let buttonClassName = "";

  if (currentUser) {
    // Case 1: In UserChoreList, show "Mark as Done" for "To Do" chores for the current user
    if (familyMember && currentUser.id === familyMember.id) {
      if (chore.status === "To Do") {
        showActionButton = true;
        actionButtonText = "Mark as Done";
        buttonClassName = "button-to-do";
        actionButtonAction = () => onMarkAsDone(chore.id);
      }
    }

    // Case 2: For Mom or Dad, show "Approve" for "Pending" and "Delete" for "Done"
    if (currentUser.name === "Mom" || currentUser.name === "Dad") {
      if (chore.status === "Pending") {
        showActionButton = true;
        actionButtonText = "Approve";
        buttonClassName = "button-approve";
        actionButtonAction = () => onApprove(chore.id);
      }
      if (chore.status === "Done") {
        showDeleteButton = true;
      }
    }
  }

  return (
    <li
      className={`chore ${
        chore.status === "Done"
          ? "done"
          : chore.status === "Pending"
          ? "pending"
          : ""
      }`}
    >
      <div className="chore-image">
        <img src={chore?.image} alt={chore.name} />
      </div>
      <div>
        <h3>{chore.name}</h3>
        <h4>{chore.status}</h4>
        <p>Points: {chore.points}</p>
        <h4>{chore.assignedTo}</h4>
      </div>
      <div className="chore-actions">
        {showActionButton && (
          <Button
            className={buttonClassName}
            onClick={(e) => {
              e.stopPropagation();
              actionButtonAction();
            }}
          >
            {actionButtonText}
          </Button>
        )}
        {showDeleteButton && (
          <Button
            className="button-delete"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteChore(chore.id);
            }}
          >
            Delete
          </Button>
        )}
        <img src={assignedMember.image} alt={assignedMember.name} />
      </div>
    </li>
  );
}
