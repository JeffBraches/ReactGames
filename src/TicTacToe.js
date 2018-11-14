import React, { Component } from "react";
import Stats from "./Stats"
import "./TicTacToe.css";
class TicTacToe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: 0,
      gameResult: null,
      numWins: 0,
      numLosses: 0,
      numTies: 0
    };

    this.setGameState = this.setGameState.bind(this);
    this.updateStats = this.updateStats.bind(this);

    if (!localStorage.tictactoeWins) {
      localStorage.tictactoeWins = 0;
    }
    if (!localStorage.tictactoeLosses) {
      localStorage.tictactoeLosses = 0;
    }
    if (!localStorage.tictactoePushes) {
      localStorage.tictactoePushes = 0;
    }
  }

  setGameState(nextState) {
    this.setState(nextState);
  }

  //0 = loss, 1 = win, 2 = push
  updateStats(result) {
    if (result === 0) {
      localStorage.tictactoeLosses = parseInt(localStorage.tictactoeLosses) + 1;
    } else if (result === 1) {
      localStorage.tictactoeWins = parseInt(localStorage.tictactoeWins) + 1;
    } else {
      localStorage.tictactoeTies = parseInt(localStorage.tictactoeWins) + 1;
    }
  }

  render() {
    return (
      <div className="TicTacToe">
        <Stats
          game="TicTacToe"
          numWins={this.state.numWins}
          numLosses={this.state.numLosses}
          numPushes={this.state.numPushes}
        />
        <h1>This isn't implemented yet</h1>
      </div>
    );
  }
}

export default TicTacToe;
