import React from 'react'
import { Link } from 'react-router-dom'
import { useFirebase } from './Firebase/FirebaseContext';


const SaveScoreForm = ({ score, scoreSaved }) => {
    const [username, setUsername] = React.useState('')
    const firebase = useFirebase();

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

        firebase.scores().push(record, () => {
            scoreSaved();
        });
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
