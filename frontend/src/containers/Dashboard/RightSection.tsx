import React, { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import rightBg from '../../assets/rightBg.png';

const SOCKET_SERVER_URL = "http://localhost:4000";

type Message = {
    id: string;
    senderId: string;
    receiverId: string;
    message: string;
    timestamp: string;
};

interface RightSectionProps {
    currentUserId: string;
    otherUser: string;
}

const RightSection: React.FC<RightSectionProps> = ({ currentUserId, otherUser }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    console.log('otherUser', otherUser, 'currentUserId', currentUserId);

    // Socket setup: Ensure socket stays open and listens for new messages
    useEffect(() => {
        const newSocket = io(SOCKET_SERVER_URL);
        setSocket(newSocket);

        // Emit join_conversation to create a room with the current conversation
        newSocket.emit("join_conversation", { senderId: currentUserId, receiverId: otherUser });

        // Listen for previous messages
        newSocket.on("load_messages", (loadedMessages: Message[]) => {
            setMessages(loadedMessages);
        });

        // Listen for new messages in real-time
        newSocket.on("receive_message", (msg: Message) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        // Cleanup socket connection on unmount
        return () => {
            newSocket.disconnect();
        };
    }, [currentUserId, otherUser]);

    // Scroll to bottom when new messages arrive
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    // Send message: emit the message to the backend and update UI optimistically
    const sendMessage = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (message.trim() && socket) {
                const newMessage = {
                    senderId: currentUserId,
                    receiverId: otherUser,
                    message,
                };

                // Emit the message to the backend
                socket.emit("send_message", newMessage);

                // Optimistically update the UI with the new message
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { ...newMessage, id: `${Date.now()}`, timestamp: new Date().toISOString() },
                ]);

                setMessage("");
            }
        },
        [message, socket, currentUserId, otherUser]
    );

    return (
        <div className="right-section-container">
            <div className="messages-container">
                {messages.length > 0 ? (
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
                    ))
                ) : (
                    <div className="no-messages-container">
                        <img src={rightBg} alt="No messages" className="no-messages-image" />
                        <p className="no-messages-text">Send and receive messages without keeping your phone online.</p>
                    </div>
                )}
                {/* This is the "dummy" div used to trigger the scroll to bottom */}
                {/* <div ref={messagesEndRef} /> */}
            </div>

            <form className="message-input" onSubmit={sendMessage}>
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
