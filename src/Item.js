export default function Item({ item, onDelete, onToggele }) {
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
