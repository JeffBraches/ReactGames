import React, { Component } from "react";
import Blackjack from "./Blackjack";
import TicTacToe from "./TicTacToe";
import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null
    };

    this.blackjackSelect = this.blackjackSelect.bind(this);
    this.tictactoeSelect = this.tictactoeSelect.bind(this);
  }

  blackjackSelect() {
    this.setState({
      game: "blackjack"
    });
  }

  tictactoeSelect() {
    this.setState({
      game: "tictactoe"
    });
  }
  render() {
    return (
      <div>
        {!this.state.game ? (
          <div>
            <h1 className="appHeader">React Games</h1>
            <div className="gameSelectContainer">
              {!this.state.game ? (
                <h2 className="gameSelectHeader">
                  Please select a game from below
                </h2>
              ) : null}
              <button
                onClick={this.blackjackSelect}
                className="gameSelectButton"
              >
                BlackJack
              </button>
              <button
                onClick={this.tictactoeSelect}
                className="gameSelectButton"
              >
                TicTacToe
              </button>
            </div>
          </div>
        ) : null}
        <div>
          {this.state.game === "blackjack" ? <Blackjack /> : null}
          {this.state.game === "tictactoe" ? <TicTacToe /> : null}
        </div>
      </div>
    );
  }
}

export default App;
