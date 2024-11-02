import React, { useState, useEffect } from 'react';
import { useChat } from '../contexts/ChatContext';
import './Chat.css';

function Chat() {
    const [newMessage, setNewMessage] = useState('');
    const context = useChat();
    
    useEffect(() => {
        const messagesList = document.querySelector('.messages-list');
        if (messagesList) {
            messagesList.scrollTop = messagesList.scrollHeight;
        }
    }, [context?.messages]);

    if (!context) {
        return <div className="chat-loading">Loading chat context...</div>;
    }

    const { 
        messages = [], 
        matches = [], 
        selectedMatch,
        loading,
        error,
        setSelectedMatch,
        sendMessage 
    } = context;

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedMatch) return;

        try {
            await sendMessage(selectedMatch.id, newMessage.trim());
            setNewMessage('');
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    if (loading) return <div className="chat-loading">Loading messages...</div>;
    if (error) return <div className="chat-error">Error: {error}</div>;

    return (
        <div className="chat-container">
            <div className="matches-list">
                {matches && matches.length > 0 ? (
                    matches.map(match => (
                        <div 
                            key={match.id} 
                            className={`match-item ${selectedMatch?.id === match.id ? 'selected' : ''}`}
                            onClick={() => setSelectedMatch(match)}
                        >
                            <img 
                                src={match.profile_picture || '/default-avatar.png'} 
                                alt="Profile" 
                                className="match-avatar"
                            />
                            <div className="match-info">
                                <div className="match-name">
                                    {match.first_name} {match.last_name}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-matches">
                        No matches yet
                    </div>
                )}
            </div>
            
            <div className="chat-messages">
                {selectedMatch ? (
                    <>
                        <div className="chat-header">
                            <img 
                                src={selectedMatch.profile_picture || '/default-avatar.png'} 
                                alt="Profile" 
                                className="chat-avatar"
                            />
                            <div className="chat-name">
                                {selectedMatch.first_name} {selectedMatch.last_name}
                            </div>
                        </div>

                        <div className="messages-list">
                            {messages && messages.length > 0 ? (
                                messages.map(message => (
                                    <div 
                                        key={message.id}
                                        className={`message ${message.sender_id === selectedMatch.id ? 'received' : 'sent'}`}
                                    >
                                        <div className="message-content">
                                            {message.content}
                                        </div>
                                        <div className="message-time">
                                            {new Date(message.created_at).toLocaleTimeString()}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-messages">
                                    No messages yet. Start the conversation!
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleSendMessage} className="message-form">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="message-input"
                            />
                            <button type="submit" className="send-button">
                                Send
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="no-chat-selected">
                        Select a match to start chatting
                    </div>
                )}
            </div>
        </div>
    );
}

export default Chat;