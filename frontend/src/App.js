import {React, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Screen/Home';
import Login from './Screen/Login';
import Dashboard from './Screen/Dashboard';
import Register from './Screen/Register';
const App = () => {
  const NotFound = () => (
    <div>
      <h2>Page Not Found</h2>
      <Link to="/">Return to Home</Link>
    </div>
  );
    return (
        <Router>
            <div>
                <Routes>
                    {/* Route for Home component */}
                    <Route path="/" element={<Home />} />

                    {/* Route for Login component */}
                    <Route path="/login" element={<Login />} />

                    <Route path="/dashboard" element={<Dashboard/>} />

                    <Route path="/register" element={<Register/>} />


                    <Route path="*" element={<NotFound></NotFound>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
