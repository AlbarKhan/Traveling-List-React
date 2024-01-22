import { useState } from "react";
import "./App.css";

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

function PackingList({ items, onDelete, onToggele, onClear }) {
  const [sortBy, setsortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item, index) => (
          <Item
            item={item}
            key={item.id}
            onDelete={onDelete}
            onToggele={onToggele}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setsortBy(e.target.value)}>
          <option value="input">sort by input Order</option>
          <option value="description">Sort by description</option>
          <option value="packed"> Sort by Packed status</option>
        </select>
        <button onClick={onClear}> Clear List</button>
      </div>
    </div>
  );
}

function Item({ item, onDelete, onToggele }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        <input
          type="checkbox"
          value={item.packed}
          onChange={() => onToggele(item.id)}
        ></input>{" "}
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

function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">
        <em>Start Adding some Items to your packing List</em>
      </p>
    );
  }
  const packedItems = items.filter((item) => item.packed === true);
  const percentage = (packedItems.length / items.length) * 100;
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything ! Ready to go  ✈️✈️"
          : `
        You have ${items.length} items on your list, and you already packed
        ${packedItems.length} (${Math.trunc(percentage)}%)
        `}
      </em>
    </footer>
  );
}
