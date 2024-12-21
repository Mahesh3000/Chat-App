import { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import './App.css'
import Login from './containers/Login/Login';
import Signup from './containers/Login/Signup';
import ForgetPasswordPage from './containers/Login/ForgetPassword';
import LandingPage from './containers/Login/LandingPage';
import ChatBox from './containers/Dashboard/ChatBox';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
          <Route path="/dashboard" element={<ChatBox />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
//   < Route exact path = "/" component = { LandingPage } />
// <Route path="/login" component={ LoginPage } />
// <Route path="/register" component={ RegisterPage } />
// <Route path="/forget-password" component={ ForgetPasswordPage } />
// <Route path="/home" component={ HomePage } />