import UserChoreList from "./UserChoreList";

export default function User({
  curOpen,
  familyMember,
  onToggleChoreList,
  num,
  family,
  currentUser,
  chores,
  onMarkAsDone,
  onApprove,
  onDeleteChore,
}) {
  const isOpen = curOpen && curOpen.id === familyMember.id;

  const userChores = familyMember.currentChores
    .map((choreId) => chores.find((chore) => chore.id === choreId))
    .filter(Boolean); // remove undefined

  function handleToggle() {
    onToggleChoreList(familyMember);
  }

  return (
    <li className="user" onClick={handleToggle}>
      <img src={familyMember.image} alt={familyMember.name} />
      <div>
        <h3>{familyMember.name}</h3>
        <h4>Current points: {familyMember.currentPoints}</h4>
      </div>

      {isOpen && (
        <UserChoreList
          chores={userChores}
          family={family}
          curOpen={curOpen}
          currentUser={currentUser}
          onMarkAsDone={onMarkAsDone}
          onApprove={onApprove}
          onDeleteChore={onDeleteChore}
        />
      )}
    </li>
  );
}
