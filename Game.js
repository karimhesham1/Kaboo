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
  
    resolveCardEffect(card) { //lesa abyad

      const currentPlayer = this.getCurrentPlayer();
    switch (card.value) {
      case 7:
      case 8: {
        const cardIndex = currentPlayer.selectCardIndex();
        if (cardIndex !== -1) {
          const selectedCard = currentPlayer.cards[cardIndex];
          currentPlayer.showCard(selectedCard);
        }
        break;
      }
      case 9:
      case 10: {
        const targetPlayer = this.players[currentPlayer.selectPlayerIndex(this.players)];
        const cardIndex = targetPlayer.selectCardIndex();
        if (cardIndex !== -1) {
          const selectedCard = targetPlayer.cards[cardIndex];
          currentPlayer.showCard(selectedCard);
        }
        break;
      }
      case 'Jack': {
        const targetIndex1 = currentPlayer.selectCardIndex();
        const targetIndex2 = currentPlayer.selectCardIndex();
        if (targetIndex1 !== -1 && targetIndex2 !== -1) {
          const tempCard = currentPlayer.cards[targetIndex1];
          currentPlayer.cards[targetIndex1] = currentPlayer.cards[targetIndex2];
          currentPlayer.cards[targetIndex2] = tempCard;
        }
        break;
      }
      case 'Queen': {
        const targetIndex = currentPlayer.selectCardIndex();
        if (targetIndex !== -1) {
          const targetCard = currentPlayer.cards[targetIndex];
          const ownIndex = currentPlayer.selectCardIndex();
          if (ownIndex !== -1) {
            const tempCard = currentPlayer.cards[ownIndex];
            currentPlayer.cards[ownIndex] = targetCard;
            currentPlayer.showCard(tempCard);
          }
        }
        break;
      }
      case 'King': {
        const targetIndex1 = currentPlayer.selectCardIndex();
        const targetIndex2 = currentPlayer.selectCardIndex();
        if (targetIndex1 !== -1 && targetIndex2 !== -1) {
          const targetCard1 = currentPlayer.cards[targetIndex1];
          const targetCard2 = currentPlayer.cards[targetIndex2];
          const shouldSwap = currentPlayer.confirmAction(`Do you want to swap ${targetCard1.toString()} and ${targetCard2.toString()}?`);
          if (shouldSwap) {
            currentPlayer.cards[targetIndex1] = targetCard2;
            currentPlayer.cards[targetIndex2] = targetCard1;
          }
        }
        break;
      }
      default:
        break;
    }
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
  