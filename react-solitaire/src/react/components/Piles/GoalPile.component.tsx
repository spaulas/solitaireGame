import React, { forwardRef, memo } from "react";
import { CardSpot } from "../Cards/Cards.items";
import { CardType } from "../../../redux/gameBoard/gameBoard.types";
import DraggableCard from "../Cards/DraggableCard.component";
import { RootReducerState } from "../../../global";
import SimplePile from "./SimplePile.component";
import { useSelector } from "react-redux";

interface GoalPileProps {
  goalId: string;
  offset?: number;
}

/**
 * Component that consists of a pile (3d) of flipped cards that can be dragged
 */
function GoalPile({ goalId, offset }: GoalPileProps) {
  // get piles from redux
  const { goalPile } = useSelector(({ Goal }: RootReducerState) => ({
    goalPile: Goal.goals[goalId]
  }));

  // renders cards components that can be dragged
  const getCards = () => {
    const cardsArray = goalPile.map((card: CardType) => (
      <DraggableCard card={card} nCards={1} key={card.id} />
    ));
    return cardsArray;
  };

  if (goalPile.length > 0) {
    // return a pile of flipped cards
    return (
      <SimplePile
        offset={offset}
        pileId={goalId}
        getCards={getCards}
        pileClassName="cardPile"
      />
    );
  }
  // has to return something, to "fill" the space
  return <CardSpot offset={offset} />;
}

export default memo(forwardRef(GoalPile));
