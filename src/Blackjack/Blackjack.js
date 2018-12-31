import React, { Component } from "react";
import "./Blackjack.css";
import GameContainer from "./GameContainer";
import Stats from "../Stats";
class Blackjack extends Component {
  constructor(props) {
    super(props);

    if (!localStorage.blackjackWins) {
      localStorage.blackjackWins = 0;
      localStorage.blackjackLosses = 0;
      localStorage.blackjackPushes = 0;
      this.state = {
        gameState: 0,
        gameResult: null,
        numWins: 0,
        numLosses: 0,
        numPushes: 0
      };
    } else {
      this.state = {
        gameState: 0,
        gameResult: null,
        numWins: parseInt(localStorage.blackjackWins, 10),
        numLosses: parseInt(localStorage.blackjackLosses, 10),
        numPushes: parseInt(localStorage.blackjackPushes, 10)
      };
    }

    this.setGameState = this.setGameState.bind(this);
    this.updateStats = this.updateStats.bind(this);
    this.handleScoreReset = this.handleScoreReset.bind(this);
  }

  setGameState(nextState) {
    this.setState(nextState);
  }

  handleScoreReset() {
    localStorage.blackjackWins = 0;
    localStorage.blackjackLosses = 0;
    localStorage.blackjackPushes = 0;
    this.setState({
      numWins: 0,
      numLosses: 0,
      numPushes: 0
    })
  }
  //0 = loss, 1 = win, 2 = push
  updateStats(result) {
    if (result === 0) {
      this.setState({
        numLosses: this.state.numLosses + 1
      });
      localStorage.blackjackLosses = parseInt(localStorage.blackjackLosses, 10) + 1;
    } else if (result === 1) {
      this.setState({
        numWins: this.state.numWins + 1
      });
      localStorage.blackjackWins = parseInt(localStorage.blackjackWins, 10) + 1;
    } else {
      this.setState({
        numPushes: this.state.numPushes + 1
      });
      localStorage.blackjackPushes = parseInt(localStorage.blackjackPushes, 10) + 1;
    }
  }

  render() {
    return (
      <div className="Blackjack">
        <h1 className="title">ReactJack</h1>
        <Stats
          game="Blackjack"
          aLabel="Wins: "
          aValue={this.state.numWins}
          bLabel="Losses: "
          bValue={this.state.numLosses}
          cLabel="Pushes: "
          cValue={this.state.numPushes}
          handleScoreReset = {this.handleScoreReset}
        />
        <GameContainer
          setGameState={this.setGameState}
          updateStats={this.updateStats}
        />
      </div>
    );
  }
}

export default Blackjack;
