import React from 'react'
import { Link } from 'react-router-dom'


const SaveScoreForm = ({ score, scoreSaved }) => {
    const [username, setUsername] = React.useState('')

    const handleChange = e => {
        e.persist()
        setUsername(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        const record = {
            name: username,
            score
        }
        console.log(record)
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Score: {score}</h1>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Nerdy"
                    vlaue={username}
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className="btn"
                    disabled={!username}
                >
                    Save
            </button>
            </form>
            <Link to="/" className="btn">
                Return to Homepage
            </Link>
        </div>
    )
}

export default SaveScoreForm
