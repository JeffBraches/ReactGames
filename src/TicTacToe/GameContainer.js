import React, { Component } from "react";
import Board from "./Board"
class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {

      gameState: 0,
      result: "",

    };

    this.handleSelection = this.handleSelection.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }

  handleStart() {
    let gameBoard = [];
    for (var i = 0; i < 9; i++) {
      gameBoard[i] = "";
    }

    this.setState(
      {
        gameState: 1,
        gameBoard,
        result: "",
        player: "O"
      }
    );
  }

  handleSelection(square) {
    let gameBoard = this.state.gameBoard
    let currentPlayer = this.state.player;
    let nextPlayer;
    currentPlayer === "O" ? nextPlayer = "X" : nextPlayer = "O"

    if (!gameBoard[square]){
      gameBoard[square] = this.state.player;

      this.setState({
        gameBoard,
        player: nextPlayer
      })
    }
  }

  render() {
    if (this.state.gameState === 0) {
      return (
        <div className="gamestartContainer">
          <button
            className="actionbutton"
            id="gamestartbutton"
            onClick={this.handleStart}
          >
            Start New Game
          </button>
        </div>
      );
    } else if (this.state.gameState === 1) {
      return (
        <div className="gameContainer">
          <Board 
            gameBoard={this.state.gameBoard}
            handleSelection={this.handleSelection}
          />
        </div>
      );
    } else if (this.state.gameState === 2) {
      return (
        <div className="gameContainer">

          <div className="gameresults">
            <span>{this.state.result}</span>
            <button
              className="actionbutton"
              id="restartbutton"
              onClick={this.handleStart}
            >
              Start New Game
            </button>
          </div>
        </div>
      );
    }
  }
}

export default GameContainer;
