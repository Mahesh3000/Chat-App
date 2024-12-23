import React, { useState } from 'react';

const RightSection = () => {
    const [message, setMessage] = useState('');

    // Dummy messages data
    const messages = [
        { id: 1, sender: 'John Doe', content: 'Hello, how are you?', isMine: false },
        { id: 2, sender: 'You', content: 'I am good, thanks!', isMine: true },
        { id: 3, sender: 'John Doe', content: 'Great to hear!', isMine: false },
        { id: 4, sender: 'You', content: 'What about you?', isMine: true },
        { id: 5, sender: 'John Doe', content: 'I am doing well, thanks for asking!', isMine: false },
        { id: 3, sender: 'John Doe', content: 'Great to hear!', isMine: false },
        { id: 4, sender: 'You', content: 'What about you?', isMine: true },
        { id: 5, sender: 'John Doe', content: 'I am doing well, thanks for asking!', isMine: false },
    ];

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim() !== '') {
            // Adding the new message to the messages array (just for demonstration)
            const newMessage = { id: messages.length + 1, sender: 'You', content: message, isMine: true };
            messages.push(newMessage);
            setMessage(''); // Clear the input
        }
    };

    return (
        <div className="right-section">
            <div className="messages-container">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`message ${msg.isMine ? 'sent' : 'received'}`}
                    >
                        <div className="message-content">
                            <p>{msg.content}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Message input with icons */}
            <form className="message-input" onSubmit={handleSendMessage}>
                {/* Attachment Icon */}
                <button type="button" className="attachment-button">
                    <i className="fas fa-paperclip"></i>
                </button>

                {/* Input field */}
                <input
                    type="text"
                    value={message}
                    onChange={handleMessageChange}
                    placeholder="Type a message..."
                    className="input-message"
                />

                {/* Send Icon */}
                <button type="submit" className="send-button">
                    <i className="fas fa-paper-plane"></i>
                </button>
            </form>
        </div>
    );
};

export default RightSection;
