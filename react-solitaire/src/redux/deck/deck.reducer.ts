/* eslint-disable indent */
import DeckActionTypes, { CardsPile, cardsConfigurations } from "./deck.types";
import { createRandomDeck, getTranslationY, popDeckCard } from "./deck.utils";
import { ActionsCreators } from "./deck.actions";
import { RefAny } from "../../global";

interface InitialDeck {
  deckPile: Array<CardsPile>;
  flippedPile: Array<CardsPile>;
  translationX: number;
  translationY: number;
  deckRef: RefAny;
  flippedRef: RefAny;
}

const INITIAL_DECK: InitialDeck = {
  deckPile: [],
  flippedPile: [],
  translationX: 243.75,
  translationY: cardsConfigurations.deck,
  deckRef: undefined,
  flippedRef: undefined
};

const deckReducer = (state = INITIAL_DECK, action: ActionsCreators) => {
  switch (action.type) {
    // to be changed once it has the connection to firebase
    case DeckActionTypes.GET_DECK_CARDS:
      return state;
    case DeckActionTypes.FLIP_DECK_PILE:
      const { deckPile, flippedPile } = popDeckCard(
        state.deckPile,
        state.flippedPile,
        action.cardId
      );
      const translationY = getTranslationY(deckPile, flippedPile);
      return {
        ...state,
        deckPile,
        flippedPile,
        translationY
      };
    case DeckActionTypes.SET_REFS:
      return {
        ...state,
        deckRef: action.deckRef,
        flippedRef: action.flippedRef
      };
    case DeckActionTypes.SET_TRANSLATION:
      return { ...state, translationX: action.translation };
    case DeckActionTypes.CREATE_DECK:
      const newDeckPile = createRandomDeck();
      return { ...state, deckPile: newDeckPile };
    default:
      return state;
  }
};

export default deckReducer;
