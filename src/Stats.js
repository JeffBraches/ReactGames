import React, { Component } from 'react';

class Stats extends Component {
  render() {
    return (
      <div className="statContainer">
          <h3>Game: {this.props.game}</h3>
         <span className="statvalue">Wins: {this.props.numWins}</span>
         <span className="statvalue">Losses: {this.props.numLosses}</span>
         <span className="statvalue">Pushes: {this.props.numPushes}</span>
      </div>
    );
  }
}

export default Stats;
