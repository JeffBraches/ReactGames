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
    this.checkForWin = this.checkForWin.bind(this);
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
    let gameBoard = this.state.gameBoard;
    let gameState = this.state.gameState;
    let currentPlayer = this.state.player;
    let nextPlayer;
    currentPlayer === "O" ? nextPlayer = "X" : nextPlayer = "O"

    if (!gameBoard[square] && gameState === 1){
      gameBoard[square] = this.state.player;
      this.setState({
        gameBoard,
        player: nextPlayer
      });

      this.checkForWin();

    }
  }

  checkForWin(){
  
    let gameBoard = this.state.gameBoard;
    let winner;

    //Check rows
    for (let rowStart=0; rowStart < 7; rowStart+=3){
      if (gameBoard[rowStart] === gameBoard[rowStart+1] && gameBoard[rowStart+1] === gameBoard[rowStart+2] && gameBoard[rowStart] !== ""){
        winner = gameBoard[rowStart];
        this.setState({
          result: gameBoard[rowStart]+" is the Winner!",
          gameState: 2
        })
      }
    }

    //Check columns 
    for (let column=0; column < 3; column++){
      if (gameBoard[column] === gameBoard[column+3] && gameBoard[column+3] === gameBoard[column+6] && gameBoard[column] !== ""){
        winner = gameBoard[column];
        this.setState({
          result: gameBoard[column]+" is the Winner!",
          gameState: 2
        })
      }
    }

    //Check diagonals
    if (gameBoard[0] === gameBoard[4] && gameBoard[4] === gameBoard[8] && gameBoard[0] !== ""){
      winner = gameBoard[0];
      this.setState({
        result: gameBoard[0]+" is the Winner!",
        gameState: 2
      })
    }
    else if (gameBoard[2] === gameBoard[4] && gameBoard[4] === gameBoard[6] && gameBoard[2] !== ""){
      winner = gameBoard[2];
      this.setState({
        result: gameBoard[2]+" is the Winner!",
        gameState: 2
      })
    }

    if (winner){
      winner === "O" ? this.props.updateStats(0) : this.props.updateStats(1);
    }
    else {
      let boardFilled = true;

      for(let square=0; square<9; square++){
        if (gameBoard[square] === ""){
          boardFilled = false;
        }
      }

      if (boardFilled){
        this.props.updateStats(2);
        this.setState({
          result: "Board filled! Tie game.",
          gameState: 2
        })
      }
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
