import React from 'react'

type Props = {
    question: string
    questionNumber: number
    totalQuestions: number
}
const QuestionCard:React.FC<Props> = ({
    question,
    questionNumber,
    totalQuestions,
    children
}) => (
    <div>
        <p className='number'>
            Question: {questionNumber} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{__html: question}}></p>
        <div>
            {children} 
        </div>
    </div>
)
export default QuestionCard;