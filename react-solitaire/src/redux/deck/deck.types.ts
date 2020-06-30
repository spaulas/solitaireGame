// Deck Actions
const DeckActionTypes = {
  SET_INITIAL_DECK: "DECK/SET_INITIAL_DECK",
  SET_REFS: "DECK/SET_REFS",
  SET_TRANSLATION: "DECK/SET_TRANSLATION",
  FLIP_DECK_PILE: "DECK/FLIP_DECK_PILE",
  UNDO_FLIP_DECK_PILE: "DECK/UNDO_FLIP_DECK_PILE",
  RESET_DECK: "DECK/RESET_DECK",
  UNDO_RESET_DECK: "DECK/UNDO_RESET_DECK",
  DRAG_FLIPPED_CARD: "DECK/DRAG_FLIPPED_CARD",
  REMOVE_CARD_FROM_FLIPPED: "DECK/REMOVE_CARD_FROM_FLIPPED",
  RESET_FLIPPED_CARD_DRAGGING: "DECK/RESET_FLIPPED_CARD_DRAGGING",
  ADD_CARD_TO_FLIPPED: "DECK/ADD_CARD_TO_FLIPPED",
  HANDLE_DOUBLE_CLICK: "DECK/HANDLE_DOUBLE_CLICK"
};

export default DeckActionTypes;
