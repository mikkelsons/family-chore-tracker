import Chore from "./Chore";

export default function UserChoreList({
  chores,
  family,
  curOpen,
  currentUser,
  onMarkAsDone,
  onApprove,
  onDeleteChore,
}) {
  const safeChores = Array.isArray(chores) ? chores : [];

  return (
    <div className="chore-list">
      <ul>
        {safeChores.length ? (
          safeChores.map((chore) => (
            <Chore
              chore={chore}
              family={family}
              key={chore.id}
              currentUser={currentUser}
              familyMember={curOpen}
              onMarkAsDone={onMarkAsDone}
              onApprove={onApprove}
              onDeleteChore={onDeleteChore}
            />
          ))
        ) : (
          <p>No chores assigned</p>
        )}
      </ul>
    </div>
  );
}
