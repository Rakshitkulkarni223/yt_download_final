import React, { useState } from "react";
import Home from './Home'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./Firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore'

const SaveInfo = async (id, firstName, lastName, email, password) => {

    const db = getFirestore();

    const userDetails = collection(db, "users");

    const docData = {
        Id: id,
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: password
    };

    await setDoc(doc(userDetails, id), docData);

};

const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        function onRegister() {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    SaveInfo(userCredential.user.uid,firstName, lastName, email, password);
                    navigate("/login");
                }
                )
                .catch((error) => {
                    navigate('/signup');
                    alert(error);
                    console.log(error);
                });
        }
        onRegister();
    };


    return (
        <>
            <Home />
            <h1>Hello SignUp Page</h1>
            <div>
                <form className="signupForm" onSubmit={handleSubmit}>
                    <input
                        placeholder="first name"
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    ></input>
                    <input
                        placeholder="last name"
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    ></input>
                    <input
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        type="email"
                    ></input>
                    <input
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        type="password"
                    ></input>
                    <button>Sign Up</button>
                </form>
            </div>
        </>
    )
}

export default SignUp
