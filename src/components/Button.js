export default function Button({ children, onClick, className }) {
  return (
    <button className={className || "button"} onClick={onClick}>
      {children}
    </button>
  );
}
