import React, { Component } from "react";
import createRandomHex from "./HexLogic";

class Colors extends Component {
  state = {
    colors: [],
    winner: undefined,
    headingColor: "#2c8e99",
    size: undefined,
    num: undefined
  };

  componentDidMount() {
    this.handleNewColors();
  }

  handleNewColors = (num = 6, size = 3) => {
    let hex = [];
    for (let i = 0; i < num; i++) {
      hex.push(createRandomHex(size));
    }
    let winner = hex[Math.floor(Math.random() * hex.length)];
    this.setState({
      colors: hex,
      winner: winner,
      headingColor: "#2c8e99",
      size: size,
      num: num
    });
  };

  handleDifficulty = num => {
    this.setState({ difficulty: num });
  };

  handleDecision = c => {
    if (c === this.state.winner) {
      let winningColor = this.state.colors.map(remake => (remake = c));
      this.setState({
        headingColor: c,
        colors: winningColor
      });
    } else {
      this.handleNewColors(this.state.num, this.state.size);
    }
  };

  render() {
    return (
      <div>
        <h1
          className="heading-text"
          style={{ backgroundColor: this.state.headingColor }}
        >
          THE GREAT <span className="color-display">{this.state.winner}</span>
          COLOR GAME
        </h1>
        <div className="stripe">
          <button
            className="reset btn btn-primary"
            onClick={() => this.handleNewColors()}
          >
            New
          </button>
          <span className="message">
            {this.state.winner === this.state.headingColor ? "YOU WIN!" : ""}
          </span>
          <button
            className="mode btn btn-success selected"
            onClick={() => this.handleNewColors(6)}
          >
            Easy
          </button>
          <button
            className="mode selected btn btn-warning"
            onClick={() => this.handleNewColors(9)}
          >
            Hard
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleNewColors(9, 6)}
          >
            Spicy🔥
          </button>
        </div>
        <div className="container">
          {this.state.colors.map(c => (
            <div
              className="square"
              style={{ backgroundColor: c }}
              onClick={() => this.handleDecision(c)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Colors;
