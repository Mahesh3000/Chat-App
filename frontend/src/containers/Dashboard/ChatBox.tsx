import React, { useEffect, useState } from 'react';
import Header from './Headers';
import LeftSection from './LeftSection';
import RightSection from './RightSection';
import axios from 'axios';
import { useSelector } from 'react-redux';


interface Message {
    text: string;
    sender: string;
}

interface User {
    id: string | number; // Adjust based on your data
    profile_pic?: string;
    username: string;
    email: string;
    status: string; // e.g., 'online', 'offline'
}

const Chatbox = () => {
    const userData = useSelector((state) => state?.auth?.userData);
    // console.log('userData', userData?.user?.username);
    const loggedInUser = userData?.user?.username

    // const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const storedUsers = localStorage.getItem('user');
    // console.log('loggedInUser', loggedInUser, storedUsers);
    const user = storedUsers ? JSON.parse(storedUsers) : null;



    const [users, setUsers] = useState<User[] | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string | number | null>(null);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Get the token from localStorage (assuming JWT is stored in localStorage)
                // const token = localStorage.getItem('token');

                if (!user?.token) {
                    setLoading(false);
                    // return;
                }
                const response = await axios.get('http://localhost:4000/users', {
                    headers: {
                        'Authorization': `Bearer ${user?.token}`, // Send the token for authentication
                    },
                });
                setUsers(response.data); // Set the fetched users
                setLoading(false); // Set loading to false after data is loaded
            } catch (err) {
                setLoading(false); // Set loading to false even if there was an error
            }
        };

        fetchUsers(); // Fetch the users when the component mounts
    }, []); // Empty dependency array to ensure it runs only once


    const handleUserClick = async (userId: string | number) => {
        setSelectedUserId(userId);
    };

    // console.log('users', users);
    const filteredUsers = users?.filter(us => us.id !== user?.user?.id)

    console.log('selectedUserId', selectedUserId);

    return (
        <div className="chatbox-container">
            <Header users={user} />
            <div className="content">
                <div className="left-section">
                    <LeftSection userslist={filteredUsers} onUserClick={handleUserClick} />
                </div>
                <div className="right-section">
                    <RightSection currentUserId={user?.user?.id} otherUser={selectedUserId} />
                </div>
            </div>
        </div>
    );
};

export default Chatbox;
