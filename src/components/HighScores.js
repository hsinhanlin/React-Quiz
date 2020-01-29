import React from 'react'
import { useFirebase } from './Firebase/FirebaseContext';

const HighScores = () => {
    const firebase = useFirebase()
    const [scores, setScores] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        firebase.scores().once('value', snapshot => {
            const data = snapshot.val()
            const sortedScores = formatScoreData(data)
            setScores(sortedScores)
            setLoading(false)
        })
    }, [firebase])

    const formatScoreData = (firebaseScores) => {
        const scores = []

        for (let key in firebaseScores) {
            const val = firebaseScores[key]
            val['key'] = key
            scores.push(val)
        }

        return scores
            .sort((score1, score2) => score2.score - score1.score)
            .slice(0, 10)
    }

    return (
        <>
            {loading && <div id="loader" />}
            {!loading && (
                <>
                    <h1>High Scores</h1>
                    <div className="highScoreList">
                        {scores.map(record => (
                            <li key={record.key} className="high-score">
                                {record.name} - {record.score}
                            </li>
                        ))}
                    </div>
                </>
            )}
        </>
    )
}

export default HighScores
