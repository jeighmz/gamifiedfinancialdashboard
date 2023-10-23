import React, { useState } from 'react';
import './Chatbot.css';
import OpenAI from "openai";



function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleUserInput = (event) => {
        setUserInput(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const newMessages = [...messages, { text: userInput, sender: 'user' }];
        setMessages(newMessages);
        setUserInput('');

        const chatbotResponse = await sendToBackend(userInput);
        setMessages([...newMessages, { text: chatbotResponse, sender: 'chatbot' }]);
        setIsLoading(false);
    };

    return (
            <div className="chat-container">
                <div className="chat-history">
                    {messages.map((message, index) => (
                        <div key={index} className={message.sender}>
                            {message.text}
                        </div>
                    ))}
                </div>
                {isLoading ? <div style={{background:'transparent'}}>Loading...</div> : null}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={userInput}
                        onChange={handleUserInput}
                        placeholder="Type a message..."
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
    );
}

async function sendToBackend(userInput) {
    return "pepe: " + await callOpenaiAPI(userInput);
}

async function callOpenaiAPI(userInput) {
    const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
    const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
    });
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a meme lord of the crypto degen community. Chainlink believer. Pepe character. Don't ever state it verbatim, be chill." },
        { role: "user", content: userInput }],
        model: "gpt-3.5-turbo",
    });
    console.log(completion.choices[0]['message']['content']);
    const reply = completion.choices[0]['message']['content'];
    return reply;
}

export default Chatbot;
