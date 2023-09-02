import React, { useEffect, useState } from "react";
import Styles from "./ReportPage.module.css";
import { useNavigate } from "react-router-dom";
import { CiCircleQuestion } from "react-icons/ci";
import { RiQuestionAnswerFill } from "react-icons/ri";

const ReportPage = () => {
  const [quizState, setQuizState] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const storedState = localStorage.getItem("quizState");
    if (storedState) {
      setQuizState(JSON.parse(storedState));
    }
  }, []);

  if (!quizState) {
    return <div>Loading...</div>;
  }

  const { questions, userAnswers } = quizState;
  console.log("reportPage", userAnswers);

  function handleFinish() {
    nav("/");
  }

  return (
    <div className={Styles.reportContainer}>
      <div className={Styles.ram}>
         <div className={Styles.lab}> <label>Report Page</label></div>
        <div className={Styles.btn}><button className={Styles.backButton} onClick={handleFinish}>
          Finish
        </button></div>

        
      </div>

      {questions.map((question, index) => (
        <div key={index} className={Styles.questionItem}>
          <p className={Styles.questionText}>
            {index + 1}.&nbsp; {question.question}
          </p>
          <div className={Styles.answerComparison}>
            <span>
              <RiQuestionAnswerFill />
            </span>
            <div className={Styles.correctAnswer}>
              Correct Answer: {question.correct_answer}
            </div>
            <div className={Styles.userAnswer}>
              Your Answer:{" "}
              {userAnswers[index] !== null
                ? userAnswers[index]
                : "Not answered"}
            </div>
            <br />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportPage;
