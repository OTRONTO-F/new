import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    Paper,
    Box,
    Typography,
    TextField,
    IconButton,
    Avatar,
    Divider,
    CircularProgress,
    Alert
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useChat } from '../contexts/ChatContext';
import axios from 'axios';
import { API_URL } from '../config/api';

function Chat() {
    const { matchId } = useParams();
    const { messages, typingUsers, sendMessage, startTyping, stopTyping } = useChat();
    const [matchInfo, setMatchInfo] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    useEffect(() => {
        fetchMatchInfo();
        fetchMessages();
    }, [matchId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchMatchInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${API_URL}/api/matches/${matchId}/info`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMatchInfo(response.data);
        } catch (error) {
            console.error('Error fetching match info:', error);
            setError('Failed to load match information');
        }
    };

    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${API_URL}/api/chat/${matchId}/messages`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            // Messages will be handled by ChatContext
            setLoading(false);
        } catch (error) {
            console.error('Error fetching messages:', error);
            setError('Failed to load messages');
            setLoading(false);
        }
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (newMessage.trim() && matchInfo) {
            sendMessage(matchId, matchInfo.user.id, newMessage.trim());
            setNewMessage('');
        }
    };

    const handleTyping = () => {
        if (matchInfo) {
            startTyping(matchId, matchInfo.user.id);
            
            // Clear existing timeout
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }

            // Set new timeout
            typingTimeoutRef.current = setTimeout(() => {
                stopTyping(matchId, matchInfo.user.id);
            }, 2000);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Paper elevation={3} sx={{ height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
                {/* Chat Header */}
                <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
                    {matchInfo && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar
                                src={matchInfo.user.profile_picture || '/default-avatar.jpg'}
                                alt={matchInfo.user.first_name}
                                sx={{ mr: 2 }}
                            />
                            <Typography variant="h6">
                                {matchInfo.user.first_name} {matchInfo.user.last_name}
                            </Typography>
                        </Box>
                    )}
                </Box>
                
                <Divider />

                {/* Messages Area */}
                <Box sx={{ 
                    flexGrow: 1, 
                    p: 2, 
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1
                }}>
                    {messages[matchId]?.map((message) => (
                        <Box
                            key={message.id}
                            sx={{
                                alignSelf: message.sender_id === parseInt(localStorage.getItem('userId')) 
                                    ? 'flex-end' 
                                    : 'flex-start',
                                maxWidth: '70%'
                            }}
                        >
                            <Paper
                                elevation={1}
                                sx={{
                                    p: 1,
                                    bgcolor: message.sender_id === parseInt(localStorage.getItem('userId'))
                                        ? 'primary.main'
                                        : 'grey.100',
                                    color: message.sender_id === parseInt(localStorage.getItem('userId'))
                                        ? 'white'
                                        : 'text.primary'
                                }}
                            >
                                <Typography variant="body1">
                                    {message.message}
                                </Typography>
                                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                    {new Date(message.sent_at).toLocaleTimeString()}
                                </Typography>
                            </Paper>
                        </Box>
                    ))}
                    {typingUsers[matchId]?.length > 0 && (
                        <Box sx={{ alignSelf: 'flex-start' }}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                Typing...
                            </Typography>
                        </Box>
                    )}
                    <div ref={messagesEndRef} />
                </Box>

                <Divider />

                {/* Message Input */}
                <Box component="form" onSubmit={handleSend} sx={{ p: 2, bgcolor: 'background.paper' }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleTyping}
                            size="small"
                        />
                        <IconButton 
                            type="submit" 
                            color="primary"
                            disabled={!newMessage.trim()}
                        >
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default Chat;