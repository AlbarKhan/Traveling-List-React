import { useState } from "react";
import "./App.css";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "charger", quantity: 3, packed: false },
  { id: 4, description: "Mobile", quantity: 1, packed: false },
];

export default function App() {
  const [items, setItem] = useState([]);
  function handleAddItems(item) {
    console.log(items);
    setItem((items) => [...items, item]);
  }

  function handleDelete(id) {
    setItem((items) => items.filter((item) => item.id !== id));
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDelete={handleDelete} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>⛰️Traveling Items List🛣️</h1>;
}
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newObj = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newObj);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you Nedd for your trip</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
          return (
            <option value={num} key={num}>
              {num}
            </option>
          );
        })}
      </select>

      <input
        placeholder="Items..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDelete }) {
  return (
    <div className="list">
      <ul>
        {items.map((item, index) => (
          <Item item={item} key={item.id} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDelete }) {
  // console.log(item.description);
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button
        style={{ color: "red" }}
        onClick={() => {
          onDelete(item.id);
        }}
      >
        X
      </button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list, and you already packed X(X%)</em>
    </footer>
  );
}
