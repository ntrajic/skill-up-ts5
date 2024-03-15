interface ICardComponent {
    add(component: ICardComponent): void;
    remove(component: ICardComponent): void;
    get(index: number): ICardComponent;
    display(): string;
}

class CardDeck implements ICardComponent {
    private _deck: ICardComponent[] = [];

    add(component: ICardComponent): void {
        if(component) {
            this._deck.push(component);
        }
        else {
            throw new Error("Invalid component");
        }
    }    
    
    remove(component: ICardComponent): void {
        if(!component) {
            throw new Error("Invalid component");
        }
        else {
            this._deck = this._deck.filter(comp => comp != component);
        }
    }
    
    get(index: number): ICardComponent {
        if(index < 0 || index >= this._deck.length) {
            throw new Error("Invalid index");
        }
        return this._deck[index];
    }
    
    display(): string {
        return this._deck.map(component => component.display()).join("\n");
    }


}

class Card implements ICardComponent {
    add(component: ICardComponent): void {
        throw new Error("Operation not supported");
    }

    remove(component: ICardComponent): void {
        throw new Error("Operation not supported");
    }

    get(index: number): ICardComponent {
        throw new Error("Operation not supported");
    }

    display(): string {
        return `${this.name}: ${this.attack} / ${this.defense}`;
    }


    constructor(public name: string, public attack: number, public defense: number) {}
}

// MAINLINE
let cardDeck = new CardDeck();

cardDeck.add(new Card("Card 1", 34, 56));
cardDeck.add(new Card("Card 2", 12, 34));

let secondDeck = new CardDeck();
secondDeck.add(new Card("Card 3", 34, 56));
secondDeck.add(new Card("Card 4", 12, 34));

cardDeck.add(secondDeck);
cardDeck.add(new Card("Card 5", 99, 100));

console.log(cardDeck.display());

// \design-patterns> tsc
// \design-patterns> node .\build\facade.js 
// OUT:     
// Card 1: 34 / 56
// Card 2: 12 / 34
// Card 3: 34 / 56
// Card 4: 12 / 34
// Card 5: 99 / 100