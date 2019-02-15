import React, { Component } from 'react';
import { Button, Input } from 'antd';
import '../styles/Game.css';
import CardView from './CardView';
import MemoryCards from './Cards';

class Game extends Component {
  constructor(props) {
    super(props);
    this.memoryCards = new MemoryCards();
    this.state = {
        username: '',
        hiscoreRes: false
    }
  }

  componentWillMount() {
    this.initGame();
    if (!localStorage.getItem("Users")) {
        localStorage.setItem("Users", JSON.stringify([]));
    }
  }

  initGame() {
    this.memoryCards.generateCardSet();
    this.setState({
      turnNo : 1,
      pairsFound : 0,
      numClicksWithinTurn : 0,
      firstId : undefined,
      secondId : undefined
    });
  }

  onHiscoreAdd = () => {
      if (this.state.username !== '') {
        let users = JSON.parse(localStorage.getItem("Users"));
        users.push({name: this.state.username, score: (this.state.turnNo - 1)})
        localStorage.setItem("Users", JSON.stringify(users))
        this.setState({
            hiscoreRes: true
        })
      }
  }

  handleChange = (event) => {
      this.setState({
        hiscoreRes: false,
        username: event.target.value
      })
  }

  getCardViews() {
    let cardViews = [];
    let onClick = this.onCardClicked;
    this.memoryCards.cards.forEach(c => {
      let cardView = <CardView key={c.id} 
          id={c.id} 
          image={c.image}
          imageUp = {c.imageUp}
          matched = {c.matched} 
          onClick={onClick}/>;
          cardViews.push(cardView);
    });
    return cardViews;
  }

  clearCards(id1,id2) {
    if (this.state.numClicksWithinTurn !== 2) {
      return;
    }
    this.memoryCards.flipCard(this.state.firstId, false);
    this.memoryCards.flipCard(this.state.secondId, false);
    this.setState({
      firstId: undefined,
      secondId: undefined,
      numClicksWithinTurn: 0,
      turnNo : this.state.turnNo+1
    });
  }

  onCardClicked = (id, image) => {
    if (this.state.numClicksWithinTurn === 0 || this.state.numClicksWithinTurn === 2) {
      if (this.state.numClicksWithinTurn === 2) {
        clearTimeout(this.timeout);
        this.clearCards(this.state.firstId, this.state.secondId);        
      }
      this.memoryCards.flipCard(id, true);
      this.setState({
        firstId : id,
        numClicksWithinTurn : 1
      });
    } else if (this.state.numClicksWithinTurn === 1) {
      this.memoryCards.flipCard(id, true);
      this.setState({
        secondId : id,
        numClicksWithinTurn : 2
      });

      if (this.memoryCards.cardsHaveIdenticalImages(id, this.state.firstId)) {
        this.memoryCards.setCardAsMatched(this.state.firstId, true);
        this.memoryCards.setCardAsMatched(id, true);
        this.setState({
          pairsFound: this.state.pairsFound+1,
          firstId: undefined,
          secondId: undefined,
          turnNo : this.state.turnNo+1,
          numClicksWithinTurn: 0
        });

      } else {
        this.timeout = setTimeout(() => { 
          this.clearCards(this.state.firstId, this.state.secondId);
        }, 2000); 
      }

    }
  }

  onPlayAgain = () => {
    this.initGame();
  }

  render() {
    let cardViews = this.getCardViews();
    let gameStatus = <div className='Game-status'>
                      <div>Turn: {this.state.turnNo}</div>
                      <div>Pairs found: {this.state.pairsFound}</div>
                    </div>;

    if (this.state.pairsFound === this.memoryCards.NUM_IMAGES) {
      gameStatus = <div className='Game-status'>
                    <div>GAME COMPLETE!</div>
                    <div>You used {this.state.turnNo-1} turns</div>
                    <div><Button type="primary" size="large" onClick={this.onPlayAgain} style={{margin: '11px auto'}}>Play again?</Button></div></div>;                          
    }

    return (
      <div className='Game'>
        <div>
          {gameStatus}
        </div>
        <div className='CardContainer'>
          {cardViews}
        </div>
        <div className='Game-status'>
          {this.state.pairsFound >= this.memoryCards.NUM_IMAGES ? <div style={{display: 'inline-block'}}> <div style={{display: 'inline-block', paddingBottom: '11px'}}> Add yourself to the Hiscores: </div> <Input onChange={this.handleChange} style={{maxWidth: '400px', height: '40px'}} placeholder="Your name" /> <Button type="primary" size="large" onClick={this.onHiscoreAdd} style={{height: '40px', margin: '10px'}}>ADD</Button></div> : null }
          {this.state.hiscoreRes !== false ? <div> {this.state.username} successfully added to hiscores! </div> : null }
        </div>
      </div>
    );
  }
}

export default Game;
