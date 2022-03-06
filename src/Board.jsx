import { Button, Row, Col, Container } from "react-bootstrap";
import Square from "./Square.jsx";
import Slider from "./Slider.jsx";
import React from "react";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(25).fill("."),
      obstacleIsTrue: null,
      size: 5,
      row: 5,
      col: 5,
      percentage: 0,
    };
    // this.exportData = this.exportData.bind(this);
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.obstacleIsTrue ? "@" : ".";
    this.setState({ squares: squares });
  }

  randomiseClick = () => {
    this.setState({ squares: Array(300).fill(".") });
    let numberOfSquares = this.state.col * this.state.row;
    let numberOfObstacles = (this.state.percentage / 100) * numberOfSquares;
    console.log(this.state.percentage / 100);
    numberOfObstacles = numberOfObstacles | 0;
    console.log(numberOfObstacles);
    const squares = this.state.squares.slice();
    for (let i = 0; i < numberOfSquares; i++) {
      let x = 0;
      x = Math.random();
      console.log(x);
      if (x < this.state.percentage / 100) squares[i] = "@";
      else squares[i] = ".";
    }
    this.setState({ squares: squares });

    console.log(numberOfObstacles);
  };

  exportData = () => {
    console.log(
      "Download",
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
    const array = [];
    for (let i = 0; i < this.state.row; i++) {
      const row = [];
      for (let j = 0; j < this.state.col; j++) {
        const rowStart = i * this.state.col;
        const index = rowStart + j;
        const value = this.state.squares[index];
        row.push(value);
      }
      array.push(row);
    }
    console.log("array test:", array);
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(array)
    )}`;
    console.log(jsonString);
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";
    link.click();
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
      squares: Array(300).fill("."),
    });
  };
  handleColChange = (col) => {
    this.setState({ col, squares: Array(300).fill(".") });
  };

  handlePercentageChange = (percentage) => {
    this.setState({ percentage });
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
      <Container fluid>
        <Row>
          <div className="gridtitle">{gridtitle}</div>
        </Row>
        <Row className="sliders">
          <Col className="height">
            <p>Height: {this.state.row} </p>
            <Slider
              min={4}
              max={15}
              step={1}
              defaultLength={4}
              value={this.state.row}
              onChangeValue={this.handleRowChange}
            />
          </Col>

          <Col>
            <p>Width: {this.state.col} </p>
            <Slider
              min={4}
              max={20}
              step={1}
              defaultLength={10}
              value={this.state.col}
              onChangeValue={this.handleColChange}
            />
          </Col>
          <Col>
            <p>Percentage: {this.state.percentage} % </p>
            <Slider
              min={0}
              max={50}
              step={5}
              defaultLength={10}
              value={this.state.percentage}
              onChangeValue={this.handlePercentageChange}
            />
            <Button className="randomise" onClick={() => this.randomiseClick()}>
              Randomise
            </Button>
          </Col>
        </Row>
        <Row className="map">{row}</Row>
        <Row>
          <div className="download-container">
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
            <Button variant="danger" onClick={() => this.exportData()}>
              Download
            </Button>
          </div>
        </Row>

        <Row>
          <input type="file" name="file" onChange={this.handleFile} />
        </Row>
      </Container>
    );
  }
}

export default Board;
