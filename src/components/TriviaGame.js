import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Feedback from './Feedback';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const TriviaGame = () => {
    const [trivia, setTrivia] = useState(null);
    const [selected, setSelected] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [score, setScore] = useState(0);
    const navigate = useNavigate();
    const username = localStorage.getItem("username");

    useEffect(() => {
        if (!username) {
            navigate("/");
            return;
        }
        
        // Only fetch score once on component mount
        fetchScore();
        
        // Fetch trivia once on component mount
        fetchTrivia();
    }, [username, navigate]); // Add dependencies

    const fetchScore = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/${username}/score`);
            setScore(data.score);
        } catch (error) {
            console.error("Error fetching score:", error);
        }
    };

    const fetchTrivia = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/trivia/random`);
            setTrivia(data);
            setSelected(null);
            setFeedback(null);
        } catch (error) {
            console.error("Error fetching trivia:", error);
        }
    };

    const handleAnswer = async (option) => {
        setSelected(option);
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/trivia/answer`, {
                username,
                selectedAnswer: option.city,
                correctAnswer: trivia.correctAnswer,
            });
            setFeedback(response.data);
            if (response.data.isCorrect) {
                setScore((prevScore) => prevScore + 10);
            }
            // Remove fetchScore() here since we're already updating score locally
        } catch (error) {
            console.error("Error submitting answer:", error);
        }
    };

    return (
        <div className="app-container">
            <div className="content-container">
                <h1 className="game-title">🧠 Trivia Challenge</h1>
                {trivia && !feedback ? (
                    <div className="card">
                        <h2 className="question">{trivia.clues[0]}</h2>
                        <div style={{ marginBottom: "20px" }}></div>
                        <div className="options-container">
                            {trivia.options.map((opt) => (
                                <motion.button
                                    key={opt.city}
                                    className={`btn ${selected === opt ? "selected" : ""}`}
                                    onClick={() => handleAnswer(opt)}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    {opt.city}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                ) : (
                    feedback && <Feedback feedback={feedback} onNext={fetchTrivia} score={score} />
                )}
            </div>
        </div>
    );
};

export default TriviaGame;