import React from 'react'
import Question from '../components/Quesion'
import { getQuiz } from '../utils/api'

const Game = () => {
    const [currentQuestion, setCurrentQuestion] = React.useState(null)
    // const [questions, setQuestion] = React.useState(null)


    React.useEffect(() => {
        let mounted = new AbortController();
        let questions = [];


        const getData = async () => {
            try {
                const data = await getQuiz()
                questions = data;
                changeQuestion()

            } catch (e) {
                console.error(e)
            }
            return questions
        }
        const changeQuestion = () => {
            const questionIndex = Math.floor(
                Math.random() * questions.length)
            setCurrentQuestion(questions[questionIndex])

            // remove question
            const remainingQuestions = [...questions]
            remainingQuestions.splice(questionIndex, 1)
            questions = remainingQuestions
        }

        getData()
        return () => mounted.abort()
    }, [])


    return (
        <>
            {currentQuestion
                ?
                <Question question={currentQuestion} />
                :
                <div id="loader"></div>
            }
        </>
    )
}

export default Game
