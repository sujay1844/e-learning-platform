import { useState } from "react";

export default function ChatBot() {
    const [response, setResponse] = useState([]);


    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const message = formData.get('message');
        fetch(`http://${import.meta.env.BACKEND_URL || 'localhost:5000'}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        })
            .then(async (response) => {
                // Check if the response is 404 (not found)
                const data = await response.json();

                if (response.ok) {
                    setResponse(data.response);
                } else {
                    alert(data.error);
                }
            })
            .catch(() => {
                alert('Error. Chatbot is not available. Please try again later.');
            });
        setResponse(response);
    }
    return (
        <div>
            <h1>ChatBot</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="message" />
                <button type="submit">Send</button>
            </form>
            <p>{response}</p>
        </div>
    )
}