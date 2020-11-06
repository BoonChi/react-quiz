import React, { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { Difficulty, fetchQuizQuestions, QuestionState } from "./API";
import AnswerCard from "./components/AnswerCard";
import "./App.style.css";
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Itim&family=Roboto&display=swap');
</style>;
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
const totalQuestion: number = 10;
const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      totalQuestion,
      Difficulty.EASY
    ).catch((error) => {
      console.log(error);
    });
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };
  const checkAnswer = (e: string) => {
    let isCorrect = false;
    //check userAnswer same with correct Answer
    if (e === questions[number].correct_answer) {
      isCorrect = true;
      setScore(score + 1);
    }
    setUserAnswers([
      ...userAnswers,
      {
        question: questions[number].question,
        answer: e,
        correct: isCorrect,
        correctAnswer: questions[number].correct_answer,
      },
    ]);
  };
  const nextQuestion = () => {
    setNumber(number + 1);
    //set game over if it is the last page
    if (number + 1 === totalQuestion) {
      setGameOver(true);
      alert("Your score is " + score + "/" + totalQuestion);
    }
  };
  return (
    <div className="App background">
      <h1>REACT QUIZ</h1>
      {gameOver ? (
        <button className="start" onClick={startTrivia}>
          START
        </button>
      ) : null}
      {!gameOver ? <p className="score">Score: {score}</p> : null}
      {loading && <p>Loading Questions...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNumber={number + 1}
          totalQuestions={totalQuestion}
          question={questions[number].question}
        >
          {questions[number].answers.map((answer) => (
            <AnswerCard
              key={answer}
              answer={answer}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              onClick={checkAnswer}
            />
          ))}
        </QuestionCard>
      )}
      {!loading && !gameOver && userAnswers[number] && (
        <button className="next" onClick={nextQuestion}>
          {userAnswers.length === totalQuestion ? "COMPLETE" : "NEXT"}
        </button>
      )}
    </div>
  );
};

export default App;
