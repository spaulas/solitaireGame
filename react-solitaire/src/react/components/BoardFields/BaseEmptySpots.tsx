import { Button, Row } from "antd";
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardSpot } from "../Cards/Cards.items";
import { RedoOutlined } from "@ant-design/icons";
import { RootReducerState } from "../../../global";
import _debounce from "lodash.debounce";
import deckActions from "../../../redux/deck/deck.actions";

/**
 * Base Layout with all the empty card spots
 */
function BaseEmptySpots() {
  const dispatch = useDispatch();
  // get refs from redux
  const { deckRef, flippedRef } = useSelector(({ Deck }: RootReducerState) => ({
    deckRef: Deck.deckRef,
    flippedRef: Deck.flippedRef
  }));

  /**
   * Sets a new translation value for the deck cards to the flipped pile
   */
  const setTranslation = () => {
    // if the refs are not null
    if (deckRef && deckRef.current && flippedRef.current) {
      // get the x position of the deck pile
      const deckX = deckRef.current.getBoundingClientRect().x;
      // get the x position of the flipped pile
      const flippedX = flippedRef.current.getBoundingClientRect().x;
      // save the distance at the redux
      dispatch(deckActions.setTranslation(flippedX - deckX));
    }
  };

  // Only called when the component is mounted and when the deckRef is set
  useEffect(setTranslation, [deckRef]);

  useEffect(() => {
    // debounce assures that the function is only called once every 100 ms
    const handleResize = _debounce(() => {
      setTranslation();
    }, 100);

    // add event listener for the window
    window.addEventListener("resize", handleResize);

    return () => {
      // remove event listener when the component is unmounted
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div className="baseEmptySpots">
      <Row gutter={6} className="boardDeckRow" align="middle">
        {/* Deck and Flipped piles */}
        <CardSpot ref={deckRef} offset={2} className="deckCardSpot">
          {/* Button to reset deck */}
          <Button
            className="redoDeckButton"
            onClick={() => dispatch(deckActions.resetDeck())}
          >
            <RedoOutlined />
          </Button>
        </CardSpot>
        <CardSpot ref={flippedRef} />
        {/* Goal Spots */}
        <CardSpot offset={3} />
        <CardSpot />
        <CardSpot />
        <CardSpot />
      </Row>
      <Row gutter={6} align="middle">
        {/* Game Columns */}
        <CardSpot offset={2} />
        <CardSpot />
        <CardSpot />
        <CardSpot />
        <CardSpot />
        <CardSpot />
        <CardSpot />
      </Row>
    </div>
  );
}

export default memo(BaseEmptySpots);