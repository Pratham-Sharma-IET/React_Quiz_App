import QUESTION_BANK from "../questions.js";
export function Summary({ answerList }) {
  const skippedAnswers = answerList.filter((answer) => answer === "unanswered");
  const correctAnswers = answerList.filter(
    (answer, index) => answer === QUESTION_BANK[index].answers[0]
  );
  const wrongAnswers =
    QUESTION_BANK.length - skippedAnswers.length - correctAnswers.length;
  return (
    <div id="summary">
      <h2>Quiz Completed</h2>
      <div id="summary-stats">
        <p>
          <span className="number">
            {correctAnswers.length}/{answerList.length}
          </span>
          <span className="text">correct</span>
        </p>
        <p>
          <span className="number">
            {wrongAnswers}/{answerList.length}
          </span>
          <span className="text">wrong</span>
        </p>
        <p>
          <span className="number">
            {skippedAnswers.length}/{answerList.length}
          </span>
          <span className="text">skipped</span>
        </p>
      </div>
      <ol>
        {answerList.map((answer, index) => {
          let cssClass = "user-answer";
          if (answer === "unanswered") {
            cssClass += " skipped";
          } else if (answer === QUESTION_BANK[index].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTION_BANK[index].text}</p>
              <p className={cssClass}>{answer}</p>
              <p className="question">{QUESTION_BANK[index].explanation}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
