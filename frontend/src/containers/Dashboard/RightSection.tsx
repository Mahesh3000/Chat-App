import React, { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import rightBg from '../../assets/rightBg.png'

// Replace with your backend server URL
const SOCKET_SERVER_URL = "http://localhost:4000";

type Message = {
    id: string;
    senderId: string;
    receiver_id: string;
    message: string;
    timestamp: string;
};

interface RightSectionProps {
    currentUserId: string; // Current user's ID
    otherUser: string; // Other user's ID
}

const RightSection: React.FC<RightSectionProps> = ({ currentUserId, otherUser }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // Socket setup
    useEffect(() => {
        if (socket) {
            socket.disconnect();
        }

        const newSocket = io(SOCKET_SERVER_URL);
        setSocket(newSocket);

        // Load previous messages
        newSocket.on("load_messages", (loadedMessages: Message[]) => {
            setMessages(loadedMessages);
        });

        // Receive new messages
        newSocket.on("receive_message", (msg: Message) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });
        // Request messages for the conversation
        newSocket.emit("get_messages", { userId: currentUserId, otherUserId: otherUser });

        return () => {
            newSocket.disconnect();
        };
    }, [currentUserId, otherUser]);


    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, otherUser]);



    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    // Send message
    const sendMessage = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (message.trim() && socket) {
                const newMessage = {
                    senderId: currentUserId,
                    receiverId: otherUser,
                    message,
                };

                // Emit message to backend
                socket.emit("send_message", newMessage);

                // Optimistically add message to the UI
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { ...newMessage, id: `${Date.now()}`, timestamp: new Date().toISOString() },
                ]);

                setMessage("");
            }
        },
        [message, socket, currentUserId, otherUser]
    );

    console.log('currentUserId', currentUserId);
    console.log("messages", messages);

    return (
        <div className="right-section-container">
            <div className="messages-container">
                {messages?.length > 0 ? (
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={msg.senderId === currentUserId ? "my-message" : "received-message"}
                        >
                            <div className="message-content">{msg.message}</div>
                            <div className="timestamp">
                                {new Date(msg.timestamp).toLocaleTimeString()}
                            </div>
                        </div>
                    ))) : (
                    <div className="no-messages-container">
                        <img
                            src={rightBg}
                            alt="No messages"
                            className="no-messages-image"
                        />
                        <p className="no-messages-text">Send and receive messages without keeping your phone online.</p>
                    </div>
                )}
            </div>
            {/* <div ref={messagesEndRef} /> */}

            <form className="message-input" onSubmit={sendMessage}>
                <label className="attachment-button">
                    <i className="fas fa-paperclip"></i>
                    <input type="file" style={{ display: "none" }} />
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

