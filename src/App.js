import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChatProvider } from './contexts/ChatContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import components
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Preferences from './pages/Preferences';
import Matches from './pages/Matches';
import Chat from './components/Chat';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <Router>
            <ChatProvider>
                <div className="App">
                    <Navbar />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route 
                            path="/dashboard" 
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            } 
                        />
                        <Route 
                            path="/preferences" 
                            element={
                                <PrivateRoute>
                                    <Preferences />
                                </PrivateRoute>
                            } 
                        />
                        <Route 
                            path="/matches" 
                            element={
                                <PrivateRoute>
                                    <Matches />
                                </PrivateRoute>
                            } 
                        />
                        <Route path="/" element={<Login />} />
                    </Routes>
                    <ToastContainer />
                </div>
            </ChatProvider>
        </Router>
    );
}

export default App;
