import React, { useState, useCallback } from 'react';
import './Login.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [responseMessage, setResponseMessage] = useState(null);

    const verifyUserEndPoint = "http://localhost:8000/verify-user";

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Email:', email);
        console.log('Password:', password);

        const formData = new FormData();
      formData.append('userName', email);
      formData.append('password', password);
      try {
  
        const response = await fetch(verifyUserEndPoint, {
          method: "POST",
          body: formData
        });
        const data = await response.json();

        // Check if the response status is OK (200)
        if (response.ok) {
            // Handle success response
            setResponseMessage(`Welcome ${data.firstName} ${data.lastName}`);
            navigate('/dashboard');
          } else {
            // Handle error response
            setResponseMessage(data.message);
          }
        } catch (error) {
          console.error('Error during API call:', error);
          setResponseMessage('Error occurred while verifying user');
        }
    

        

    };

    return (
        <div className="register-container">
            <p className='header' >EcoCoin</p>
            <div className="register-content">
                <h1>Login</h1>
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-group">
                        <input
                            type="email"
                            value={email}
                            placeholder='Enter your email'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="register-input"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="register-input"
                        />
                    </div>
                    <button className="register-button" type="submit">Login</button>
                    <a href="/register">Don't have an account? Register here</a>
                </form>
            </div>
        </div>
    );
};

export default Login;
