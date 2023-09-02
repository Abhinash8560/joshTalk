import React, { useState, useEffect, useRef } from "react";
import Styles from "./Home.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Timer from "../quiz/QuizTimer";
import OverviewPanel from "../OverviewPanel/OverviewPanel";
import ReportPage from "../ReportPage/ReportPage";
import { gsap, Power3 } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import { IoReorderThree } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuizData } from '../../redux/action/userAction'; 
gsap.registerPlugin(CSSPlugin);

const Home = () => {
  const [email, setEmail] = useState("");
  const [emailValidated, setEmailValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);
  const [visitedQuestions, setVisitedQuestions] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  console.log("attemptedQuestions:", attemptedQuestions);
  // console.log("homeuserAnswers", userAnswers);

  const dispatch=useDispatch()
  const { quizData = [], loading, error } = useSelector((state) => state.user);
   console.log(quizData,"quizData");
  useEffect(() => {
    dispatch(fetchQuizData());
  }, [dispatch]);
 useEffect(() => {
  if (quizData.length > 0) {
    setQuestions(quizData);
  }
}, [quizData]);

  const handleEmailChange = (event) => {
    const enteredEmail = event.target.value;
    setEmail(enteredEmail);
  };

  const validateEmail = () => {
    if (email.trim() === "") {
      setErrorMessage("Please fill in the email field");
      return;
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      setErrorMessage("Email format is incorrect");
      return;
    }

    setErrorMessage("");
    setEmailValidated(true);
  };

  const handleAnswerOptionClick = (isCorrect, answer) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const updatedAttemptedQuestions = [...attemptedQuestions, currentQuestion];
    setAttemptedQuestions(updatedAttemptedQuestions);

    setUserAnswers((prevUserAnswers) => {
      const updatedUserAnswers = [...prevUserAnswers];
      updatedUserAnswers[currentQuestion] = answer;
      console.log("updatedUserAnswers",updatedUserAnswers);
      return updatedUserAnswers;
    });
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      setQuizCompleted(true);
      localStorage.setItem(
        "quizState",
        JSON.stringify({ questions, userAnswers })
      );
      navigate("/report");
    }
  };

  const calculateScore = () => {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      const correctAnswer = questions[i].correct_answer;
      const userAnswer = userAnswers[i];
      if (userAnswer === correctAnswer) {
        score++;
      }
    }
    return score;
  };

  const navigate = useNavigate();
  const handleTimeout = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setShowScore(true);

    setTimeout(() => {
      localStorage.setItem(
        "quizState",
        JSON.stringify({ questions, userAnswers, score: finalScore })
      );
      navigate("/report");
    }, 2000);
  };

  const containerRef = useRef(null);
  const handleQuestionClick = (index) => {
    if (!visitedQuestions.includes(index)) {
      setVisitedQuestions([...visitedQuestions, index]);
    }
    setCurrentQuestion(index);

    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: Power3.easeOut,
      onComplete: () => {
        setCurrentQuestion(index);
        gsap.to(containerRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: Power3.easeIn,
        });
      },
    });
  };

  return (
    <>
      <section className={Styles.StartPage}>
        {emailValidated && !quizCompleted && (
          <Timer onTimeout={handleTimeout} score={score} />
        )}
        <article ref={containerRef}>
            {emailValidated ? (
              <>
                <div className={Styles.parentFlex}>


                  {quizCompleted ? (
                    <ReportPage
                      questions={questions}
                      userAnswers={userAnswers}
                    />
                    
                  ) : (
                    <article
                      className={`${Styles.QuizDashboard} ${Styles.visible}`}
                    >

                      {showScore ? (
                        <div className={Styles.scoreSection}>
                          You scored {score} out of {questions.length}
                        </div>

                      ) : (
                        <>
                          <div className={Styles.questionSection}>
                            <div className={Styles.questionCount}>
                              <span>Question {currentQuestion + 1}</span>/
                              {questions.length}
                            </div>
                            <div className={Styles.questionText}>
                              {questions[currentQuestion].question}
                            </div>
                          </div>
                          <div className={Styles.answerSection}>
                            {questions[currentQuestion].incorrect_answers.map(
                              (answerOption, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleAnswerOptionClick(false)}
                                >
                                  {answerOption}
                                </button>
                              )
                            )}
                            
                            <button
                              key={questions[currentQuestion].correct_answer}
                              onClick={() =>
                                handleAnswerOptionClick(
                                  true,
                                  questions[currentQuestion].correct_answer
                                )
                              }
                            >
                              {questions[currentQuestion].correct_answer}
                            </button>

                          </div>
                        </>
                      )}

                    </article>

                  )}
                  <OverviewPanel
                    questions={questions}
                    currentQuestion={currentQuestion}
                    attemptedQuestions={attemptedQuestions}
                    onQuestionClick={handleQuestionClick}
                    visitedQuestions={visitedQuestions}
                  />
                </div>
              </>
            ) : (
              <article className={`${Styles.emailGrid}`}>
                <label className={Styles.emailTextFlex}>Quiz Application</label>
                <input
                  className={Styles.inputFlex}
                  type="text"
                  onChange={handleEmailChange}
                  placeholder="Please Enter Your Email"
                  required
                />
                <div className={Styles.EmilButton}>
                  <button
                    className={Styles.EmilButtonInner}
                    onClick={validateEmail}
                  >
                   Get Quiz
                  </button>
                </div>
                {errorMessage && (
                  <p className={Styles.errorMessage}>{errorMessage}</p>
                )}
              </article>
            )}
        </article>
      </section>
    </>
  );
};

export default Home;
