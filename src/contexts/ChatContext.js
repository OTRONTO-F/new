import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [matches, setMatches] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch matches
    const fetchMatches = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/api/matches`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMatches(response.data);
        } catch (error) {
            console.error('Error fetching matches:', error);
            setError('Failed to load matches');
        }
    };

    // Fetch messages for selected match
    const fetchMessages = async (matchId) => {
        if (!matchId) return;
        
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/api/messages/${matchId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
            setError('Failed to load messages');
        } finally {
            setLoading(false);
        }
    };

    // Send message
    const sendMessage = async (matchId, content) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${API_URL}/api/messages/${matchId}`,
                { content },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessages(prev => [...prev, response.data]);
            return response.data;
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    };

    // Effect to fetch matches on mount
    useEffect(() => {
        fetchMatches();
    }, []);

    // Effect to fetch messages when selected match changes
    useEffect(() => {
        if (selectedMatch) {
            fetchMessages(selectedMatch.id);
        }
    }, [selectedMatch]);

    const value = {
        messages,
        matches,
        selectedMatch,
        loading,
        error,
        setSelectedMatch,
        sendMessage,
        fetchMatches,
        fetchMessages
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};