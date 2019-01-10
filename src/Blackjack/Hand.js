import React, { Component } from 'react';
import './Blackjack.css';
import Card from './Card';
class Hand extends Component {
    constructor(props){
        super(props);
        this.state = {
            card1: this.props.card1,
            card2: this.props.card2,
            card3: this.props.card3,
            card4: this.props.card4,
            card5: this.props.card5,
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            card1: nextProps.card1,
            card2: nextProps.card2,
            card3: nextProps.card3,
            card4: nextProps.card4,
            card5: nextProps.card5
        })
    }
  render() {
    return (
      <div className="hand">
        <div className="cardContainer">
            <Card card={this.state.card1}/>
            <Card card={this.state.card2}/>
            <Card card={this.state.card3}/>
            <Card card={this.state.card4}/>
            <Card card={this.state.card5}/>
        </div>
      </div>
    );
  }
}

export default Hand;
