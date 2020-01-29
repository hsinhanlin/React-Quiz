import React from 'react'

const Quesion = ({ question, changeQuestion }) => {

    const [classToApply, setClassToApply] = React.useState('')
    const [selectedAnswer, setSleectedAnswer] = React.useState(-1)
    const [answering, setAnswering] = React.useState(false)

    const checkAnswer = (selectedAnswer) => {
        if (answering) return;
        setAnswering(true)
        setSleectedAnswer(selectedAnswer)

        const classToApply = selectedAnswer === question.answer ? 'correct' : 'incorrect'
        setClassToApply(classToApply)

        const bouns = selectedAnswer === question.answer ? 10 : 0

        setTimeout(() => {
            setSleectedAnswer(-1)
            setAnswering(false)
            changeQuestion(bouns)
        }, 500)

    }

    return (
        <>
            <h2 dangerouslySetInnerHTML={{ __html: question.question }}></h2>
            {question.answerChoices.map((choice, index) => {
                return (
                    <div
                        key={index}
                        className={`
                    choice-container
                    ${selectedAnswer === index ? classToApply : ''
                            }`
                        }
                        onClick={() => checkAnswer(index)}
                    >
                        <p className="choice-prefix"> {index + 1}</p>
                        <p className="choice-text" dangerouslySetInnerHTML={{ __html: choice }}></p>
                    </div>
                )
            })
            }
        </>
    )
}

export default Quesion

