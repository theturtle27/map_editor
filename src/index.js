import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array().fill(null),
      obstacleIsTrue: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.obstacleIsTrue ? "@" : null;
    this.setState({ squares: squares });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const gridtitle = "GRID MAP";

    let boardWidth = 10;
    const row = [];
    let k = 0; //key
    for (let i = 0; i < boardWidth; i++) {
      const col = [];
      for (let j = 0; j < boardWidth; j++) {
        col.push(this.renderSquare(boardWidth * i + j)); //push argument without {}, <>
        k++;
      }
      row.push(
        <div key={k} className="board-row">
          {col}
        </div>
      );
    }
    return (
      <div>
        <div className="gridtitle">{gridtitle}</div>
        <button
          className="obstacle"
          onClick={() => (this.state.obstacleIsTrue = true)}
        >
          Obstacle
        </button>
        <button
          className="erase"
          onClick={() => (this.state.obstacleIsTrue = false)}
        >
          Erase
        </button>
        <div>{row}</div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
