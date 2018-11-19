import React, { Component } from "react";
import Stats from "../Stats"
import GameContainer from "./GameContainer"
import "./TicTacToe.css";

class TicTacToe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: 0,
      gameResult: null,
      numOWins: 0,
      numXWins: 0,
      numTies: 0
    };

    this.setGameState = this.setGameState.bind(this);
    this.updateStats = this.updateStats.bind(this);

    if (!localStorage.tictactoeOWins) {
      localStorage.tictactoeOWins = 0;
    }
    if (!localStorage.tictactoeXWins) {
      localStorage.tictactoeXWins = 0;
    }
    if (!localStorage.tictactoeTies) {
      localStorage.tictactoeTies = 0;
    }
  }

  setGameState(nextState) {
    this.setState(nextState);
  }

  //0 = O Wins, 1 = X Wins, 2 = Tie
  updateStats(result) {
    if (result === 0) {
      this.setState({
        numOWins: this.state.numOWins+1
      })
      localStorage.tictactoeOWins = parseInt(localStorage.tictactoeOWins, 10) + 1;
    } else if (result === 1) {
      this.setState({
        numXWins: this.state.numXWins+1
      });
      localStorage.tictactoeXWins = parseInt(localStorage.tictactoeXWins, 10) + 1;
    } else {
      this.setState({
        numTies: this.state.numTies+1
      });
      localStorage.tictactoeTies = parseInt(localStorage.tictactoeTies, 10) + 1;
    }
  }

  render() {
    return (
      <div className="TicTacToe">
        <Stats
          game="TicTacToe"
          aLabel="O Wins: "
          aValue={this.state.numOWins}
          bLabel="X Wins: "
          bValue={this.state.numXWins}
          cLabel="Ties: "
          cValue={this.state.numTies}
        />
        <GameContainer />
      </div>
    );
  }
}

export default TicTacToe;
