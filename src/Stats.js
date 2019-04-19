import React, { Component } from "react";

class Stats extends Component {
  render() {
    return (
      <div className="statContainer">
        <span className="statValue">
          {this.props.aLabel} {this.props.aValue}
        </span>
        <span className="statValue">
          {this.props.bLabel} {this.props.bValue}
        </span>
        <span className="statValue">
          {this.props.cLabel} {this.props.cValue}
        </span>
        <button
          onClick={this.props.handleScoreReset}
          className="resetStatsButton"
        >
          Reset Stats
        </button>
      </div>
    );
  }
}

export default Stats;
