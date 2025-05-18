import UserIcon from "./UserIcon";

export default function Header({ currentUser, onSwitchUser, family }) {
  return (
    <header className="header">
      {family.map((familyMember) => (
        <div>
          <UserIcon
            currentUser={currentUser}
            familyMember={familyMember}
            key={familyMember.id}
            onSwitchUser={onSwitchUser}
          />
          <h2>{familyMember.name}</h2>
        </div>
      ))}
    </header>
  );
}
