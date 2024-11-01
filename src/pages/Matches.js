import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import axios from '../utils/axios';

function Matches() {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await axios.get('/matches');
                setMatches(response.data);
            } catch (error) {
                console.error('Error fetching matches:', error);
            }
        };
        fetchMatches();
    }, []);

    const handleMessage = (userId) => {
        // TODO: Implement messaging functionality
        console.log('Message user:', userId);
    };

    return (
        <Container>
            <Typography variant="h4" sx={{ my: 4 }}>
                Your Matches
            </Typography>
            <Grid container spacing={3}>
                {matches.map((match) => (
                    <Grid item xs={12} sm={6} md={4} key={match.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={match.profile_picture || '/default-avatar.png'}
                                alt={`${match.first_name}'s profile`}
                            />
                            <CardContent>
                                <Typography variant="h6">
                                    {match.first_name} {match.last_name}
                                </Typography>
                                <Typography color="text.secondary" sx={{ mb: 2 }}>
                                    {match.bio || 'No bio available'}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => handleMessage(match.id)}
                                >
                                    Send Message
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
                {matches.length === 0 && (
                    <Grid item xs={12}>
                        <Typography variant="h6" textAlign="center" color="text.secondary">
                            No matches yet. Keep swiping!
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
}

export default Matches; 