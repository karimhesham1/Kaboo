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

// const card = new Card("9", 'heart');
// console.log(card.getRank()); 
// console.log(card.getSuit()); 
// console.log(card.getValue());


