import React from 'react'
import { AnswerObject } from "../App"
import './Answer.css'
type Props = {
    answer: string
    onClick: (answer: string) => void
    userAnswer: AnswerObject | undefined
}
const AnswerCard: React.FC<Props> = ({
    answer,
    onClick,
    userAnswer
}) => {
    //set button color
    let buttonColor = 'answer'
    if (answer === userAnswer?.correctAnswer) {
        buttonColor = 'correctAnswer answer'
    }else if (answer === userAnswer?.answer && !userAnswer?.correct) {
        buttonColor = 'wrongAnswer answer'
    }
    return (
        <div className='centered answerCard'>
            <button 
            className={buttonColor}
            disabled={userAnswer ? true : false} onClick={() => onClick(answer)}>
            <span dangerouslySetInnerHTML={{__html: answer}}></span>
            </button>
        </div>
    )

}
export default AnswerCard