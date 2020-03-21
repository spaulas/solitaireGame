import React, { forwardRef, memo, useState } from "react";
import CardFrame from "./CardFrame";
import { RefAny } from "../../../global";
import backgroundImage from "../../../images/CardsBackPatterns/flowers.png";
import playCardImage from "../../../images/CardsFaces/Hearts/hearts12.png";

function CardFlippable(
  {
    offset,
    translation
  }: {
    offset?: number;
    translation?: number;
  },
  ref: RefAny
) {
  const [cardFlipped, setCardFlipped] = useState(false);
  const [animationStyle, setAnimationStyle] = useState({});

  const handleFlip = () => {
    if (!cardFlipped) {
      if (translation && translation !== 0) {
        setAnimationStyle({
          transform: `translate(${translation}px,0) rotateY(180deg)`
        });
      } else {
        setAnimationStyle({ transform: "rotateY(180deg)" });
      }
    }

    setCardFlipped(true);
  };

  return (
    <CardFrame ref={ref} offset={offset}>
      <div
        className="cardFlipContainer"
        // eslint-disable-next-line react/forbid-dom-props
        style={animationStyle}
      >
        <div className="cardFlipFront cardDefault">
          <img className="cardImage" src={playCardImage} alt="" />
        </div>
        <div className="cardFlipBack cardDefault" onClick={handleFlip}>
          <img className="cardImage" src={backgroundImage} alt="" />
        </div>
      </div>
    </CardFrame>
  );
}

export default memo(forwardRef(CardFlippable));
