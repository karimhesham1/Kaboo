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
  
      const card = this.deck.drawCard();
      const currentPlayer = this.getCurrentPlayer();

  
      // Implement game logic here, including swapping and discarding cards, and applying card effects
  
      this.nextPlayer();
    }
  }
  
  const game = new Kaboo();
  while (!game.isGameOver()) {
    game.playRound();
  }
  