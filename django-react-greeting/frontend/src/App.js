import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting name:", name);  // Debugging log

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/greet/', { name });
            console.log("Response received:", response.data);  // Debugging log
            setMessage(response.data.message);
        } catch (error) {
            console.error("Error sending request:", error);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Enter Your Name</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                />
                <button type="submit">Submit</button>
            </form>
            {message && <h2>{message}</h2>}
        </div>
    );
}

export default App;
