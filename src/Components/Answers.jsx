import { useRef } from "react";

export function Answers({ answerList, selectedAnswer, answerState, onSubmit }) {
  const shuffledAnswers = useRef();

  // Answers Shuffling logic before rendering
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answerList];
    // this sort method shuffles the options randomly
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        let cssClass = "";
        const isSelected = answer === selectedAnswer;

        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSubmit(answer)}
              className={cssClass}
              disabled={
                answerState === "answered" ||
                answerState === "correct" ||
                answerState === "wrong"
              }
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
