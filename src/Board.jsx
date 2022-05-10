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
    let numberOfSquares = this.state.col * this.state.row;
    let numberOfObstacles = (this.state.percentage / 100) * numberOfSquares;
    numberOfObstacles = Math.floor(numberOfObstacles);
    console.log(numberOfObstacles);
    const squares = Array(numberOfSquares).fill(".");
    let preShuffleArray = Array.from(Array(numberOfSquares).keys());
    let arrayLength = preShuffleArray.length;
    for (var i = preShuffleArray.length - 1; i > 0; i--) {
      const swapIndex = Math.floor(Math.random() * (i + 1));
      const currentCard = preShuffleArray[i];
      const cardToSwap = preShuffleArray[swapIndex];
      preShuffleArray[i] = cardToSwap;
      preShuffleArray[swapIndex] = currentCard;
    }
    for (var i = 0; i < numberOfObstacles; i++) {
      squares[preShuffleArray[i]] = "@";
    }
    // for (let i = 0; i < numberOfSquares; i++) {
    //   let randomIndex = 0;
    //   randomIndex = Math.floor(Math.random() * arrayLength);
    //   [preShuffleArray[randomIndex], preShuffleArray[arrayLength - 1]] = [
    //     preShuffleArray[arrayLength - 1],
    //     preShuffleArray[randomIndex],
    //   ];
    //   squares[preShuffleArray[arrayLength - 1]] = "@";
    //   arrayLength--;
    //   preShuffleArray.pop();
    // }
    this.setState({ squares: squares });
  };

  exportData = () => {
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
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(array)
    )}`;
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
    // FileReader is built in to browser JS
    const fileReader = new FileReader();
    // Convert file to text
    fileReader.readAsText(event.target.files[0], "UTF-8");
    let fileName = event.target.files[0].name;
    var fileExtension = fileName.split(".").pop();

    // When file is convertgged...
    fileReader.onload = (event) => {
      // File extension check
      if (fileExtension !== "json") {
        window.alert("Filetype is not supportted. You must use .json");
        return false;
      }
      // Convert text to JS data
      const data = JSON.parse(event.target.result);

      // Updata state with file data
      const array = data.flat();
      const row = data.length;
      const col = data[0].length;

      this.setState({ row, col, squares: array });
    };
    event.target.value = null;
  };

  render() {
    const gridtitle = "MAP EDITOR";

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
