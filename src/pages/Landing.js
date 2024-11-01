import { Box, Button, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';

function Landing() {
    const navigate = useNavigate();

    return (
        <Box>
            {/* Hero Section */}
            <Box 
                sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    py: 8,
                    textAlign: 'center'
                }}
            >
                <Container maxWidth="md">
                    <Typography variant="h2" component="h1" gutterBottom>
                        Find Your Perfect Match
                    </Typography>
                    <Typography variant="h5" component="h2" sx={{ mb: 4 }}>
                        Join thousands of people looking for their special someone
                    </Typography>
                    <Box sx={{ mt: 4 }}>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            size="large"
                            onClick={() => navigate('/register')}
                            sx={{ mr: 2 }}
                        >
                            Get Started
                        </Button>
                        <Button 
                            variant="outlined" 
                            color="inherit" 
                            size="large"
                            onClick={() => navigate('/login')}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* Features Section */}
            <Container sx={{ py: 8 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ height: '100%', textAlign: 'center' }}>
                            <CardContent>
                                <FavoriteIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                                <Typography variant="h5" component="h3" gutterBottom>
                                    Meaningful Connections
                                </Typography>
                                <Typography color="text.secondary">
                                    Find people who share your interests and values. 
                                    Create real connections that last.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ height: '100%', textAlign: 'center' }}>
                            <CardContent>
                                <PeopleIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                                <Typography variant="h5" component="h3" gutterBottom>
                                    Large Community
                                </Typography>
                                <Typography color="text.secondary">
                                    Join our growing community of singles looking for 
                                    genuine relationships.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ height: '100%', textAlign: 'center' }}>
                            <CardContent>
                                <SecurityIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                                <Typography variant="h5" component="h3" gutterBottom>
                                    Safe & Secure
                                </Typography>
                                <Typography color="text.secondary">
                                    Your privacy and security are our top priority. 
                                    Feel safe while finding love.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>

            {/* How It Works Section */}
            <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
                <Container>
                    <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
                        How It Works
                    </Typography>
                    <Grid container spacing={4} sx={{ mt: 2 }}>
                        <Grid item xs={12} md={4}>
                            <Box textAlign="center">
                                <Typography variant="h4" color="primary" gutterBottom>
                                    1
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    Create Profile
                                </Typography>
                                <Typography color="text.secondary">
                                    Sign up and create your detailed profile
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box textAlign="center">
                                <Typography variant="h4" color="primary" gutterBottom>
                                    2
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    Find Matches
                                </Typography>
                                <Typography color="text.secondary">
                                    Browse profiles and find your potential matches
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box textAlign="center">
                                <Typography variant="h4" color="primary" gutterBottom>
                                    3
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    Start Dating
                                </Typography>
                                <Typography color="text.secondary">
                                    Connect and start your journey together
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Call to Action */}
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <Container>
                    <Typography variant="h4" gutterBottom>
                        Ready to Find Love?
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        size="large"
                        onClick={() => navigate('/register')}
                        sx={{ mt: 2 }}
                    >
                        Join Now
                    </Button>
                </Container>
            </Box>
        </Box>
    );
}

export default Landing; 