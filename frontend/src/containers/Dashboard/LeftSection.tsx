import React from 'react';
import { FaUserAlt } from 'react-icons/fa';

const LeftSection = () => {
    const users = [
        { id: 1, name: 'John Doe', email: 'johndoe@example.com', status: 'online' },
        { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', status: 'offline' },
        { id: 3, name: 'Michael Johnson', email: 'michaelj@example.com', status: 'online' },
        { id: 4, name: 'Emily Davis', email: 'emilydavis@example.com', status: 'offline' },
        { id: 5, name: 'David Brown', email: 'davidbrown@example.com', status: 'online' },
        { id: 6, name: 'Chris Lee', email: 'chrislee@example.com', status: 'offline' },
        { id: 7, name: 'Sarah White', email: 'sarahwhite@example.com', status: 'online' },
        { id: 8, name: 'James Harris', email: 'jamesharris@example.com', status: 'offline' },
        { id: 9, name: 'Patricia Clark', email: 'patriciaclark@example.com', status: 'online' },
        { id: 10, name: 'Robert Lewis', email: 'robertlewis@example.com', status: 'offline' },
        { id: 11, name: 'Jennifer Walker', email: 'jenniferwalker@example.com', status: 'online' },
        { id: 12, name: 'William Allen', email: 'williamallen@example.com', status: 'offline' },
        { id: 13, name: 'Linda Young', email: 'lindayoung@example.com', status: 'online' },
        { id: 14, name: 'Daniel King', email: 'danielking@example.com', status: 'offline' },
        { id: 15, name: 'Karen Scott', email: 'karenscott@example.com', status: 'online' },
        { id: 16, name: 'Joseph Adams', email: 'josephadams@example.com', status: 'offline' },
        { id: 17, name: 'Mary Nelson', email: 'marynelson@example.com', status: 'online' },
        { id: 18, name: 'Charles Carter', email: 'charlescarter@example.com', status: 'offline' },
        { id: 19, name: 'Betty Mitchell', email: 'bettymitchell@example.com', status: 'online' },
        { id: 20, name: 'Edward Perez', email: 'edwardperez@example.com', status: 'offline' },
    ];

    return (
        <div>
            {users.map((user) => (
                <div key={user.id} className="user-item">
                    <div className="user-icon">
                        <FaUserAlt size={30} />
                        <div className={`status-indicator ${user.status}`}></div>
                    </div>
                    <div className="user-details">
                        <h1>{user.name}</h1>
                        <span>{user.email}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LeftSection;
