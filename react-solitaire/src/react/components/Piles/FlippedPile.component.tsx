import React, { memo } from "react";
import { CardType } from "../../../redux/gameBoard/gameBoard.types";
import DraggableCard from "../CardMoveHandlers/DragHandlers/DraggableCard.component";
import { RootReducerState } from "../../../global";
import SimplePile from "./SimplePile.component";
import { useSelector } from "react-redux";

/**
 * Component that consists of a pile (3d) of flipped cards that can be dragged
 */
function FlippedPile() {
  // get piles from redux
  const { flippedPile } = useSelector(({ Deck }: RootReducerState) => ({
    flippedPile: Deck.flippedPile
  }));

  // return a pile of flipped cards
  return (
    <SimplePile
      pileId="flippedPile"
      pileCards={flippedPile.map((card: CardType) => (
        <DraggableCard
          card={card}
          nCards={1}
          key={card.id}
          onDoubleClick={() =>
            // eslint-disable-next-line no-console
            console.log(
              "call redux function to hanle flipped pile double click!"
            )
          }
        />
      ))}
      pileClassName="deckPile flippedPile"
      insideClassName="columnPile"
    />
  );
}

export default memo(FlippedPile);
