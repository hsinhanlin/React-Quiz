import React from 'react'
import Question from '../components/Quesion'

// const dummyQuestions = {
//     question: "What's the best programming language ?!",
//     answerChoices: ['Javascript', 'Java', 'C#', 'Swift'],
//     answer: 0
// }

const Game = () => {
    const url = "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple";
    const [currentQuestion, setCurrentQuestion] = React.useState(null)


    React.useEffect(() => {
        let mounted = new AbortController();
        const getQuiz = async () => {
            try {
                const res = await fetch(url)
                const { results } = await res.json()

                const questions = results.map(loadedQuestion => {
                    const formattedQuestion = {
                        question: loadedQuestion.question,
                        answerChoices: [...loadedQuestion.incorrect_answers]
                    }
                    // inject correct answer to choices
                    formattedQuestion.answer = Math.floor(Math.random() * 4)
                    formattedQuestion.answerChoices.splice(
                        formattedQuestion.answer,
                        0,
                        loadedQuestion.correct_answer
                    )

                    return formattedQuestion
                })

                // console.log(questions)
                setCurrentQuestion(questions[0])

            } catch (e) {
                console.error(e)
            }
        }
        getQuiz();

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
