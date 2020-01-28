import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <h1>Quiz</h1>
            <Link to="/game" className="btn">Start</Link>
            <Link to="/highScores" className="btn">Highest Scores</Link>
        </>
    )
}
export default Home
