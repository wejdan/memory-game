import React, { useState, useEffect } from "react";
import GameBoard from "./componenets/GameBoard";
import "./App.css";
import { backimg, imgs } from "./constants";
import { countOccurrences, getRandomNumber, shuffle } from "./utils";
import FlippableCard from "./componenets/FlippableCard";

const App = () => {
  const [cards, setCards] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [flippedCards, setFlippedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const [isGameFinished, setIsGameFinished] = useState(false); // Track if all cards are flipped
  const [turns, setTurns] = useState(0);
  const init = () => {
    const tmpArray = [...imgs, ...imgs];
    const cardArray = [];

    tmpArray.map((img, i) => {
      cardArray.push({
        id: i,
        isFlipped: false,
        isMatched: false,
        imageUrl: img,
      });
    });

    setCards(shuffle(cardArray));
    setTurns(0);
  };
  const preloadImages = (urls) => {
    const promises = urls.map((url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(promises)
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  };
  useEffect(() => {
    // Preload images when the component mounts
    preloadImages([backimg, ...imgs]);
    init();
  }, []);
  const onCardClick = (clickedId) => {
    if (isProcessing) return; // Ignore clicks during processing
    const clickedCard = cards.find((card) => card.id === clickedId);

    if (clickedCard.isFlipped || clickedCard.isMatched) return; // Ignore clicks on already flipped or matched cards

    const newCards = cards.map((card) =>
      card.id === clickedId ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    setFlippedCards((prev) => [...prev, clickedCard]);

    if (flippedCards.length === 1) {
      setIsProcessing(true);
      setTurns((prev) => prev + 1);

      setTimeout(() => {
        checkForMatch(clickedCard);
        setIsProcessing(false);
      }, 1000);
    }
  };
  const checkForMatch = (clickedCard) => {
    const matchingCard = flippedCards.find(
      (card) => card.imageUrl === clickedCard.imageUrl
    );

    if (matchingCard) {
      const newCards = cards.map((card) =>
        card.id === clickedCard.id || card.id === matchingCard.id
          ? { ...card, isMatched: true, isFlipped: true }
          : card
      );
      setCards(newCards);
      const isGameFinished = newCards.every((card) => card.isMatched);
      setIsGameFinished(isGameFinished);
    } else {
      const newCards = cards.map((card) =>
        card.isFlipped && !card.isMatched ? { ...card, isFlipped: false } : card
      );
      setCards(newCards);
    }

    setFlippedCards([]);
  };
  const handlePlayAgain = () => {
    init();
    setIsGameFinished(false);
  };
  return (
    <div className="App">
      <h1>Memory Card Game</h1>
      {/* <FlippableCard /> */}
      {isLoading ? ( // Display loader while images are loading
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <GameBoard cardDataArray={cards} onCardClick={onCardClick} />
          <h6>Turns:{turns}</h6>
        </>
      )}

      {isGameFinished && (
        <div className="modal">
          <div className="modal-content">
            <h2>Congratulations!</h2>
            <p>You matched all cards.</p>
            <button onClick={handlePlayAgain}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
