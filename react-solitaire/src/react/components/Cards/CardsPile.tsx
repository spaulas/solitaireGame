/* eslint-disable no-console */
/* eslint-disable indent */
/* eslint-disable react/no-multi-comp */
import React, { forwardRef, memo } from "react";
import CardFlippable from "./CardFlippable";
import CardFrame from "./CardFrame";
import CardSpot from "./CardSpot";
import { Col } from "antd";
import { RefAny } from "../../../global";
import playCardImage from "../../../images/CardsFaces/Hearts/hearts12.png";

export interface CardInfo {
  id: number;
  cardType: string;
  translation?: number;
  name: string;
}

interface CardsPileProps {
  offset?: number;
  cardsArray?: Array<CardInfo>;
  handleCardSwap?: (card: CardInfo) => void;
}

function CardsPile(
  {
    offset,
    cardsArray = [{ id: -1, cardType: "spot", name: "defaultSpot" }],
    handleCardSwap
  }: CardsPileProps,
  ref: RefAny
) {
  const removeCard = (card: CardInfo) => {
    if (handleCardSwap) {
      handleCardSwap(card);
    }
  };
  const printCard = (index: number) => {
    const card: CardInfo = cardsArray[index];
    switch (card?.cardType) {
      case "spot":
        return <CardSpot ref={ref} />;
      case "deck":
        return (
          <CardFlippable
            ref={ref}
            removeCard={() => removeCard(card)}
            translation={card.translation}
          />
        );
      case "flipped":
        return (
          <CardFrame ref={ref}>
            <div className="cardDefault">
              <img className="cardImage" src={playCardImage} alt="" />
            </div>
          </CardFrame>
        );
      default:
        return <CardFlippable ref={ref} />;
    }
  };

  const getTopCard = () => {
    const topIndex = cardsArray.length - 1;
    console.log("topcard = ", topIndex);
    return printCard(topIndex);
  };

  const getBottomCards = () => {
    const bottomCardsArray = [];
    for (let i = 0; i < cardsArray.length - 1; i++) {
      bottomCardsArray.push(printCard(i));
    }
    bottomCardsArray.push(<CardSpot ref={ref} />);
    return bottomCardsArray;
  };

  return (
    <Col className="cardPile" span={3} offset={offset}>
      <div className="cardPileContainerTop">{getTopCard()}</div>
      <div className="cardPileContainerBottom">{getBottomCards()}</div>
    </Col>
  );
}

export default memo(forwardRef(CardsPile));
