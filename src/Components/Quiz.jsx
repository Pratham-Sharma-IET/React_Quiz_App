import { useCallback, useState } from "react";
import QuestionBank from "../questions.js";
import ProgressBar from "./ProgressBar.jsx";

export default function Quiz() {
  const Timer = 10000;
  const [answeredQuestion, setAnsweredQuestion] = useState([]);
  const nextQuestionIndex = answeredQuestion.length;
  const QuestionsCompleted = nextQuestionIndex === QuestionBank.length;
  const handleSubmitAnswer = useCallback(function handleSubmitAnswer(
    selectedAnswer
  ) {
    setAnsweredQuestion((prevAnswer) => [...prevAnswer, selectedAnswer]);
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

  const shuffledAnswers = [...QuestionBank[nextQuestionIndex].answers];
  // this sort method shuffles the options randomly
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <ProgressBar
          key={answeredQuestion}
          skipQuestion={handleSkipQuestion}
          timer={Timer}
        />
        <h2>{QuestionBank[nextQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSubmitAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
