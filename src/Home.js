import React from 'react'
import { 
    Link
} from 'react-router-dom'

export default function Home(props) {
    return (
        <div>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/signup">SignUp</Link>
            </li>
            <h1>{props.title}</h1>
        </div>
    )
}