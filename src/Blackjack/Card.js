import React, { Component } from "react";
import "./Blackjack.css";

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardSource: "",
      cardSuit: -1,
      cardValue: -1
    };

    this.setCardSource = this.setCardSource.bind(this);
    this.setCardSuit = this.setCardSuit.bind(this);
    this.setCardValue = this.setCardValue.bind(this);
  }

  componentDidMount() {
    this.setCardSuit(this.props.card);
    this.setCardValue(this.props.card);
    this.setCardSource(this.props.card);
  }

  componentDidUpdate(oldProps) {
    if (JSON.stringify(oldProps) !== JSON.stringify(this.props)) {
      this.setCardSuit(this.props.card);
      this.setCardValue(this.props.card);
      this.setCardSource(this.props.card);
    }
  }
  setCardSuit(card) {
    this.setState({
      cardSuit: Math.floor(card / 13)
    });
  }

  setCardValue(card) {
    this.setState({
      cardValue: Math.floor(card % 13)
    });
  }

  setCardSource(card) {
    let cardValue = Math.floor(card % 13);
    let cardSuit = Math.floor(card / 13);
    let cardUrl = "./cards/";
    if (this.props.card === -1) {
      this.setState({
        cardSource: "./cards/empty.png"
      });
      return;
    } else {
      switch (cardValue) {
        case -2:
          cardUrl = cardUrl.concat("card_back.png");
          break;
        case 0:
          cardUrl = cardUrl.concat("ace_of_");
          break;
        case 1:
          cardUrl = cardUrl.concat("2_of_");
          break;
        case 2:
          cardUrl = cardUrl.concat("3_of_");
          break;
        case 3:
          cardUrl = cardUrl.concat("4_of_");
          break;
        case 4:
          cardUrl = cardUrl.concat("5_of_");
          break;
        case 5:
          cardUrl = cardUrl.concat("6_of_");
          break;
        case 6:
          cardUrl = cardUrl.concat("7_of_");
          break;
        case 7:
          cardUrl = cardUrl.concat("8_of_");
          break;
        case 8:
          cardUrl = cardUrl.concat("9_of_");
          break;
        case 9:
          cardUrl = cardUrl.concat("10_of_");
          break;
        case 10:
          cardUrl = cardUrl.concat("jack_of_");
          break;
        case 11:
          cardUrl = cardUrl.concat("queen_of_");
          break;
        case 12:
          cardUrl = cardUrl.concat("king_of_");
          break;
        default:
          cardUrl = cardUrl.concat("card_back.png");
          break;
      }

      switch (cardSuit) {
        case 0:
          cardUrl = cardUrl.concat("clubs.png");
          break;
        case 1:
          cardUrl = cardUrl = cardUrl.concat("diamonds.png");
          break;
        case 2:
          cardUrl = cardUrl = cardUrl.concat("hearts.png");
          break;
        case 3:
          cardUrl = cardUrl = cardUrl.concat("spades.png");
        default:
          cardUrl = cardUrl.concat("card_back.png");
          break;
      }
    }

    console.log("cardurl: " + cardUrl);
    this.setState({
      cardSource: cardUrl
    });
  }
  render() {
    return <img className="card" src={this.state.cardSource} />;
  }
}

export default Card;
