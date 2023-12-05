import React, { useState } from "react";
import "./AdviceGenerator.css";

const url = "https://api.adviceslip.com/advice";

async function getAdvice(setAdvice) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const adviceData = await response.json();
    console.log(adviceData);

    const adviceID = adviceData.slip.id;
    const adviceText = adviceData.slip.advice;

    setAdvice({ id: adviceID, text: adviceText });
  } catch (error) {
    console.log("error", error);
  }
}

function AdviceGenerator() {
  const [advice, setAdvice] = useState({
    id: "",
    text: "Roll the dice for some advice",
  });
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = async () => {
    setIsSpinning(true);  

    await getAdvice(setAdvice);

    // Use setTimeout to remove the "spin" class after the transition completes
    setTimeout(() => {
      setIsSpinning(false);
    }, 500);
  };


  return (
    <div className="wrapper">
      <div className="advice-container">
        <span className="advice-id">Advice #{advice.id}</span>
        <p className="advice-text">"{advice.text}"</p>
        <hr></hr>
      </div>
      <button
        className="dice-btn btn"
       
      >
        <img  onClick={handleClick}
        style={{ transform: isSpinning ? 'rotate(360deg)' : 'none' }} className="dice" src="../images/icon-dice.svg" alt="" />
      </button>
    </div>
  );
}

export default AdviceGenerator;
