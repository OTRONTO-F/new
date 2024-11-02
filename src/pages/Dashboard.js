import { useState, useEffect } from 'react';
import { 
    Container, 
    Card, 
    CardMedia, 
    CardContent, 
    Typography,
    IconButton,
    Box,
    Alert,
    CircularProgress
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { API_URL } from '../config/api';
import { toast } from 'react-toastify';

function Dashboard() {
    const [currentProfile, setCurrentProfile] = useState(null);
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSuggestions();
    }, []);

    const fetchSuggestions = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${API_URL}/api/matches/suggestions`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            setProfiles(response.data);
            // Set the first profile as current if available
            if (response.data.length > 0) {
                setCurrentProfile(response.data[0]);
            } else {
                setCurrentProfile(null);
            }
            setError(null);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            const errorMessage = error.response?.data?.error || error.message;
            setError(`Failed to load suggestions: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    const showNextProfile = () => {
        const currentIndex = profiles.findIndex(p => p.id === currentProfile.id);
        if (currentIndex < profiles.length - 1) {
            setCurrentProfile(profiles[currentIndex + 1]);
        } else {
            // No more profiles, fetch new ones
            setCurrentProfile(null); // Clear current profile
            setProfiles([]); // Clear profiles array
            fetchSuggestions();
        }
    };

    const handleLike = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${API_URL}/api/matches/${userId}/like`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.isMatch) {
                toast.success("It's a match! 🎉");
            } else {
                toast.success("Like sent! 👍");
            }

            // Move to next profile
            showNextProfile();

        } catch (error) {
            console.error('Error liking user:', error);
            const errorMessage = error.response?.data?.details || error.response?.data?.error || error.message;
            toast.error(`Failed to like user: ${errorMessage}`);
        }
    };

    const handleSkip = (userId) => {
        setProfiles(profiles.filter(user => user.id !== userId));
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (profiles.length === 0) {
        return (
            <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>
                    No more matches available at the moment.
                </Typography>
                <Typography color="text.secondary">
                    Try adjusting your preferences to see more people.
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {!loading && !error && currentProfile ? (
                <Card sx={{ maxWidth: 500, mx: 'auto' }}>
                    <CardMedia
                        component="img"
                        height="400"
                        image={currentProfile.profile_picture || '/default-avatar.jpg'}
                        alt={`${currentProfile.first_name}'s profile`}
                    />
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            {currentProfile.first_name} {currentProfile.last_name}, {calculateAge(currentProfile.birth_date)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {currentProfile.bio || "No bio available"}
                        </Typography>
                        {/* Add more user information here */}
                    </CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                        <IconButton 
                            onClick={() => handleSkip(currentProfile.id)}
                            sx={{ mr: 2 }}
                        >
                            <CloseIcon sx={{ fontSize: 30 }} />
                        </IconButton>
                        <IconButton 
                            onClick={() => handleLike(currentProfile.id)}
                            color="primary"
                        >
                            <FavoriteIcon sx={{ fontSize: 30 }} />
                        </IconButton>
                    </Box>
                </Card>
            ) : (
                <Box textAlign="center">
                    <Typography variant="h5" gutterBottom>
                        No more matches available at the moment.
                    </Typography>
                    <Typography color="text.secondary">
                        Try adjusting your preferences to see more people.
                    </Typography>
                </Box>
            )}
        </Container>
    );
}

// Helper function to calculate age
function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age;
}

export default Dashboard; 