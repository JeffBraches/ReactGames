import React, { Component } from "react";
import "./Blackjack.css";
import GameContainer from "./GameContainer";
import Stats from "./Stats";
class Blackjack extends Component {
  constructor(props) {
    super(props);

    if (!localStorage){
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
    } else{
      this.state = {
        gameState: 0,
        gameResult: null,
        numWins: parseInt(localStorage.blackjackWins),
        numLosses: parseInt(localStorage.blackjackLosses),
        numPushes: parseInt(localStorage.blackjackPushes)
      };
    }
    

    this.setGameState = this.setGameState.bind(this);
    this.updateStats = this.updateStats.bind(this);
  }

  setGameState(nextState) {
    this.setState(nextState)
  }

  //0 = loss, 1 = win, 2 = push
  updateStats(result) {
    if (result === 0) {
      this.setState({
        numLosses: this.state.numLosses+1
      });
      localStorage.blackjackLosses = parseInt(localStorage.blackjackLosses) + 1;
    } else if (result === 1) {
      this.setState({
        numWins: this.state.numWins+1
      });
      localStorage.blackjackWins = parseInt(localStorage.blackjackWins) + 1;

    } else {
      this.setState({
        numPushes: this.state.numPushes+1
      });
      localStorage.blackjackPushes = parseInt(localStorage.blackjackPushes) + 1;

    }
  }

  render() {
    return (
      <div className="Blackjack">
        <h1 className="title">ReactJack</h1>
        <Stats
          game="Blackjack"
          numWins={this.state.numWins}
          numLosses={this.state.numLosses}
          numPushes={this.state.numPushes}
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
