import { useState } from "react";
import Item from "./Item";

export default function PackingList({ items, onDelete, onToggele, onClear }) {
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
