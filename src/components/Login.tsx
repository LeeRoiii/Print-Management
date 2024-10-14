import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';

interface LoginProps {
    onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('isLoggedIn');
        if (loggedInUser) {
            navigate('/OrderDashboard');
        }
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true); // Set loading to true when starting the submit

        // Simulate a login process
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (username === 'Admin' && password === 'Admin') {
            onLogin(username);
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/OrderDashboard');
        } else {
            setError('Invalid credentials. Please try again.');
        }

        setLoading(false); // Reset loading state after the process
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-full max-w-md">
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Admin Panel</h3>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input 
                            type="text" 
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter Admin"
                            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Password"
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
                                required
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-baseline justify-between mt-6">
                        <button 
                            type="submit" 
                            className={`px-6 py-2 w-full ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline transition duration-200 flex items-center justify-center`}
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? (
                                <span>Loading...</span>
                            ) : (
                                <>
                                    <LogIn className="mr-2 h-5 w-5" />
                                    Login
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
