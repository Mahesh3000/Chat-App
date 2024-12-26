import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Replace with your backend server URL
const SOCKET_SERVER_URL = "http://localhost:5000";

interface Message {
    text: string;
    sender: string;
}

const RightSection: React.FC = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);

    // useEffect(() => {
    //     const newSocket = io(SOCKET_SERVER_URL);
    //     setSocket(newSocket);

    //     return () => newSocket.disconnect();
    // }, []);

    // useEffect(() => {
    //     if (socket) {
    //         socket.on("receive_message", (data: Message) => {
    //             setMessages((prevMessages) => [...prevMessages, data]);
    //         });
    //     }
    // }, [socket]);

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.trim() && socket) {
            const newMessage: Message = { text: message, sender: "You" };
            socket.emit("send_message", newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setMessage("");
        }
    };

    return (
        <div className="right-section-container">
            <div className="messages-container">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={msg.sender === "You" ? "my-message" : "received-message"}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

            <form className="message-input" onSubmit={sendMessage}>
                <label className="attachment-button">
                    <i className="fas fa-paperclip"></i>
                    <input type="file" style={{ display: 'none' }} />
                </label>
                <input
                    type="text"
                    value={message}
                    onChange={handleMessageChange}
                    placeholder="Type a message..."
                    className="input-message"
                />
                <button type="submit" className="send-button">
                    <i className="fas fa-paper-plane"></i>
                </button>
            </form>
        </div>
    );
};

export default RightSection;
