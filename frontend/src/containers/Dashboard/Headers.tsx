import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


interface HeaderProps {
    users: Record<string, any> | null; // Adjust this type based on the structure of your `users` object
}

const Header: React.FC<HeaderProps> = ({ users }) => {
    // console.log('users', users);
    const navigate = useNavigate()
    // const userName = users ? users.username : 'mahesh'
    // console.log('userName', users);

    const avatarUrl = users ? `http://localhost:5001${users?.image}` : "/default-avatar.jpg";



    const handleLogout = async () => {
        try {

            const isLogout = await axios.post('http://localhost:5001/auth/logout', { userId: users?.userId })

            if (isLogout.status === 200) {
                localStorage.removeItem('user');
                localStorage.removeItem('authToken');
                navigate('/');
            }
        } catch (error) {
            console.error("Error logging out", error);
        }

    }

    return (
        <header className="chat-header">
            <div className="user-info">
                <img src={avatarUrl} alt="User Avatar" className="avatar" />
                <span className="usernames">{users?.username}</span>
            </div>
            <h1 className="app-title">Pingify</h1>
            {/* <Link to="/login" > */}
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
            {/* </Link> */}
        </header>
    );
};

export default Header;
