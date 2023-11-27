import { useState } from 'react';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        // Make a request to the backend to authenticate the user
        fetch(`http://${import.meta.env.BACKEND_URL || 'localhost:5000'}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
            .then(async (response) => {
                // Check if the response is 404 (not found)
                const data = await response.json();

                if (response.ok) {
                    window.location.href = '/topics';
                } else {
                    alert(data.message);
                }
            })
            .catch(() => {
                alert('Error logging in. Please try again later.');
            });
    };
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-8 bg-white rounded shadow-lg w-full max-w-sm">
            <img src="/logo.png" alt="Logo" className="mb-8 mx-auto w-full"/>
                <h1 className="text-xl font-semibold text-center mb-4">Login</h1>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="text-gray-700" htmlFor="username">Username:</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div>
                        <label className="text-gray-700" htmlFor="password">Password:</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;