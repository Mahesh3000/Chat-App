import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


interface HeaderProps {
    users: Record<string, any> | null; // Adjust this type based on the structure of your `users` object
}

const Header: React.FC<HeaderProps> = ({ users }) => {
    // console.log('users', users);
    const navigate = useNavigate()
    const userName = users ? users.user.username : 'mahesh'

    // const avatarUrl = users ? users?.user?.profilePic : "/default-avatar.jpg";
    const avatarUrl = users ? `http://localhost:4000${users.user.profilePic}` : "/default-avatar.jpg";



    const handleLogout = () => {
        navigate('/')
        localStorage.removeItem('user')
    }

    return (
        <header className="chat-header">
            <div className="user-info">
                <img src={avatarUrl} alt="User Avatar" className="avatar" />
                <span className="username">{userName}</span>
            </div>
            <h1 className="app-title">Pingify</h1>
            {/* <Link to="/login" > */}
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
            {/* </Link> */}
        </header>
    );
};

export default Header;
