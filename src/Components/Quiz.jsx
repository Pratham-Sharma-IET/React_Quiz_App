import { useCallback, useState } from "react";
import QuestionBank from "../questions.js";
import ProgressBar from "./ProgressBar.jsx";

export default function Quiz() {
  const Timer = 10000;
  const [answerState, setAnswerState] = useState("");
  const [answeredQuestion, setAnsweredQuestion] = useState([]);
  const activeQuestionIndex =
    answerState === "" ? answeredQuestion.length : answeredQuestion.length - 1;
  const QuestionsCompleted = activeQuestionIndex === QuestionBank.length;

  const handleSubmitAnswer = useCallback(function handleSubmitAnswer(
    selectedAnswer
  ) {
    setAnswerState("answered");
    setAnsweredQuestion((prevAnswer) => [...prevAnswer, selectedAnswer]);
    setTimeout(() => {
      if (selectedAnswer === QuestionBank[activeQuestionIndex].answers[0]) {
        setAnswerState("correct");
        console.log("correct answer");
      } else {
        setAnswerState("wrong");
        console.log("wrong answer");
      }
      setTimeout(() => {
        setAnswerState("");
      }, 2000);
    }, 1000);
  },
  []);

  const handleSkipQuestion = useCallback(
    () => handleSubmitAnswer("unanswered"),
    [handleSubmitAnswer]
  );

  if (QuestionsCompleted) {
    return (
      <div id="summary">
        <h2>Quiz Completed</h2>
      </div>
    );
  }

  const shuffledAnswers = [...QuestionBank[activeQuestionIndex].answers];
  // this sort method shuffles the options randomly
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <ProgressBar
          key={activeQuestionIndex}
          skipQuestion={handleSkipQuestion}
          timer={Timer}
        />
        <h2>{QuestionBank[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {QuestionBank[activeQuestionIndex].answers.map((answer) => {
            let cssClass = "";
            const isSelected =
              answer === answeredQuestion[answeredQuestion.length - 1];

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
                  onClick={() => handleSubmitAnswer(answer)}
                  className={cssClass}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
