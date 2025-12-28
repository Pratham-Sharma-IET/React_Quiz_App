import { useCallback, useState } from "react";
import QuestionBank from "../questions.js";
import ProgressBar from "./ProgressBar.jsx";
import { Answers } from "./Answers.jsx";

export default function Quiz() {
  const Timer = 20000;
  const [answerState, setAnswerState] = useState("");
  const [answeredQuestion, setAnsweredQuestion] = useState([]);
  const activeQuestionIndex =
    answerState === "" ? answeredQuestion.length : answeredQuestion.length - 1;
  const QuestionsCompleted = activeQuestionIndex === QuestionBank.length;
  const handleSubmitAnswer = useCallback(
    function handleSubmitAnswer(selectedAnswer) {
      // Question Answered logic
      setAnswerState("answered");

      // Answer storing logic
      setAnsweredQuestion((prevAnswer) => [...prevAnswer, selectedAnswer]);

      // Answer Checker logic
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
        }, 1000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

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

  return (
    <div id="quiz">
      <div id="question">
        <ProgressBar
          key={activeQuestionIndex}
          skipQuestion={handleSkipQuestion}
          timer={Timer}
        />
        <h2>{QuestionBank[activeQuestionIndex].text}</h2>
        <Answers
          key={QuestionBank[activeQuestionIndex].answers}
          answerList={QuestionBank[activeQuestionIndex].answers}
          answerState={answerState}
          selectedAnswer={answeredQuestion[answeredQuestion.length - 1]}
          onSubmit={handleSubmitAnswer}
        />
      </div>
    </div>
  );
}
