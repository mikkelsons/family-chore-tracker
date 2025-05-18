import Chore from "./Chore";

export default function ChoreList({
  chores,
  family,
  currentUser,
  onApprove,
  onMarkAsDone,
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
