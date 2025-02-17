import React from 'react';
import { FaUserAlt } from 'react-icons/fa';

interface User {
    _id: string | number; // Adjusted based on the provided data
    image?: string | null;
    username: string;
    email: string;
    is_online: string; // This is the status ('0' for offline, '1' for online)
}

interface LeftSectionProps {
    userslist: User[] | null; // Array of `User` objects or `null`
    onUserClick: (userId: string | number) => void; // Callback for user click
}

const LeftSection: React.FC<LeftSectionProps> = ({ userslist, onUserClick }) => {
    if (!userslist || userslist.length === 0) {
        return <p>No users available</p>;
    }

    // console.log('userslist', userslist);


    return (
        <div className="users-list">
            {userslist.map((user) => (
                <div
                    key={user._id} // Use _id instead of id
                    className="user-item"
                    onClick={() => onUserClick(user._id)} // Pass _id on click
                >
                    <div className="user-icon">
                        {/* Use user profile image or default icon */}
                        {user.image ? (
                            <img
                                // src={user.image}
                                src={`http://localhost:5001${user.image}`}

                                alt={`${user.username} avatar`}
                                className="left-avatar"
                            />
                        ) : (
                            <FaUserAlt size={30} />
                        )}
                        <div className={`status-indicator ${user.is_online === "1" ? 'online' : 'offline'}`} />
                    </div>

                    <div className="user-details">
                        <h1>{user.username}</h1>
                        <span>{user.email}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LeftSection;
