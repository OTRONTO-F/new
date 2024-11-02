import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Slider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Alert,
    CircularProgress
} from '@mui/material';
import axios from 'axios';
import { API_URL } from '../config/api';

function Preferences() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [interests, setInterests] = useState([]);
    const [formData, setFormData] = useState({
        interested_in: '',
        min_age: 18,
        max_age: 50,
        location: '',
        max_distance: 50,
        selected_interests: []
    });

    useEffect(() => {
        const fetchInterests = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get(`${API_URL}/api/interests`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setInterests(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching interests:', error);
                setError('Failed to load interests');
                setLoading(false);
            }
        };

        fetchInterests();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            if (formData.selected_interests.length === 0) {
                setError('Please select at least one interest');
                return;
            }

            await axios.post(
                `${API_URL}/api/preferences`,
                formData,
                {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            navigate('/dashboard', { replace: true });
        } catch (error) {
            console.error('Error saving preferences:', error);
            setError(error.response?.data?.error || 'Failed to save preferences');
        } finally {
            setLoading(false);
        }
    };

    const handleInterestClick = (interest) => {
        const currentInterests = [...formData.selected_interests];
        const index = currentInterests.indexOf(interest.id);
        
        if (index === -1) {
            currentInterests.push(interest.id);
        } else {
            currentInterests.splice(index, 1);
        }
        
        setFormData({
            ...formData,
            selected_interests: currentInterests
        });
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Your Preferences
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Interested In</InputLabel>
                    <Select
                        value={formData.interested_in}
                        label="Interested In"
                        onChange={(e) => setFormData({
                            ...formData,
                            interested_in: e.target.value
                        })}
                        required
                    >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="both">Both</MenuItem>
                    </Select>
                </FormControl>

                <Typography gutterBottom>
                    Age Range: {formData.min_age} - {formData.max_age}
                </Typography>
                <Slider
                    value={[formData.min_age, formData.max_age]}
                    onChange={(e, newValue) => setFormData({
                        ...formData,
                        min_age: newValue[0],
                        max_age: newValue[1]
                    })}
                    min={18}
                    max={100}
                    sx={{ mb: 3 }}
                />

                <TextField
                    fullWidth
                    label="Location"
                    value={formData.location}
                    onChange={(e) => setFormData({
                        ...formData,
                        location: e.target.value
                    })}
                    required
                    sx={{ mb: 3 }}
                />

                <Typography gutterBottom>
                    Maximum Distance (km): {formData.max_distance}
                </Typography>
                <Slider
                    value={formData.max_distance}
                    onChange={(e, newValue) => setFormData({
                        ...formData,
                        max_distance: newValue
                    })}
                    min={1}
                    max={500}
                    sx={{ mb: 3 }}
                />

                <Typography gutterBottom>Interests</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                    {interests.map((interest) => (
                        <Chip
                            key={interest.id}
                            label={interest.name}
                            onClick={() => handleInterestClick(interest)}
                            color={formData.selected_interests.includes(interest.id) ? "primary" : "default"}
                            sx={{ m: 0.5 }}
                        />
                    ))}
                </Box>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{ mt: 3, mb: 2 }}
                >
                    {loading ? 'SAVING...' : 'SAVE PREFERENCES'}
                </Button>
            </Box>
        </Container>
    );
}

export default Preferences; 