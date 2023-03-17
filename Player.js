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
  