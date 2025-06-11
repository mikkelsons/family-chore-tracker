export default function UserIcon({ familyMember, currentUser, onSwitchUser }) {
  const isActive = currentUser && currentUser.id === familyMember.id;
  return (
    <div
      onClick={() => onSwitchUser(familyMember)}
      className={isActive ? "avatar active" : "avatar"}
    >
      <img
        src={familyMember.image}
        alt={familyMember.name}
        className={isActive ? "active" : ""}
      />
    </div>
  );
}
