import React, { useState } from 'react'
import Home from './Home'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './Firebase';
import { useNavigate } from "react-router-dom";
import { getFirestore } from 'firebase/firestore'
import { doc, getDoc } from "firebase/firestore";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const logInWithEmailAndPassword = async (email, password) => {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                const db = getFirestore();

                const userId = auth.currentUser.uid;

                const docRef = doc(db, "users", userId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    // console.log(docSnap.data());
                    navigate(`/dashboard/${userId}`,{state:{
                        Id: userId,
                        FirstName: docSnap.data()['FirstName'],
                        LastName: docSnap.data()['LastName'],
                        Email: email
                      }});
                } else {
                    alert("No such document!");
                    navigate('/login');
                }

            } catch (err) {
                console.error(err);
                alert(err.message);
                navigate('/login');
            }
        };
        logInWithEmailAndPassword(email, password);
    }

    return (
        <>
            <Home />
            <h1>Hello Login Page</h1>
            <form className="loginform" onSubmit={handleSubmit}>
                <input
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                ></input>
                <input
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
                ></input>
                <button>Log In</button>
            </form>
        </>
    )
}

export default Login
