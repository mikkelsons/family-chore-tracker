import { useState } from "react";
import { chores as initialChores, family as initialFamily } from "./Data";

import ChoreList from "./ChoreList";
import UserList from "./UserList";
import Header from "./Header";
import Title from "./Title";
import Button from "./Button";
import MenuModal from "./MenuModal";
import PasswordModal from "./PasswordModal";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [curOpen, setCurOpen] = useState(null);
  const [chores, setChores] = useState(initialChores);
  const [family, setFamily] = useState(initialFamily);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);

  function handleSwitchUser(familyMember) {
    // If selecting admin, open password modal
    if (familyMember.isAdmin) {
      setPendingUser(familyMember);
      setIsPasswordModalOpen(true);
    } else {
      // For non-admins, set user directly
      setCurrentUser((current) =>
        current?.id === familyMember.id ? null : familyMember
      );
      console.log(currentUser);
    }
  }

  function handleConfirmPassword() {
    if (pendingUser) {
      setCurrentUser((current) =>
        current?.id === pendingUser.id ? null : pendingUser
      );
      setPendingUser(null);
      setIsPasswordModalOpen(false);
    }
  }

  function handleCancelPassword() {
    setPendingUser(null);
    setIsPasswordModalOpen(false);
  }

  function handleToggleChoreList(familyMember) {
    setCurOpen((current) =>
      current?.id === familyMember.id ? null : familyMember
    );
  }

  function handleMarkAsDone(choreId) {
    setChores((prevChores) =>
      prevChores.map((chore) =>
        chore.id === choreId ? { ...chore, status: "Pending" } : chore
      )
    );
  }

  function handleApprove(choreId) {
    const choreToApprove = chores.find((chore) => chore.id === choreId);
    setChores((prevChores) =>
      prevChores.map((chore) =>
        chore.id === choreId ? { ...chore, status: "Done" } : chore
      )
    );
    setFamily((prevFamily) =>
      prevFamily.map((member) =>
        member.name === choreToApprove.assignedTo
          ? {
              ...member,
              currentPoints: member.currentPoints + choreToApprove.points,
            }
          : member
      )
    );
  }

  function handleAddChore(newChore) {
    setChores((prevChores) => [...prevChores, newChore]);
    setFamily((prevFamily) =>
      prevFamily.map((member) =>
        member.name === newChore.assignedTo
          ? {
              ...member,
              currentChores: [...member.currentChores, newChore.id],
            }
          : member
      )
    );
    setIsMenuModalOpen(false);
  }

  function handleDeleteChore(choreId) {
    const choreToDelete = chores.find((chore) => chore.id === choreId);

    setChores((prevChores) =>
      prevChores.filter((chore) => chore.id !== choreId)
    );
    setFamily((prevFamily) =>
      prevFamily.map((member) =>
        member.name === choreToDelete.assignedTo
          ? {
              ...member,
              currentChores: member.currentChores.filter(
                (choreId) => choreId !== choreToDelete.id
              ),
            }
          : member
      )
    );
  }

  function handleAddFamilyMember(member) {
    setFamily((prevFamily) => [...prevFamily, member]);
  }

  return (
    <div>
      <Header
        currentUser={currentUser}
        onSwitchUser={handleSwitchUser}
        family={family}
      />
      <Title />
      <div className="app">
        <div className="sidebar">
          <ChoreList
            chores={chores}
            family={family}
            currentUser={currentUser}
            onApprove={handleApprove}
            onMarkAsDone={handleMarkAsDone}
            onDeleteChore={handleDeleteChore}
          />
          {currentUser?.isAdmin && (
            <>
              <Button
                className="button-add"
                onClick={() => {
                  setIsMenuModalOpen(true);
                }}
              >
                Menu
              </Button>
            </>
          )}
        </div>
        <div>
          <UserList
            family={family}
            curOpen={curOpen}
            onToggleChoreList={handleToggleChoreList}
            currentUser={currentUser}
            chores={chores}
            onMarkAsDone={handleMarkAsDone}
            onApprove={handleApprove}
            onDeleteChore={handleDeleteChore}
          />
        </div>
      </div>
      {isMenuModalOpen && (
        <MenuModal
          family={family}
          onAddFamilyMember={handleAddFamilyMember}
          onAddChore={handleAddChore}
          onClose={() => setIsMenuModalOpen(false)}
          onSetFamily={setFamily}
          chores={chores}
          setChores={setChores}
          currentUser={currentUser}
        />
      )}
      {isPasswordModalOpen && (
        <PasswordModal
          onConfirm={handleConfirmPassword}
          onCancel={handleCancelPassword}
        />
      )}
    </div>
  );
}
