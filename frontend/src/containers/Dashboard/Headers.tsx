import React from 'react';

const Header = () => {
    return (
        <header className="chat-header">
            <div className="user-info">
                <img src="profile-pic.jpg" alt="User Avatar" className="avatar" />
                <span className="username">John Doe</span>
            </div>
            <h1 className="app-title">Pingify</h1>
            <button className="logout-btn">Logout</button>
        </header>
    );
};

export default Header;
