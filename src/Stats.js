export default function Stats({ items }) {
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
