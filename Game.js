class Card
{
	constructor(rank, suit)
	{
		this.rank = rank;
		this.suit = suit;
		this.value = this._calculateValue(rank, suit);
	}
	
	
	_calculateValue(rank, suit) 
	{
		if (rank === "A")
		{
			return 1;
		} 
		else if (rank == "K" && (suit == "diamonds"  || suit == "hearts"))
		{
			return -1;
		}
		else if (["K", "Q", "J"].includes(rank)) 
		{
			return 10;
		} 
		else 
		{
			return parseInt(rank);
		}
	}


	compare(card) {
		if (this.rank === card.rank) {
		  return this.suit.localeCompare(card.suit);
		} else {
		  return this.rank.localeCompare(card.rank);
		}
	  }

	getRank() 
	{
		return this.rank
	}

	getSuit()
	{
		return this.suit
	}
	
	getValue()
	{
		return this.value
	}

	
}



class Deck {
  constructor() {
    this.cards = [];
    this.createDeck();
    this.shuffleDeck();
  }

  createDeck() {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    for (let suit in suits) {
      for (let rank in ranks) {
        this.cards.push(new Card(rank, suit));
      }
    }
  }

  shuffleDeck() {
    let currentIndex = this.cards.length;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [this.cards[currentIndex], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[currentIndex]];
    }
  }

  drawCard() {
    return this.cards.pop();
  }
}




class Player {
  constructor(name) {
    this.name = name;
    this.cards = [];
    this.points = 0;
  }

  addCard(card) {
    this.cards.push(card);
  }

  removeCard(index) {
    return this.cards.splice(index, 1)[0];    //removes the card at the specified index and returns it
  }

  updatepoints()
  {
    let tmp = 0;
    for(let i = 0 ; i<this.cards.length ; i++)
    {
      tmp = tmp + this.cards[i].getValue();
    }
    this.points = tmp;
  }

  

  getCard(index) {
    return this.cards[index];
  }

  getCards() {
    return this.cards;
  }

  getNumCards() {
    return this.cards.length;
  }

  hasCard(rank, suit) {
    return this.cards.some(card => card.rank === rank && card.suit === suit);
  }

  hasSpecialCard() {
    return this.cards.some(card => card.value === -1 || card.rank === 'J' || card.rank === 'Q' || card.rank === 'K');
  }
  
}



class Kaboo {
    constructor() {
      this.players = [new Player("alo 1"), new Player("alo 2"), new Player("alo 3"), new Player("alo 4")];
      this.deck = new Deck();
      this.discardPile = [];
      this.currentPlayerIndex = 0;
      this.kabooCalled = false;
      this.kabooCaller = null;
      this.counterKaboo = false;
      this.dealCards();
    }
  
    dealCards() {
      for (let i = 0; i < 4; i++) {
        for (const player of this.players) {
          player.addCard(this.deck.drawCard());
        }
      }
    }
  
    getCurrentPlayer() {
      return this.players[this.currentPlayerIndex];
    }
  
    nextPlayer() {
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }
  
    
    playCard(cardIndex) {
      const card = this.getCurrentPlayer().removeCard(cardIndex);
      this.discardPile.push(card);
      return card;
    }
  
    resolveCardEffect(card) {
        
      // Implement card effect logic

    }
  
    kaboo() {
      if (this.kabooCalled) return false;
  
      const player = this.getCurrentPlayer();
      player.updatePoints();
  
      if (player.points <= 3 || player.cards.length === 0) {
        this.kabooCalled = true;
        this.kabooCaller = player;
        return true;
      }
  
      return false;
    }
  
    counterKaboo() {
      if (!this.kabooCalled || this.counterKaboo) return false;
  
      const player = this.getCurrentPlayer();
      player.updatePoints();
  
      if (player.points < this.kabooCaller.points) {
        this.counterKaboo = true;
        return true;
      }
  
      return false;
    }
  
    isGameOver() {
      return this.kabooCalled && this.counterKaboo;
    }
  
    playRound() {
      if (this.isGameOver()) return;
  
      const currentcard = this.deck.drawCard();
      const currentPlayer = this.getCurrentPlayer();

      const discardbutton = document.querySelector('#discard-card');
      
      discardbutton.addEventListener('click', () => {
        this.discardPile = currentcard;
        console.log('discard card button clicked');
        console.log(this.discardPile);
        console.log(this.deck);
        this.nextPlayer();
        return;
      });
      
      
  
      // Implement game logic here, including swapping and discarding cards, and applying card effects
  
      this.nextPlayer();
    }


  }

  const game = new Kaboo();
  game.playRound();
  
  
  
  