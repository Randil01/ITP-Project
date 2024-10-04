import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './login-all.css';

function Login() {
    const [empEmail, setEmpEmail] = useState('');
    const [empName, setEmpName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/employee/login', {
                empEmail,
                empName
            });

            if (response.status === 200) {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('employeeId', response.data.employee._id);

                // Change path according to employee name
                let redirectPath = '/';
                switch (empName) {
                    case 'thenula':
                    case 'Thenula':
                        redirectPath = '/assetsHome';
                        break;
                    case 'Duvini':
                    case 'duvini':
                        redirectPath = '/employee';
                        break;
                    case 'Vishwa':
                    case 'vishwa':
                        redirectPath = '/street';
                        break;
                    case 'Vanuja':
                    case 'vanuja':
                        redirectPath = '/itemdetails';
                        break;
                    default:
                        redirectPath = '/assetsHome'; // Default path
                        break;
                }

                navigate(redirectPath);
            }
        } catch (error) {
            setError('Invalid login credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-forall">
            <h2>Login to the system to continue</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={empEmail} 
                        onChange={(e) => setEmpEmail(e.target.value)} 
                        required 
                        disabled={loading}
                    />
                </div>
                <div>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        value={empName} 
                        onChange={(e) => setEmpName(e.target.value)} 
                        required 
                        disabled={loading}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <Link to="/" className="close-button">
                    Close
                </Link>
            </form>
        </div>
    );
}

export default Login;
