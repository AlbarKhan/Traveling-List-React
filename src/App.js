import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "charger", quantity: 3, packed: false },
  { id: 4, description: "Mobile", quantity: 1, packed: false },
];

export default function App() {
  const [items, setItem] = useState(initialItems);
  // const [editCheck, setEditCheck] = useState(false);
  function handleAddItems(item) {
    // items.map((item) => console.log(item));
    setItem((items) => [...items, item]);
  }

  function handleDelete(id) {
    setItem((items) => items.filter((item) => item.id !== id));
  }

  function handleToggele(id) {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClear() {
    const confirm = window.confirm(
      "Are you Sure you want to delete all the items"
    );
    if (confirm) setItem([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDelete={handleDelete}
        onToggele={handleToggele}
        onClear={handleClear}
      />
      <Stats items={items} />
    </div>
  );
}
