import User from "./User";

export default function UserList({
  family,
  curOpen,
  onToggleChoreList,
  currentUser,
  chores,
  onMarkAsDone,
  onApprove,
  onDeleteChore,
}) {
  return (
    <ul className="user-list">
      {family.map((familyMember, i) => (
        <User
          familyMember={familyMember}
          curOpen={curOpen}
          onToggleChoreList={onToggleChoreList}
          num={i}
          family={family}
          currentUser={currentUser}
          chores={chores}
          onMarkAsDone={onMarkAsDone}
          onApprove={onApprove}
          onDeleteChore={onDeleteChore}
          key={familyMember.id}
        />
      ))}
    </ul>
  );
}
