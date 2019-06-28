import React, {Component} from 'react';
import axios from 'axios';
import Card from './Card';
import './Deck.css';
import logo from './logo.svg';

const API_URL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // eventually will be response from very first request
            deck: null,
            drawnCards: []
        }
        this.getCard = this.getCard.bind(this);
    }
    async componentDidMount() {
        let deck = await axios.get(API_URL);
        this.setState({deck: deck.data})
    }
    async getCard() {
        try {
            let url1 = "https://deckofcardsapi.com/api/deck/";
            let url2 = "/draw/?count=1"
            let cardResponse = await axios.get(`${url1}${this.state.deck.deck_id}${url2}`);
            if(!cardResponse.data.success) {
                throw new Error("No card remaining!")
            }
            let card = cardResponse.data.cards[0];
            this.setState(st => ({
                drawnCards: [...st.drawnCards, {id: card.code, image: card.image, name: `${card.value} of ${card.suit}`}]
            }));
        } catch(error) {
            alert(error);   
        }

    }
    render() {
        const cards = this.state.drawnCards.map(card => (
            <Card key={card.id} name={card.name} image={card.image} />
        ))
        return (
            <div className="Deck">
                <h1 className="Deck-title"><span><img style={{display: "inline"}} src={logo} className="App-logo"/></span>Card Dealer<span><img style={{display: "inline"}} src={logo} className="App-logo"/></span></h1>
                <h2 className="Deck-subtitle">A Simple Demo made with React</h2>
                <button onClick={this.getCard}>Hit Me, Johnny!</button>
                <div className="Deck-cardarea">
                    {cards}
                </div>
            </div>
        )
    }
}

export default Deck;