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
    <div className="max-w-lg mx-auto my-10 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">ChatBot</h1>
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                type="text"
                name="message"
                className="flex-1 p-2 border-2 border-gray-200 rounded"
            />
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Send
            </button>
        </form>
        <p className="text-gray-600 mt-3">{response}</p>
    </div>
)
}