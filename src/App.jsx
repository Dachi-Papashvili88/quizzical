import React, { useEffect, useState } from "react";

import Quiz from "./Quiz";

export default function App() {
  const [quiz, setQuiz] = useState([]);
  const [isHeld, setIsHeld] = useState(false);
  const [quizName, setQuizName] = useState("Quizzical");
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (isHeld) {
      fetch("https://opentdb.com/api.php?amount=10")
        .then((res) => res.json())
        .then((data) => {
          console.log(data.results);
          setQuiz(data.results);
        });
    }
  }, [isHeld]);

  const renderQuiz = quiz.map((quizItem, index) => {
    const results = quizItem.incorrect_answers.concat(quizItem.correct_answer);
    const optionsCount = results.length;

    return (
      <Quiz
        key={index}
        question={quizItem.question}
        results={results}
        isClicked={isClicked}
        optionsCount={optionsCount}
        correct={quizItem.correct_answer}
      />
    );
  });

  function handleClick() {
    setIsHeld(true);
    setQuizName("");
  }

  function handleAnswers() {
    setIsClicked(true);
  }

  return (
    <main>
      <h1 className="main">{quizName}</h1>
      {quiz.length === 0 ? (
        <button className="quizz-button" onClick={handleClick}>
          Start Quiz
        </button>
      ) : (
        renderQuiz
      )}

      {quiz.length > 0 && (
        <button className="check-btn" onClick={handleAnswers}>
          Check answers
        </button>
      )}
    </main>
  );
}
