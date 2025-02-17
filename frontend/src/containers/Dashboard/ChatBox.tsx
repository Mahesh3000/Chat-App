import React, { useEffect, useMemo, useState } from 'react';
import Header from './Headers';
import LeftSection from './LeftSection';
import RightSection from './RightSection';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import rightBg from '../../assets/rightBg.png';
import { SOCKET_SERVER_URL } from '../constants';

interface Message {
    text: string;
    sender: string;
}

interface User {
    id: string | number;
    profile_pic?: string;
    username: string;
    email: string;
    status: string; // 'online' | 'offline'
}

const socket = io(SOCKET_SERVER_URL, {
    transports: ["websocket"], // Force WebSocket transport
});

const Chatbox = () => {
    const userData = useSelector((state: any) => state?.auth?.userData);
    const loggedInUserId = userData?.user?.id; // Assuming userData contains the logged-in user's ID
    const token = localStorage.getItem('authToken'); // Assuming token is stored in the Redux state or passed as part of user data
    // const lloged_user = userData ? userData : JSON.parse(localStorage.getItem("user"));
    const lloged_user = useMemo(
        () => userData || JSON.parse(localStorage.getItem("user") || "{}"),
        [userData]
    );

    console.log('lloged_user', lloged_user);


    const [users, setUsers] = useState<User[] | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string | number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);


    useEffect(() => {
        if (lloged_user?.user?.userId) {
            socket.emit("user-online", lloged_user.user.userId);
        }

        socket.on("update-online-users", setOnlineUsers);

        return () => {
            socket.off("update-online-users");
        };
    }, [lloged_user]);


    useEffect(() => {
        socket.on("connect", () => console.log("Connected to Socket.IO server"));
        socket.on("disconnect", () =>
            console.log("Disconnected from Socket.IO server")
        );

        return () => {
            socket.off("connect");
            socket.off("disconnect");
        };
    }, []);

    // useEffect(() => {
    //     socket.on('connect', () => {
    //         console.log('Connected to Socket.IO server');
    //     });

    //     socket.on('disconnect', () => {
    //         console.log('Disconnected from Socket.IO server');
    //     });

    //     return () => {
    //         socket.off('connect');
    //         socket.off('disconnect');
    //     };
    // }, [socket]);


    useEffect(() => {
        const fetchUsers = async () => {
            if (!token) {
                setError('No authentication token found');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:5001/api/users', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUsers(response.data); // Set the fetched users
                setLoading(false); // Set loading to false after data is loaded
            } catch (err: any) {
                console.error('Error fetching users:', err);
                setError('Failed to fetch users');
                setLoading(false); // Set loading to false even if there was an error
            }
        };

        if (!users) {
            fetchUsers(); // Fetch the users when the component mounts
        }
    }, [token]); // Dependency on token ensures it runs when the token changes

    const handleUserClick = (userId: string | number) => {
        console.log('iddd');

        setSelectedUserId(userId); // Select a user when clicked
    };

    return (
        <div className="chatbox-container">
            <Header users={lloged_user?.user} />
            <div className="content">
                <div className="left-section">
                    {loading ? (
                        <div>Loading users...</div>
                    ) : error ? (
                        <div>{error}</div>
                    ) : (
                        <LeftSection userslist={users} onUserClick={handleUserClick} />
                    )}
                </div>
                <div className="right-section">
                    {selectedUserId ? <RightSection currentUserId={lloged_user?.user?.userId} otherUser={selectedUserId} /> :
                        <div className="no-messages-container">
                            <img src={rightBg} alt="No messages" className="no-messages-image" />
                            <p className="no-messages-text">Send and receive messages without keeping your phone online.</p>
                        </div>}
                </div>
            </div>
        </div>
    );
};

export default Chatbox;


// import React, { useEffect, useState } from 'react';
// import Header from './Headers';
// import LeftSection from './LeftSection';
// import RightSection from './RightSection';
// import axios from 'axios';
// import { useSelector } from 'react-redux';


// interface Message {
//     text: string;
//     sender: string;
// }

// interface User {
//     id: string | number; // Adjust based on your data
//     profile_pic?: string;
//     username: string;
//     email: string;
//     status: string; // e.g., 'online', 'offline'
// }

// const Chatbox = () => {
//     const userData = useSelector((state) => state?.auth?.userData);
//     console.log('userData', userData?.user?.username);
//     const loggedInUser = userData?.user?.username

//     // const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const storedUsers = localStorage.getItem('user');
//     // console.log('loggedInUser', loggedInUser, storedUsers);
//     const user = storedUsers ? JSON.parse(storedUsers) : null;



//     const [users, setUsers] = useState<User[] | null>(null);
//     const [messages, setMessages] = useState<Message[]>([]);
//     const [selectedUserId, setSelectedUserId] = useState<string | number | null>(null);


//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 // Get the token from localStorage (assuming JWT is stored in localStorage)
//                 // const token = localStorage.getItem('token');

//                 if (!user?.token) {
//                     setLoading(false);
//                     // return;
//                 }
//                 const response = await axios.get('http://localhost:4000/users', {
//                     headers: {
//                         'Authorization': `Bearer ${user?.token}`, // Send the token for authentication
//                     },
//                 });
//                 setUsers(response.data); // Set the fetched users
//                 setLoading(false); // Set loading to false after data is loaded
//             } catch (err) {
//                 setLoading(false); // Set loading to false even if there was an error
//             }
//         };

//         fetchUsers(); // Fetch the users when the component mounts
//     }, []); // Empty dependency array to ensure it runs only once


//     const handleUserClick = async (userId: string | number) => {
//         setSelectedUserId(userId);
//     };

//     // console.log('users', users);
//     const filteredUsers = users?.filter(us => us.id !== user?.user?.id)

//     console.log('selectedUserId', selectedUserId);

//     return (
//         <div className="chatbox-container">
//             <Header users={user} />
//             <div className="content">
//                 <div className="left-section">
//                     <LeftSection userslist={filteredUsers} onUserClick={handleUserClick} />
//                 </div>
//                 <div className="right-section">
//                     <RightSection currentUserId={user?.user?.id} otherUser={selectedUserId} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Chatbox;
