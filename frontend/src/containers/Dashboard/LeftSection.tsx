import React from 'react';
import { FaUserAlt } from 'react-icons/fa';

interface User {
    id: string | number; // Adjust based on your data
    profile_pic?: string;
    username: string;
    email: string;
    status: string; // e.g., 'online', 'offline'
}

interface LeftSectionProps {
    userslist: User[] | null; // Array of `User` objects or `null`
    onUserClick: (userId: string | number) => void; // Callback for user click
}

const LeftSection: React.FC<LeftSectionProps> = ({ userslist, onUserClick }) => {



    return (
        <div>
            {userslist ? (
                userslist.map((user) => (
                    <div key={user.id} className="user-item"
                        onClick={() => onUserClick(user.id)} // Trigger callback on click
                    >
                        <div className="user-icon">
                            {/* Fallback to FaUserAlt if no profile picture is available */}
                            {user?.profile_pic ? (
                                <img src={`http://localhost:4000${user?.profile_pic}`} alt="User Avatar" className="left-avatar" />
                            ) : (
                                <FaUserAlt size={30} />
                            )}
                            <div className={`status-indicator ${user.status}`}></div>
                        </div>
                        <div className="user-details">
                            <h1>{user.username}</h1>
                            <span>{user.email}</span>
                        </div>
                    </div>
                ))
            ) : (
                <p>No users available</p>
            )}
        </div>
    );
};

export default LeftSection;
