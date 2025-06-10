export default function Button({ children, onClick, className, type }) {
  return (
    <button type={type} className={className || "button"} onClick={onClick}>
      {children}
    </button>
  );
}
