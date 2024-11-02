import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Avatar,
    Divider,
    IconButton,
    Badge,
    Alert,
    CircularProgress
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import { API_URL } from '../config/api';

function Matches() {
    const navigate = useNavigate();
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchMatches();
    }, []);

    const fetchMatches = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${API_URL}/api/matches/list`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMatches(response.data);
        } catch (error) {
            console.error('Error fetching matches:', error);
            setError('Failed to load matches');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (matches.length === 0) {
        return (
            <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>
                    No matches yet
                </Typography>
                <Typography color="text.secondary">
                    Keep swiping to find your perfect match!
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Typography variant="h4" gutterBottom>
                Your Matches
            </Typography>

            <Grid container spacing={3}>
                {matches.map((match) => (
                    <Grid item xs={12} sm={6} md={4} key={match.match_id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={match.profile_picture || '/default-avatar.jpg'}
                                alt={`${match.first_name}'s profile`}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" gutterBottom>
                                    {match.first_name} {match.last_name}
                                </Typography>
                                {match.last_message && (
                                    <Typography variant="body2" color="text.secondary" noWrap>
                                        {match.last_message}
                                    </Typography>
                                )}
                            </CardContent>
                            <Divider />
                            <Box sx={{ display: 'flex', justifyContent: 'space-around', p: 1 }}>
                                <IconButton 
                                    onClick={() => navigate(`/profile/${match.id}`)}
                                    color="primary"
                                >
                                    <PersonIcon />
                                </IconButton>
                                <IconButton 
                                    onClick={() => navigate(`/chat/${match.match_id}`)}
                                    color="primary"
                                >
                                    <Badge color="error" variant="dot" invisible={!match.unread_messages}>
                                        <ChatIcon />
                                    </Badge>
                                </IconButton>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Matches; 