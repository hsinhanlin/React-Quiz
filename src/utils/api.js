export const getQuiz = async (
    amout = 1,
    category = 18,
    difficulty = 'medium', type = 'multiple'
) => {
    const url = `https://opentdb.com/api.php?amount=${amout}&category=${category}&difficulty=${difficulty}&type=${type}`;

    try {
        const res = await fetch(url)
        const { results } = await res.json()
        return converQuestionFromAPI(results)
    } catch (e) {
        console.error(e)
    }
}

const converQuestionFromAPI = (rawQuestions) => {
    return rawQuestions.map(loadedQuestion => {
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
}