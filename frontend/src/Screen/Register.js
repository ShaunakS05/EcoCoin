import React, { useState } from 'react';
import './Login.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFName] = useState('');
    const [lastName, setLName] = useState('');
    const [age, setAge] = useState('');
    const navigate = useNavigate();
    const createUserEndPoint = "http://localhost:8000/create-new-user";


    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('userName', email);
        formData.append('password', password);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        try {
            const response = await fetch(createUserEndPoint, {
                method: "POST",
                body: formData
            });
            if(response.ok) {
                console.log('User created successfully');
                navigate('/dashboard');
        
        }
        navigate('/dashboard'); // Navigate to the dashboard

    }
    catch(error)
    {
      console.error(error);
    }
    
    }

    return (
        <div className="register-container">
            <p className="header">EcoCoin</p>
            <div className="register-content">
                <h1>Create Account</h1>
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-group">
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFName(e.target.value)}
                            required
                            className="register-input"
                            placeholder="Enter your first name"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLName(e.target.value)}
                            required
                            className="register-input"
                            placeholder="Enter your last name"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                            className="register-input"
                            placeholder="Enter your age"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="register-input"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="register-input"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button className="register-button" type="submit">
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
