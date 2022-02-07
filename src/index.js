import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Slider from "./slider";

function Square(props) {
  return (
    <button
      style={{ backgroundColor: props.value === "@" ? "black" : null }} //set bg black for obstacle
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
      row: 3,
      col: 3,
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
    const jsonDict = {
      row: this.state.row,
      col: this.state.col,
      array: this.state.squares,
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(jsonDict)
    )}`;
    console.log(jsonString);
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";
    link.click();
  };

  increaseRowSize = () => {
    this.setState({
      row: this.state.row + 1,
      squares: Array((this.state.row + 1) * this.state.col).fill("0"),
    });
    console.log(this.state.row);
  };

  decreaseRowSize = () => {
    this.setState({
      row: this.state.row - 1,
      squares: Array((this.state.row - 1) * this.state.col).fill("0"),
    });
  };

  increaseColSize = () => {
    this.setState({
      col: this.state.col + 1,
      squares: Array(this.state.row * (this.state.col + 1)).fill("0"),
    });
    console.log(this.state.row);
  };

  decreaseColSize = () => {
    this.setState({
      col: this.state.col - 1,
      squares: Array(this.state.row * (this.state.col - 1)).fill("0"),
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
  handleRowChange = (row) => {
    this.setState({
      row,
      squares: Array(100).fill("0"),
    });
  };
  handleColChange = (col) => {
    this.setState({ col, squares: Array(100).fill("0") });
  };

  handleFile = (event) => {
    console.log("event.target.files test:", event.target.files);
    // FileReader is built in to browser JS
    const fileReader = new FileReader();

    // Convert file to text
    fileReader.readAsText(event.target.files[0], "UTF-8");

    // When file is convertgged...
    fileReader.onload = (event) => {
      console.log("event.target.result", event.target.result);
      // Convert text to JS data
      const data = JSON.parse(event.target.result);

      // Updata state with file data
      const { row, col, array } = data;
      console.log("data", data);
      this.setState({ row, col, squares: array });
    };
  };

  render() {
    const gridtitle = "GRID MAP";

    let boardWidth = this.state.row;
    let boardLength = this.state.col;

    const row = [];
    let k = 0; //key
    for (let i = 0; i < boardWidth; i++) {
      const col = [];
      for (let j = 0; j < boardLength; j++) {
        col.push(this.renderSquare(boardLength * i + j)); //push argument without {}, <>
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
          <p>Height {this.state.row} </p>
          <Slider
            min={3}
            max={10}
            step={1}
            defaultLength={4}
            value={this.state.row}
            onChangeValue={this.handleRowChange}
          />
          <p>Width {this.state.col} </p>
          <Slider
            min={3}
            max={10}
            step={1}
            defaultLength={4}
            value={this.state.col}
            onChangeValue={this.handleColChange}
          />
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
        </div>
        <div>{row}</div>
        <div>
          {/* use arrow method */}
          <button className="download" onClick={() => this.exportData()}>
            Download
          </button>
          <input type="file" name="file" onChange={this.handleFile} />
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
