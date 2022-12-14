import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react";

function App() {
  const [text,setText] = useState("");
  useEffect(() => {   
    async function getAllSkills() {
        const uri = `/api/skills`;
				const response = await fetch(uri)
        // console.log(response.text());
        setText(response.url);
    }
    getAllSkills()
   },[]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {text}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
