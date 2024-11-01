import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import axios from '../utils/axios';

function Dashboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/users/potential-matches');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <Container>
            <Typography variant="h4" sx={{ my: 4 }}>
                Find Your Match
            </Typography>
            <Grid container spacing={3}>
                {users.map((user) => (
                    <Grid item xs={12} sm={6} md={4} key={user.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={user.profile_picture || '/default-avatar.png'}
                                alt={`${user.first_name}'s profile`}
                            />
                            <CardContent>
                                <Typography variant="h6">
                                    {user.first_name} {user.last_name}
                                </Typography>
                                <Typography color="text.secondary">
                                    {user.bio || 'No bio available'}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                >
                                    Like Profile
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Dashboard; 