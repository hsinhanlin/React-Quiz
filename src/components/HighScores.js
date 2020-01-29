import React from 'react'
import { useFirebase } from './Firebase/FirebaseContext';
import { Link } from 'react-router-dom'

const HighScores = ({ history }) => {
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
            // add kqey property to obj
            const val = firebaseScores[key]
            val['key'] = key
            scores.push(val)
        }

        // higher first
        return scores
            .sort((score1, score2) => score2.score - score1.score)
            .slice(0, 10)
    }
    const linkStyle = {
        display: 'block',
        margin: '20px auto 0 auto',
    }
    return (
        <>
            {loading && <div id="loader" />}
            {!loading && (
                <>
                    <h1>High Scores</h1>
                    <div id="highScoresList">
                        {scores.map(record => (
                            <li key={record.key} className="high-score">
                                {record.name} - {record.score}
                            </li>
                        ))}
                        <Link
                            className="btn"
                            to="/"
                            style={linkStyle}
                        >
                            Return to homepage
                            </Link>
                    </div>
                </>
            )
            }
        </>
    )
}

export default HighScores
