import React, { useState, useEffect } from "react";
import Styles from "./OverviewPanel.module.css";
import { IoReorderThree } from 'react-icons/io5';

const OverviewPanel = ({
  questions,
  currentQuestion,
  attemptedQuestions,
  onQuestionClick,
  visitedQuestions,
}) => {
  const [active, setActive] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 426);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); 

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = () => {
    setActive(!active);
  };

  const handleReorderClick = () => {
    setShowContent(!showContent);
  };

  const handleCloseClick = () => {
    setActive(false);
  };

  return (
    <>
      <div className={`${Styles.OverviewPanel} ${isMobileView && !showContent ? Styles.mobileBackground : ""}`}>
        {isMobileView ? (
          <div className={Styles.menuIconMobile} onClick={handleClick}>
            <i className={active ? "fas fa-times" : "fas fa-bars"}></i>
            <IoReorderThree onClick={handleReorderClick} />
          </div>
        ) : null}
        {/* mobile navbar */}
        {isMobileView ? (
          showContent && (
            <ul id={Styles.ulItems}>
              {questions.map((question, index) => (
                <li
                  key={index}
                  className={`${Styles.questionItem} ${
                    currentQuestion === index ? Styles.currentQuestion : ""
                  } ${
                    visitedQuestions.includes(index) ? Styles.visitedQuestion : ""
                  }`}
                  onClick={() => onQuestionClick(index)}
                >
                  {attemptedQuestions.includes(index) ? "✔" : "✘"} {index + 1}
                </li>
              ))}
            </ul>
          )
        ) : (
          <>
            <h2 id={Styles.questionOverview}>Overview Panel</h2>
            <ul id={Styles.ulItems}>
              {questions.map((question, index) => (
                <li
                  key={index}
                  className={`${Styles.questionItem} ${
                    currentQuestion === index ? Styles.currentQuestion : ""
                  } ${
                    visitedQuestions.includes(index) ? Styles.visitedQuestion : ""
                  }`}
                  onClick={() => onQuestionClick(index)}
                >
                  {attemptedQuestions.includes(index) ? "✔" : "✘"} Question {index + 1}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default OverviewPanel;
