import { React, useEffect } from 'react';
import './Home.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import SplitTextJS from 'split-text-js';
import coolBackground from './cool-background.png';

const Home = () => {
    useEffect(() => {
        // Select all the word elements
        const words = gsap.utils.toArray(".word");
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

        words.forEach(word => {
            // Split the word into individual characters using SplitTextJS
            const splitWord = new SplitTextJS(word);

            // Animate the characters with a pause for each word
            tl.from(splitWord.chars, {
                opacity: 0,
                y: 80,
                rotateX: 90,
                duration: 1, // Keep the speed consistent
                stagger: 0.02
            }, "<")
            .to(splitWord.chars, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.5, // Pause for 0.5 seconds
                stagger: 0
            }, "+=0.5") // Stay on screen for an additional 0.5 seconds
            .to(splitWord.chars, {
                opacity: 0,
                y: -80,
                rotateX: 90,
                duration: 1, // Keep the speed consistent when moving out
                stagger: 0.02
            }, "+=1");
        });
    }, []);

    const navigate = useNavigate();

    const handleStartTrading = () => {
        navigate('/login'); // Navigates to the login page, you can change the path if needed
    };

    return (
        <div className="home-container" style={{ backgroundImage: `url(${coolBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="header">
                <p>EcoCoin</p>
            </div>
            <div className="content">
                <div className="rotating-text">
                    <p className='word one'>Carbon.</p>
                    <p className='word two'>Nitrous Oxide.</p>
                    <p className='word three'>Methane.</p>
                </div>
                <button className="start-trading-button" onClick={handleStartTrading}>
                    Start Trading
                </button>
            </div>
        </div>
    );
};

export default Home;
