import React, { useState, useEffect } from "react";
import Card from "./Card";

const GameBoard = ({ cardDataArray, onCardClick }) => {
  return (
    <div className="game-board">
      {cardDataArray.map((cardData) => (
        <Card key={cardData.id} cardData={cardData} onClick={onCardClick} />
      ))}
    </div>
  );
};

export default GameBoard;
