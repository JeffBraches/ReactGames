import React, { Component } from 'react';
import './Blackjack.css';
import GameContainer from './GameContainer'
import Stats from './Stats'
class Blackjack extends Component {

  constructor(props){
    super(props);

    this.state = {
      gameState: 0,
      gameResult: null,
      numWins: 0,
      numLosses: 0,
      numPushes: 0
    }

    this.setGameState = this.setGameState.bind(this);
    this.updateStats = this.updateStats.bind(this);
  }

  setGameState(nextState){
    this.setState(nextState);
  }

  //0 = loss, 1 = win, 2 = push
  updateStats(result){
    if (result === 0){
      this.setState({
        numLosses: this.state.numLosses+1
      })
    } else if (result === 1){
      this.setState({
        numWins: this.state.numWins+1
      })
    } else {
      this.setState({
        numPushes: this.state.numPushes+1
      })
    }
  }

  render() {
    return (
      <div className="Blackjack">
        <h1 className="title">ReactJack</h1>
        <Stats numWins={this.state.numWins} numLosses={this.state.numLosses} numPushes={this.state.numPushes}/>
        <GameContainer setGameState={this.setGameState} updateStats={this.updateStats}/>
      </div>
    );
  }
}

export default Blackjack;
