import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Login from './Login';
import Home from './Home';
import SignUp from './SignUp';
import DashboardMain from './Dashboard';
import YouTube from './YouTube';

import { AuthProvider } from './AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={ <Home title="Hello Home Page" /> } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard/:uid" element={<DashboardMain/> }/>
          <Route path="/youtube/:uid" element={<YouTube/> }/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
