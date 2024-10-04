// src/components/EmergencyChatbot.js
import React, { useState } from 'react';
import './EmergencyChatbot.css'; // Create a CSS file for styling if needed

const EmergencyChatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const emergencyServices = {
        police: '1999',
        fire: '110',
        ambulance: '1990',
        disasterServices: '117',
        waterBoard: '1939',
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add user message
        const userMessage = { text: input, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        // Simulate bot response
        const botResponse = getBotResponse(input);
        if (botResponse) {
            setMessages((prevMessages) => [...prevMessages, botResponse]);
        }

        setInput('');
    };

    const getBotResponse = (message) => {
        // Basic keyword matching for emergency services
        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('police')) {
            return { text: `Call the police at ${emergencyServices.police}`, sender: 'bot' };
        } else if (lowerMessage.includes('fire')) {
            return { text: `Call the fire department at ${emergencyServices.fire}`, sender: 'bot' };
        } else if (lowerMessage.includes('ambulance')) {
            return { text: `Call the ambulance service at ${emergencyServices.ambulance}`, sender: 'bot' };
        } else if (lowerMessage.includes('disaster')) {
            return { text: `Contact disaster services at ${emergencyServices.disasterServices}`, sender: 'bot' };
        } else if (lowerMessage.includes('water')) {
            return { text: `Contact the water board at ${emergencyServices.waterBoard}`, sender: 'bot' };
        } else {
            return { text: "I'm sorry, I didn't understand that. Please mention the service you need help with (police, fire, ambulance, disaster, or water).", sender: 'bot' };
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-header">Emergency Chatbot</div>
            <div className="chatbot-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSend} className="chatbot-input-form">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    required
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default EmergencyChatbot;
