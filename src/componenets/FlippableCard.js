import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
const Card = styled.div`
  position: relative;
  width: 100px;
  height: 150px;

  overflow: hidden;
`;
const Front = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  transform-style: preserve-3d;
  transition: transform 0.6s;

  transform: ${(props) =>
    props.isFlipped ? "rotateY(0deg)" : "rotateY(-180deg)"};
`;
const Back = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  transition: transform 0.6s;

  transform: ${(props) =>
    props.isFlipped ? "rotateY(-180deg)" : "rotateY(0deg)"};
`;
export default function FlippableCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = () => {
    setIsFlipped((prev) => !prev);
  };
  useEffect(() => {
    console.log("isFlipped", isFlipped);
  }, [isFlipped]);
  return (
    <Card isFlipped={isFlipped}>
      <Front isFlipped={isFlipped}>
        <img
          src={"https://images.alphacoders.com/118/thumb-1920-1182185.jpg"}
          className="card-image"
          onClick={handleClick}
        />
      </Front>
      <Back isFlipped={isFlipped}>
        <img
          src={
            "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4f7705ec-8c49-4eed-a56e-c21f3985254c/dah43cy-a8e121cb-934a-40f6-97c7-fa2d77130dd5.png/v1/fill/w_1024,h_1420/pokemon_card_backside_in_high_resolution_by_atomicmonkeytcg_dah43cy-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQyMCIsInBhdGgiOiJcL2ZcLzRmNzcwNWVjLThjNDktNGVlZC1hNTZlLWMyMWYzOTg1MjU0Y1wvZGFoNDNjeS1hOGUxMjFjYi05MzRhLTQwZjYtOTdjNy1mYTJkNzcxMzBkZDUucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.9GzaYS7sd8RPY5FlHca09J9ZQZ9D9zI69Ru-BsbkLDA"
          }
          className="card-image"
          onClick={handleClick}
        />
      </Back>
    </Card>
  );
}
