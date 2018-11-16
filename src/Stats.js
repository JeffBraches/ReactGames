import React, { Component } from 'react';

class Stats extends Component {
  render() {
    return (
      <div className="statContainer">
          <h3>Game: {this.props.game}</h3>
         <span className="statvalue">{this.props.aLabel} {this.props.aValue}</span>
         <span className="statvalue">{this.props.bLabel} {this.props.bValue}</span>
         <span className="statvalue">{this.props.cLabel} {this.props.cValue}</span> <br />
         <button onClick={this.props.handleScoreReset}>Reset Stats</button>
      </div>
    );
  }
}

export default Stats;
