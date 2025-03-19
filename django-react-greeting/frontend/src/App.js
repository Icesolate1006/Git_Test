import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/greet/', { name });
            setMessage(response.data.message);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setUploadMessage(response.data.message);
        } catch (error) {
            console.error("Error uploading file:", error);
            setUploadMessage("Error uploading file.");
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

            <h1>Upload a File</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload</button>
            {uploadMessage && <h2>{uploadMessage}</h2>}
        </div>
    );
}

export default App;
