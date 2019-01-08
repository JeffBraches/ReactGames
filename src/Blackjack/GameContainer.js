import React, { Component } from "react";
import Hand from "./Hand";
class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dealerCard1: -1,
      dealerCard2: -1,
      dealerCard3: -1,
      dealerCard4: -1,
      dealerCard5: -1,
      dealerHidden: -1,
      dealerHandValue: 0,
      playerCard1: -1,
      playerCard2: -1,
      playerCard3: -1,
      playerCard4: -1,
      playerCard5: -1,
      playerHandValue: 0,
      gameState: 0,
      result: "",
      deck: []
    };
    this.handleHit = this.handleHit.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleStay = this.handleStay.bind(this);
    this.calculatePlayerHand = this.calculatePlayerHand.bind(this);
    this.calculateDealerHand = this.calculateDealerHand.bind(this);
  }

  handleStart() {
    let cardDeck = [];
    let dealer1 = null;
    let dealer2 = null;
    let player1 = null;
    let player2 = null;
    let newCard = null;
    for (var i = 0; i < 52; i++) {
      cardDeck[i] = i;
    }

    //Dealer first two cards
    newCard = Math.floor(Math.random() * cardDeck.length + 1);
    dealer1 = cardDeck.splice(cardDeck[newCard], 1);
    newCard = Math.floor(Math.random() * cardDeck.length + 1);
    dealer2 = cardDeck.splice(cardDeck[newCard], 1);

    //Player first two cards
    newCard = Math.floor(Math.random() * cardDeck.length + 1);
    player1 = cardDeck.splice(cardDeck[newCard], 1);
    newCard = Math.floor(Math.random() * cardDeck.length + 1);
    player2 = cardDeck.splice(cardDeck[newCard], 1);

    this.setState(
      {
        gameState: 1,
        dealerCard1: dealer1,
        dealerCard2: -2,
        dealerHidden: dealer2,
        dealerCard3: -1,
        dealerCard4: -1,
        dealerCard5: -1,
        dealerHandValue: 0,
        playerCard1: player1,
        playerCard2: player2,
        playerCard3: -1,
        playerCard4: -1,
        playerCard5: -1,
        playerHandValue: 0,
        result: "",
        deck: cardDeck
      },
      this.calculatePlayerHand
    );
  }

  handleHit() {
    // New card logic
    let cardDeck = this.state.deck;
    let newCard = Math.floor(Math.random() * cardDeck.length + 1);
    cardDeck.splice(cardDeck[newCard], 1);

    // Which card to replace
    if (this.state.playerCard3 === -1) {
      this.setState(
        { playerCard3: newCard, deck: cardDeck },
        this.calculatePlayerHand
      );
    } else if (this.state.playerCard4 === -1) {
      this.setState(
        { playerCard4: newCard, deck: cardDeck },
        this.calculatePlayerHand
      );
    } else if (this.state.playerCard5 === -1) {
      this.setState(
        { playerCard5: newCard, deck: cardDeck },
        this.calculatePlayerHand
      );
    }
  }

  handleStay() {
    let cardDeck = this.state.deck;
    let newCard = Math.floor(Math.random() * cardDeck.length + 1);
    cardDeck.splice(cardDeck[newCard], 1);
    let newCard2 = Math.floor(Math.random() * cardDeck.length + 1);
    cardDeck.splice(cardDeck[newCard], 1);
    let newCard3 = Math.floor(Math.random() * cardDeck.length + 1);
    cardDeck.splice(cardDeck[newCard], 1);

    let newCardValue = (newCard % 13) + 1;
    let newCard2Value = (newCard2 % 13) + 1;
    let newCard3Value = (newCard3 % 13) + 1;

    let dealerHandValue = this.calculateDealerHand();
    let playerHandValue = this.calculatePlayerHand();

    if (dealerHandValue < 16) {
      //One Card
      dealerHandValue += newCardValue;
      if (dealerHandValue < 16) {
        //Two Cards
        dealerHandValue += newCard2Value;
        if (dealerHandValue < 16) {
          //Three Cards
          dealerHandValue += newCard3Value;
          this.setState({
            dealerCard3: newCard,
            dealerCard4: newCard2,
            dealerCard5: newCard3,
            dealerHandValue: dealerHandValue
          });
        } else {
          this.setState({
            dealerCard3: newCard,
            dealerCard4: newCard2,
            dealerHandValue: dealerHandValue
          });
        }
      } else {
        this.setState({
          dealerCard3: newCard,
          dealerHandValue: dealerHandValue
        });
      }
    }

    if (dealerHandValue > 21) {
      //dealer bust
      this.setState({
        result: "Win - Dealer Busted!",
        dealerCard2: this.state.dealerHidden,
        gameState: 2
      });
      this.props.updateStats(1);
    } else if (dealerHandValue > playerHandValue) {
      //dealer win
      this.setState({
        result:
          "Loss - Dealer has " +
          dealerHandValue +
          " and player has " +
          playerHandValue,
        dealerCard2: this.state.dealerHidden,
        gameState: 2
      });
      this.props.updateStats(0);
    } else if (dealerHandValue === playerHandValue) {
      //push
      this.setState({
        result:
          "Push - Dealer has " +
          dealerHandValue +
          " and player has " +
          playerHandValue,
        dealerCard2: this.state.dealerHidden,
        gameState: 2
      });
      this.props.updateStats(2);
    } else {
      //player win
      this.setState({
        result:
          "Win - Player has " +
          playerHandValue +
          " and dealer has " +
          dealerHandValue,
        dealerCard2: this.state.dealerHidden,
        gameState: 2
      });
      this.props.updateStats(1);
    }
    this.setState({ dealerCard2: this.state.dealerHidden, gameState: 2 });
  }

  handleBust() {
    let showCard = this.state.dealerHidden;
    this.setState({ dealerCard2: showCard, result: "Loss - Player Busted!" });
    this.props.updateStats(0);
  }

  calculatePlayerHand() {
    let playerHandValue = 0;
    let playerHasAce = false;
    let playerHasFacecard = false;
    let playerHandArray = [
      this.state.playerCard1,
      this.state.playerCard2,
      this.state.playerCard3,
      this.state.playerCard4,
      this.state.playerCard5
    ];

    playerHandArray.forEach(card => {
      let cardValue = (card % 13) + 1;
      if (cardValue > 10) {
        //Face cards
        playerHandValue += 10;
        playerHasFacecard = true;
      } else if (card % 13 === 0) {
        playerHasAce = true;
        playerHandValue += cardValue;
      } else {
        playerHandValue += cardValue;
      }
    });

    if (playerHasAce && playerHandValue < 12) {
      playerHandValue += 10;
    }

    if (playerHandValue > 21) {
      this.handleBust();
      this.setState({ playerHandValue: playerHandValue, gameState: 2 });
    }

    if (playerHasFacecard && playerHasAce && playerHandArray[2] === -1) {
      this.setState({
        result: "Win - Player has Blackjack!",
        gameState: 2,
        dealerCard2: this.state.dealerHidden
      });
      this.props.updateStats(1);
    }

    if (playerHandValue < 22 && playerHandArray[4] !== -1) {
      this.setState({
        result: "Win - Player has 5 cards without bust!",
        gameState: 2,
        dealerCard2: this.state.dealerHidden
      });
      this.props.updateStats(1);
    }
    return playerHandValue;
  }

  calculateDealerHand() {
    let dealerHandValue = 0;
    let dealerHasAce = false;
    let dealerHasFacecard = false;
    let dealerHandArray = [
      this.state.dealerCard1,
      this.state.dealerHidden,
      this.state.dealerCard3,
      this.state.dealerCard4,
      this.state.dealerCard5
    ];

    dealerHandArray.forEach(card => {
      let cardValue = (card % 13) + 1;
      if (cardValue > 9) {
        //Face cards
        dealerHandValue += 10;
      } else if (card % 13 === 0) {
        dealerHasAce = true;
        dealerHandValue += cardValue;
      } else {
        dealerHandValue += cardValue;
      }
    });

    if (dealerHasAce && dealerHandValue < 12) {
      dealerHandValue += 10;
    }

    if (dealerHandValue > 21) {
      this.setState({ gameState: 2 });
    }

    if (dealerHasFacecard && dealerHasAce && dealerHandArray[2] === -1) {
      this.setState({
        result: "Loss - Dealer has Blackjack!",
        gameState: 2,
        dealerCard2: this.state.dealerHidden
      });
      this.props.updateStats(0);
    }

    if (dealerHandValue < 22 && dealerHandArray[4] !== -1) {
      this.setState({
        result: "Loss - Dealer has 5 cards without bust!",
        gameState: 2,
        dealerCard2: this.state.dealerHidden
      });
      this.props.updateStats(0);
    }
    this.setState({ dealerHandValue: dealerHandValue });
    return dealerHandValue;
  }

  render() {
    if (this.state.gameState === 0) {
      return (
          <button
            className="gameStartButton"
            onClick={this.handleStart}
          >
            Start New Game
          </button>
      );
    } else if (this.state.gameState === 1) {
      return (
        <div className="gameContainer">
          <Hand
            card1={this.state.dealerCard1}
            card2={this.state.dealerCard2}
            card3={this.state.dealerCard3}
            card4={this.state.dealerCard4}
            card5={this.state.dealerCard5}
          />
          <div className="actioncontainer">
            <button
              className="actionbutton"
              id="hitbutton"
              onClick={this.handleHit}
            >
              Hit
            </button>
            <button
              className="actionbutton"
              id="staybutton"
              onClick={this.handleStay}
            >
              Stay
            </button>
          </div>

          <Hand
            card1={this.state.playerCard1}
            card2={this.state.playerCard2}
            card3={this.state.playerCard3}
            card4={this.state.playerCard4}
            card5={this.state.playerCard5}
          />
        </div>
      );
    } else if (this.state.gameState === 2) {
      return (
        <div className="gameContainer">
          <Hand
            card1={this.state.dealerCard1}
            card2={this.state.dealerCard2}
            card3={this.state.dealerCard3}
            card4={this.state.dealerCard4}
            card5={this.state.dealerCard5}
          />

          <div className="gameresults">
            <span>{this.state.result}</span>
            <button
              className="actionbutton"
              id="restartbutton"
              onClick={this.handleStart}
            >
              Start New Game
            </button>
          </div>

          <Hand
            card1={this.state.playerCard1}
            card2={this.state.playerCard2}
            card3={this.state.playerCard3}
            card4={this.state.playerCard4}
            card5={this.state.playerCard5}
          />
        </div>
      );
    }
  }
}

export default GameContainer;
