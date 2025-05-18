import { useState } from "react";
import ChoreList from "./ChoreList";
import { chores as initialChores, family as initialFamily } from "./Data";
import UserList from "./UserList";
import Header from "./Header";
import Title from "./Title";
import Button from "./Button";
import AddChoreModal from "./AddChoreModal";
import PasswordModal from "./PasswordModal";
// import AddUserModal from "./AddUserModal";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [curOpen, setCurOpen] = useState(null);
  const [chores, setChores] = useState(initialChores);
  const [family, setFamily] = useState(initialFamily);
  const [isAddChoreModalOpen, setIsAddChoreModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  // const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);

  function handleSwitchUser(familyMember) {
    // If selecting Mom or Dad, open password modal
    if (familyMember.name === "Mom" || familyMember.name === "Dad") {
      setPendingUser(familyMember);
      setIsPasswordModalOpen(true);
    } else {
      // For non-parents, set user directly
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
    setIsAddChoreModalOpen(false);
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

  // function handleAddUser(newUser) {
  //   setFamily((prevFamily) => [...prevFamily, newUser]);
  // }

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
          {(currentUser?.name === "Mom" || currentUser?.name === "Dad") && (
            <>
              <Button
                onClick={() => {
                  setIsAddChoreModalOpen(true);
                }}
              >
                Add Chore
              </Button>
              {/* <Button
                onClick={() => {
                  setIsAddUserModalOpen(true);
                }}
              >
                Add User
              </Button> */}
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
      {isAddChoreModalOpen && (
        <AddChoreModal
          family={family}
          onAddChore={handleAddChore}
          onClose={() => setIsAddChoreModalOpen(false)}
        />
      )}
      {isPasswordModalOpen && (
        <PasswordModal
          onConfirm={handleConfirmPassword}
          onCancel={handleCancelPassword}
        />
      )}
      {/* {isAddUserModalOpen && (
        <AddUserModal
          onAddUser={handleAddUser}
          onClose={() => setIsAddUserModalOpen(false)}
        />
      )} */}
    </div>
  );
}
