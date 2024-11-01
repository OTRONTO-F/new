import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Matches from './pages/Matches';

function App() {
    const isLoggedIn = !!localStorage.getItem('token');

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                {/* Show Landing page for non-authenticated users */}
                <Route path="/" element={
                    isLoggedIn 
                    ? <Navigate to="/dashboard" />
                    : <Landing />
                } />
                
                <Route path="/login" element={
                    isLoggedIn 
                    ? <Navigate to="/dashboard" />
                    : <Login />
                } />
                <Route path="/register" element={
                    isLoggedIn 
                    ? <Navigate to="/dashboard" />
                    : <Register />
                } />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
                <Route path="/matches" element={
                    <ProtectedRoute>
                        <Matches />
                    </ProtectedRoute>
                } />

                {/* Catch all undefined routes */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
