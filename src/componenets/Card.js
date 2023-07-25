import React, { useState } from "react";
import { CARD_HEIGHT, CARD_WIDTH, backimg } from "../constants";
import back from "../imges/back.png"; // Import the local image
const Card = ({ cardData, onClick }) => {
  const { id, isFlipped, isMatched, imageUrl } = cardData;

  const handleClick = () => {
    if (!isMatched) {
      onClick(id);
    }
  };

  return (
    <div
      style={{ width: `${CARD_WIDTH}px`, height: `${CARD_HEIGHT}px` }}
      className={`card ${isFlipped ? "flipped" : ""} ${
        isMatched ? "matched" : ""
      }`}
    >
      <div className="card-inner">
        <div className="card-front">
          <img src={imageUrl} alt="Card Front" className="card-image" />
        </div>
        <div className="card-back">
          <img src={back} className="card-image" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default Card;
