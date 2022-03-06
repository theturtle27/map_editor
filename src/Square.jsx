export default function Square(props) {
  return (
    <button
      style={{ backgroundColor: props.value === "@" ? "black" : null }} //set bg black for obstacle
      className="square"
      onClick={props.onClick}
    />
  );
}

// expoerr defautl Square
