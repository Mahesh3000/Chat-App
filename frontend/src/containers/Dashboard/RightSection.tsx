import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import rightBg from '../../assets/rightBg.png';

const SOCKET_SERVER_URL = "http://localhost:5001";

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
    console.log('currentUserId', currentUserId);

    useEffect(() => {
        const newSocket = io(SOCKET_SERVER_URL);
        setSocket(newSocket);

        // Fetch previous messages on mount
        newSocket.emit("fetch-messages", { currentUserId, otherUser });

        // Listen for fetched messages
        newSocket.on("messages", (chatHistory: Message[]) => {
            setMessages(chatHistory);
        });

        // Listen for real-time messages
        newSocket.on("receive-message", (newMessage: Message) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            newSocket.close();  // Properly close the socket connection
        };
    }, [currentUserId, otherUser]);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // if (!messages.trim() || !socket) return;
        console.log();

        socket.emit("send-message", { senderId: currentUserId, receiverId: otherUser, message });

        setMessage(""); // Clear input
    };

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
                <button
                    type="submit"
                    className="send-button"
                    disabled={!message.trim()} // Disable send button when message is empty
                >
                    <i className="fas fa-paper-plane"></i>
                </button>
            </form>
        </div>
    );
};

export default RightSection;



// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { io, Socket } from "socket.io-client";
// import rightBg from '../../assets/rightBg.png';

// const SOCKET_SERVER_URL = "http://localhost:8000";

// type Message = {
//     id: string;
//     senderId: string;
//     receiverId: string;
//     message: string;
//     timestamp: string;
// };

// interface RightSectionProps {
//     currentUserId: string;
//     otherUser: string;
// }

// const RightSection: React.FC<RightSectionProps> = ({ currentUserId, otherUser }) => {
//     const [socket, setSocket] = useState<Socket | null>(null);
//     const [message, setMessage] = useState<string>("");
//     const [messages, setMessages] = useState<Message[]>([]);
//     const messagesEndRef = useRef<HTMLDivElement | null>(null);
//     console.log('otherUser', otherUser, 'currentUserId', currentUserId);
//     console.log("messages", messages);

//     useEffect(() => {
//         const newSocket = io(SOCKET_SERVER_URL);
//         setSocket(newSocket);

//         // Fetch previous messages on mount
//         newSocket.emit("fetch-messages", { currentUserId, otherUser });

//         newSocket.on("messages", (chatHistory: Message[]) => {
//             setMessages(chatHistory);
//         });

//         newSocket.on("receive-message", (newMessage: Message) => {
//             setMessages((prevMessages) => [...prevMessages, newMessage]);
//         });

//         return () => {
//             newSocket.close();  // Better than disconnecting directly
//         };
//     }, [currentUserId, otherUser]);


//     // useEffect(() => {
//     //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     // }, [messages]);



//     const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setMessage(e.target.value);
//     };




//     const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if (!message.trim() || !socket) return;

//         socket.emit("send-message", { senderId: currentUserId, receiverId: otherUser, message });

//         setMessage(""); // Clear input
//     };

//     return (
//         <div className="right-section-container">
//             <div className="messages-container">
//                 {messages.length > 0 ? (
//                     messages.map((msg) => (
//                         <div
//                             key={msg.id}
//                             className={msg.senderId === currentUserId ? "my-message" : "received-message"}
//                         >
//                             <div className="message-content">{msg.message}</div>
//                             <div className="timestamp">
//                                 {new Date(msg.timestamp).toLocaleTimeString()}
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <div className="no-messages-container">
//                         <img src={rightBg} alt="No messages" className="no-messages-image" />
//                         <p className="no-messages-text">Send and receive messages without keeping your phone online.</p>
//                     </div>
//                 )}
//                 {/* This is the "dummy" div used to trigger the scroll to bottom */}
//                 <div ref={messagesEndRef} />
//             </div>

//             <form className="message-input" onSubmit={sendMessage}>
//                 <input
//                     type="text"
//                     value={message}
//                     onChange={handleMessageChange}
//                     placeholder="Type a message..."
//                     className="input-message"
//                 />
//                 <button type="submit" className="send-button">
//                     <i className="fas fa-paper-plane"></i>
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default RightSection;





// Socket setup: Ensure socket stays open and listens for new messages
// useEffect(() => {
//     const newSocket = io(SOCKET_SERVER_URL);
//     setSocket(newSocket);

//     // Emit join_conversation to create a room with the current conversation
//     newSocket.emit("join_conversation", { senderId: currentUserId, receiverId: otherUser });

//     // Listen for previous messages
//     newSocket.on("load_messages", (loadedMessages: Message[]) => {
//         setMessages(loadedMessages);
//     });

//     // Listen for new messages in real-time
//     newSocket.on("receive_message", (msg: Message) => {
//         setMessages((prevMessages) => [...prevMessages, msg]);
//     });

//     // Cleanup socket connection on unmount
//     return () => {
//         newSocket.disconnect();
//     };
// }, [currentUserId, otherUser]);

// Scroll to bottom when new messages arrive
// useEffect(() => {
//     if (messagesEndRef.current) {
//         messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
// }, [messages]);

