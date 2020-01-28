import React from 'react'
import Question from '../components/Quesion'
import { getQuiz } from '../utils/api'
// const dummyQuestions = {
//     question: "What's the best programming language ?!",
//     answerChoices: ['Javascript', 'Java', 'C#', 'Swift'],
//     answer: 0
// }

const Game = () => {
    const [currentQuestion, setCurrentQuestion] = React.useState(null)

    React.useEffect(() => {
        let mounted = new AbortController();
        const getData = async () => {
            try {
                const questions = await getQuiz();
                setCurrentQuestion(questions[0])
            } catch (e) {
                console.error(e)
            }
        }

        getData()
        return () => mounted.abort()
    }, [])

    return (
        <>
            {
                currentQuestion
                    ?
                    <Question question={currentQuestion} />
                    :
                    <p>loading...</p>
            }
        </>
    )
}

export default Game
