import React from 'react';
import Header from './Headers';
import LeftSection from './LeftSection';
import RightSection from './RightSection';

const Chatbox = () => {
    return (
        <div className="chatbox-container">
            <Header />
            <div className="content">
                <div className="left-section">
                    <LeftSection />
                </div>
                <div className="right-section">
                    <RightSection />
                </div>
            </div>
        </div>
    );
};

export default Chatbox;
