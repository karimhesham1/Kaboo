class Player {
    constructor(name) {
      this.name = name;
      this.cards = [];
      this.currentvalue = 0;
    }

    drawCard()
    {
      this.cards.push(Deck.drawCard());
    }
  
    addCard(card) {
      this.cards.push(card);
    }
  
    removeCard(index) {
      return this.cards.splice(index, 1)[0];
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
  