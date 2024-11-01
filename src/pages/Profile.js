import { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, Avatar } from '@mui/material';
import axios from '../utils/axios';

function Profile() {
    const [profile, setProfile] = useState({
        first_name: '',
        last_name: '',
        email: '',
        birth_date: '',
        gender: '',
        bio: '',
        profile_picture: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/users/profile');
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('/users/profile', profile);
            alert('Profile updated successfully!');
        } catch (error) {
            alert('Error updating profile');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" sx={{ mb: 4 }}>
                    Your Profile
                </Typography>

                <Avatar
                    src={profile.profile_picture || '/default-avatar.png'}
                    sx={{ width: 120, height: 120, mb: 2 }}
                />

                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        name="first_name"
                        label="First Name"
                        value={profile.first_name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="last_name"
                        label="Last Name"
                        value={profile.last_name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="email"
                        label="Email"
                        value={profile.email}
                        disabled
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="birth_date"
                        label="Birth Date"
                        type="date"
                        value={profile.birth_date}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="bio"
                        label="Bio"
                        multiline
                        rows={4}
                        value={profile.bio}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Update Profile
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Profile; 