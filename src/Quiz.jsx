import React, { useState } from "react";


export default function Quiz(props) {
  const { question, results, optionsCount, correct, isClicked } = props;
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const renderOptions = results.slice(0, optionsCount).map((option, index) => (
    <div
      className="answers"
      key={index}
      onClick={() => {
        if (!isClicked) {
          setSelectedAnswer(option);
        }
      }}
      style={{
        backgroundColor:
          isClicked && option === correct
            ? "lightblue" // Correct answer turns blue
            : isClicked && selectedAnswer === option
            ? "pink" // Incorrect answer turns pink
            : selectedAnswer === option
            ? "green" // Selected answer turns green
            : "white",
      }}
    >
      <p>{option}</p>
    </div>
  ));

  return (
    <div className="quiz-div">
      <h1 className="question">{question}</h1>
      <div className="answers-div">{renderOptions}</div>
    </div>
  );
}
