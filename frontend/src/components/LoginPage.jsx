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

            if(response.ok) {
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
    <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
);
};

export default LoginPage;