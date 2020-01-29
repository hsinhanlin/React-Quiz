import React from 'react'
import Question from '../components/Quesion'
import { getQuiz } from '../utils/api'
import SaveScoreForm from './SaveScoreForm'
import HUD from './HUD'

export default function Game({ history }) {
    const [questions, setQuestion] = React.useState([])
    const [currentQuestion, setCurrentQuestion] = React.useState(null)
    const [loading, setLoading] = React.useState(true);
    const [score, setScore] = React.useState(0);
    const [questionNumber, setQuestionNumber] = React.useState(0);
    const [done, setDone] = React.useState(false);

    React.useEffect(() => {
        getQuiz()
            .then(setQuestion)
            .catch(console.err)
    }, [])

    const scoreSaved = () => {
        history.push('/')
    }

    const changeQuestion = React.useCallback((bouns = 0) => {
        if (questions.length === 0) {
            setDone(true)
            return setScore(score + bouns)
        }

        const questionIndex = Math.floor(
            Math.random() * questions.length)

        const currentQuestion = questions[questionIndex]
        const remainQuestions = [...questions]
        // remove question
        remainQuestions.splice(questionIndex, 1)

        setQuestion(remainQuestions)
        setCurrentQuestion(currentQuestion)
        setLoading(false)
        setScore(score + bouns)
        setQuestionNumber(questionNumber + 1)
    }, [
        questionNumber,
        score,
        questions,
        setQuestion,
        setLoading,
        setCurrentQuestion,
        setQuestionNumber
    ])

    React.useEffect(() => {
        if (!currentQuestion && questions.length) {
            changeQuestion()
        }

    }, [currentQuestion, questions, changeQuestion])

    return (
        <>
            {loading && !done && <div id="loader"></div>}
            {!loading && !done && currentQuestion && (
                <>
                    <HUD score={score} questionNumber={questionNumber} />
                    <Question
                        question={currentQuestion}
                        changeQuestion={changeQuestion}
                    />
                </>
            )
            }
            {done && <SaveScoreForm score={score} scoreSaved={scoreSaved} />}
        </>
    )
}
