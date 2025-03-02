import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ChallengeFriend from "./ChallengeFriend";

const Home = () => {
    const [username, setUsername] = useState("");
    const [finalScore, setFinalScore] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            fetchUserScore(storedUsername);
        }
    }, []);

    const fetchUserScore = async (storedUsername) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/${storedUsername}/score`);
            setFinalScore(response.data.score);
        } catch {
            setFinalScore(null);
        }
    };

    const handleStartGame = async () => {
        if (!username.trim()) return toast.error("Please enter a username");
        
        try {
            console.log(`${process.env.REACT_APP_BACKEND_URL}/api/user/register`);
            console.log("Username registered successfully");
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/register`, { username });

            localStorage.setItem("username", username);
            navigate("/game");
        } catch {
            toast.error("Username already exists");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("username");
        setFinalScore(null);
        setUsername("");
        navigate("/");
    };

    return (
        <div className="app-container">
            <div className="content-container">
                <h1 className="game-title">Globetrotter Trivia</h1>
                {finalScore !== null ? (
                    <ScoreCard finalScore={finalScore} onLogout={handleLogout} />
                ) : (
                    <UsernameInput 
                        username={username} 
                        setUsername={setUsername} 
                        handleStartGame={handleStartGame} 
                    />
                )}
            </div>
        </div>
    );
};

const ScoreCard = ({ finalScore, onLogout }) => {
    const navigate = useNavigate();
    return (
        <div className="card">
            <div className="score-display">
                Final Score: <span className="score-value">{finalScore}</span>
            </div>
            <div className="button-container">
                <button className="btn btn-primary" onClick={() => navigate("/game")}>
                    Play Again
                </button>
                <button className="btn btn-danger" onClick={onLogout}>
                    Logout & Reset
                </button>
                <div className="challenge-container">
                    <ChallengeFriend username={localStorage.getItem("username")} />
                </div>
            </div>
        </div>
    );
};

const UsernameInput = ({ username, setUsername, handleStartGame }) => {
    return (
        <div className="card">
            <input
                className="username-input"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleStartGame()}
            />
            <button className="btn btn-primary" onClick={handleStartGame}>
                Start Game
            </button>
        </div>
    );
};

export default Home;
