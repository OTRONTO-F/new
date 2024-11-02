import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config/api';
import { CircularProgress, Box } from '@mui/material';

function PreferencesCheck({ children }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkPreferences = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get(`${API_URL}/api/preferences/check`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (!response.data.hasPreferences) {
                    navigate('/preferences');
                }
            } catch (error) {
                console.error('Error checking preferences:', error);
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                } else {
                    navigate('/preferences');
                }
            } finally {
                setLoading(false);
            }
        };

        checkPreferences();
    }, [navigate]);

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    return children;
}

export default PreferencesCheck; 