import React from 'react'
import ProgressBar from './ProgressBar'

const HUD = ({ score, questionNumber }) => {
    return (
        <div id="hud">
            <div className="hud-item">
                <p className="hud-prefix">Quiz {questionNumber}</p>
                <ProgressBar max={5} current={questionNumber} />
            </div>
            <div className="hud-item">
                <p className="hud-prefix">Score</p>
                <h1 className="hud-main-text">{score}</h1>
            </div>
        </div>
    )
}

export default HUD
