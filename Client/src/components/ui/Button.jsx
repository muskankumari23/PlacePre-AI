function Button({
  text,
  variant = "primary",
  onClick,
  disabled = false,
}) {

  let buttonStyle = "";

  if (variant === "primary") {
    buttonStyle = "bg-blue-600 hover:bg-blue-700";
  } else if (variant === "success") {
    buttonStyle = "bg-green-600 hover:bg-green-700";
  } else if (variant === "danger") {
    buttonStyle = "bg-red-600 hover:bg-red-700";
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${buttonStyle} text-white w-full py-3 rounded-lg font-semibold transition duration-300 ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
      {text}
    </button>
  );
}

export default Button;