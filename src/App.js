import React, { Component } from "react";
import Blackjack from "./Blackjack";
import TicTacToe from "./TicTacToe";
import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: ""
    };

    this.blackjackSelect = this.blackjackSelect.bind(this);
    this.tictactoeSelect = this.tictactoeSelect.bind(this);

  }

  blackjackSelect(){
      this.setState({
          game: "blackjack"
      })
  }

  tictactoeSelect(){
      this.setState({
          game: "tictactoe"
      })
  }
  render() {
    return (
      <div>
          <h1>React Games</h1>
        <div className="gameSelector">
          <button onClick={this.blackjackSelect} className="actionButton">Blackjack</button>
          <button onClick={this.tictactoeSelect} className="actionButton">TicTacToe</button>
        </div>
        <div className="gameContainer">
        {this.state.game === "" ? <h2>Please select a game from above</h2> : null}
          {this.state.game === "blackjack" ? <Blackjack /> : null}
          {this.state.game === "tictactoe" ? <TicTacToe /> : null}
        </div>
      </div>
    );
  }
}

export default App;
