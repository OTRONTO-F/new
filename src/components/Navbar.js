import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.clear();
        handleCloseMenu();
        navigate('/login', { replace: true });
    };

    const isActive = (path) => location.pathname === path;

    return (
        <AppBar position="static" sx={{ mb: 2 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <FavoriteIcon sx={{ display: 'flex', mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        onClick={() => navigate('/dashboard')}
                        sx={{
                            mr: 2,
                            display: 'flex',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Dating App
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        <Button
                            onClick={() => navigate('/dashboard')}
                            sx={{ 
                                color: 'white',
                                backgroundColor: isActive('/dashboard') ? 'rgba(255,255,255,0.1)' : 'transparent',
                                '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                            }}
                        >
                            Dashboard
                        </Button>
                        <Button
                            onClick={() => navigate('/matches')}
                            sx={{ 
                                color: 'white',
                                backgroundColor: isActive('/matches') ? 'rgba(255,255,255,0.1)' : 'transparent',
                                '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                            }}
                        >
                            Matches
                        </Button>
                        <Button
                            onClick={() => navigate('/preferences')}
                            sx={{ 
                                color: 'white',
                                backgroundColor: isActive('/preferences') ? 'rgba(255,255,255,0.1)' : 'transparent',
                                '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                            }}
                        >
                            Preferences
                        </Button>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
                                <Avatar alt="User Avatar" src="/default-avatar.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleCloseMenu}
                        >
                            <MenuItem onClick={() => {
                                handleCloseMenu();
                                navigate('/profile');
                            }}>
                                Profile
                            </MenuItem>
                            <MenuItem onClick={() => {
                                handleCloseMenu();
                                navigate('/preferences');
                            }}>
                                Preferences
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar; 