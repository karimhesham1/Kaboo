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
  