import React, { useEffect, useState } from 'react';
import Header from './Headers';
import LeftSection from './LeftSection';
import RightSection from './RightSection';

const Chatbox = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const storedUsers = localStorage.getItem("praneetha");
    const user = storedUsers ? JSON.parse(storedUsers) : null;

    console.log("users:", users);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:4000/users'); // Make GET request to the /users endpoint
                if (!response.ok) {
                    throw new Error('Error fetching users');
                }
                const data = await response.json();
                setUsers(data); // Update the state with the fetched users
                setLoading(false); // Set loading to false once data is loaded
            } catch (err) {
                setError(err.message); // Handle errors
                setLoading(false); // Set loading to false even if there was an error
            }
        };

        fetchUsers(); // Call the function to fetch users
    }, []); // Empty dependency array to run only once when the component mounts

    console.log('users', users);


    return (
        <div className="chatbox-container">
            <Header users={user} />
            <div className="content">
                <div className="left-section">
                    <LeftSection userslist={users} />
                </div>
                <div className="right-section">
                    <RightSection />
                </div>
            </div>
        </div>
    );
};

export default Chatbox;
