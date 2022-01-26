import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Slider from "./slider";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

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
      squares: Array(25).fill("0"),
      obstacleIsTrue: true,
      size: 5,
      row: 0,
      col: 0,
    };
    // this.exportData = this.exportData.bind(this);
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.obstacleIsTrue ? "@" : "0";
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
    const jsonDict = { size: this.state.size, array: this.state.squares };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(jsonDict)
    )}`;
    console.log(jsonString);
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";
    link.click();
  };

  increaseSize = () => {
    this.setState({
      size: this.state.size + 1,
      squares: Array((this.state.size + 1) * (this.state.size + 1)).fill("0"),
    });
  };

  decreaseSize = () => {
    this.setState({
      size: this.state.size - 1,
      squares: Array((this.state.size - 1) * (this.state.size - 1)).fill("0"),
    });
  };

  obstacleClick = () => {
    this.setState({ obstacleIsTrue: true });
  };

  eraseClick = () => {
    this.setState({ obstacleIsTrue: false });
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

    let boardWidth = this.state.size;

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
        <div>
          <Button
            style={{
              backgroundColor:
                this.state.obstacleIsTrue === true ? "green" : null,
            }}
            className="obstacle"
            onClick={() => this.obstacleClick()}
          >
            Obstacle
          </Button>
          <Button
            style={{
              backgroundColor:
                this.state.obstacleIsTrue === false ? "green" : null,
            }}
            className="erase"
            onClick={() => this.eraseClick()}
          >
            Erase
          </Button>
          <Button className="increase" onClick={() => this.increaseSize()}>
            +
          </Button>
          <Button className="decrease" onClick={() => this.decreaseSize()}>
            -
          </Button>
        </div>
        <div>{row}</div>
        <div>
          {/* use arrow method */}
          <button className="download" onClick={() => this.exportData()}>
            Download
          </button>
        </div>
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
