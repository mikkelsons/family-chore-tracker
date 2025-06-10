export const chores = [
  {
    id: crypto.randomUUID(),
    name: "Wash dishes",
    assignedTo: "Ryan",
    status: "To Do",
    points: 15,
    image: "../../dishes.png",
  },
  {
    id: crypto.randomUUID(),
    name: "Mow lawn",
    assignedTo: "Shane",
    status: "To Do",
    points: 20,
    image: "../../lawn-mower.png",
  },
  {
    id: crypto.randomUUID(),
    name: "Clean living room",
    assignedTo: "Maddy",
    status: "Done",
    points: 10,
    image: "../../vacuum.png",
  },
  {
    id: crypto.randomUUID(),
    name: "Fold Laundry",
    assignedTo: "Ryan",
    status: "Pending",
    points: 10,
    image: "../../laundry.png",
  },
];

export const family = [
  {
    id: 1,
    name: "Dad",
    image: "https://api.dicebear.com/9.x/thumbs/svg?seed=Dad",
    currentChores: [],
    currentPoints: 0,
    isAdmin: true,
  },
  {
    id: 2,
    name: "Mom",
    image: "https://api.dicebear.com/9.x/thumbs/svg?seed=Mom",
    currentChores: [],
    currentPoints: 0,
    isAdmin: true,
  },
  {
    id: 3,
    name: "Shane",
    image: "https://api.dicebear.com/9.x/thumbs/svg?seed=Shane",
    currentChores: [chores.find((chore) => chore.name === "Mow lawn").id],
    currentPoints: 10,
  },
  {
    id: 4,
    name: "Ryan",
    image: "https://api.dicebear.com/9.x/thumbs/svg?seed=Ryan",
    currentChores: [
      chores.find((chore) => chore.name === "Wash dishes").id,
      chores.find((chore) => chore.name === "Fold Laundry").id,
    ],
    currentPoints: 10,
  },
  {
    id: 5,
    name: "Maddy",
    image: "https://api.dicebear.com/9.x/thumbs/svg?seed=Maddy",
    currentChores: [
      chores.find((chore) => chore.name === "Clean living room").id,
    ],
    currentPoints: 10,
  },
];

export const menuOptions = [
  {
    id: 1,
    option: "Add user",
  },
  {
    id: 2,
    option: "Delete user",
  },
  {
    id: 3,
    option: "Add chore",
  },
  {
    id: 4,
    option: "Remove user chore",
  },
  {
    id: 5,
    option: "Redeem points",
  },
];
