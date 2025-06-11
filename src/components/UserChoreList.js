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
  return (
    <div className="chore-list">
      <ul>
        {chores.length ? (
          chores.map((chore) => (
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
