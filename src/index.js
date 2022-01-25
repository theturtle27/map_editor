import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button
      style={{ backgroundColor: props.value === "@" ? "black" : null }}
      className="square"
      onClick={props.onClick}
    />
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array().fill(null),
      obstacleIsTrue: true,
      row: 0,
      col: 0,
    };
    // this.exportData = this.exportData.bind(this);
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.obstacleIsTrue ? "@" : null;
    this.setState({ squares: squares });
  }

  exportData = () => {
    console.log(
      "Dwnload",
      this.state.row,
      "row here",
      this.state.col,
      "col here"
    );
    // console.log(this.state.squares);
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(this.state.squares)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";
    link.click();
  };

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
    // this.setState({ row });
    return (
      <div>
        <div className="gridtitle">{gridtitle}</div>
        <div>
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
          <button className="Download" onClick={() => this.exportData()}>
            Download
          </button>
        </div>
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
