import React, { useState } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

Modal.setAppElement("#root");

const FeedbackMessage = ({ isCorrect, feedback, funFact }) => (
  <>
    {isCorrect && <Confetti />}
    <motion.h2
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`text-4xl font-bold flex items-center justify-center gap-2 ${
        isCorrect ? "text-green-300" : "text-red-400"
      }`}
    >
      {isCorrect ? <FaCheckCircle /> : <FaTimesCircle />}
      {feedback}
    </motion.h2>
    <p className="mt-4 text-lg font-medium">{funFact}</p>
  </>
);

const ScoreModal = ({ isOpen, onClose, score, onNext, onFinish }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    className="bg-white p-8 rounded-3xl shadow-xl max-w-lg mx-auto mt-20 text-center"
    overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-3xl font-bold text-red-600">Oops! Wrong Answer 😢</h2>
      <p className="mt-4 text-xl text-gray-700 font-medium">
        Your Current Score: {score}
      </p>
      <div className="mt-6 flex justify-center gap-5">
        <button className="btn btn-primary" onClick={onNext}>
          Continue Game
        </button>
        <button className="btn btn-danger" onClick={onFinish}>
          Finish Game
        </button>
      </div>
    </motion.div>
  </Modal>
);

const ActionButton = ({ text, color, onClick }) => (
  <motion.button
    className={`mt-6 bg-${color}-500 hover:bg-${color}-700 text-white px-6 py-3 rounded-full transition-all shadow-lg text-lg font-semibold`}
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
  >
    {text}
  </motion.button>
);

const Feedback = ({ feedback, onNext, score }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.div
      className="text-center p-10 bg-gradient-to-r from-green-400 to-blue-600 text-white rounded-lg shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <FeedbackMessage
        isCorrect={feedback.isCorrect}
        feedback={feedback.feedback}
        funFact={feedback.funFact}
      />

      {!feedback.isCorrect && (
        <button
          className="btn btn-dark"
          onClick={() => setIsModalOpen(true)}
        >
          Show Score
        </button>
      )}
      <button className="btn btn-primary" onClick={onNext}>Next Question</button>
      <button className="btn btn-danger" onClick={() => navigate("/")}>Go to Menu</button>
      <ScoreModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        score={score}
        onNext={() => {
          setIsModalOpen(false);
          onNext();
        }}
        onFinish={() => navigate("/")}
      />
    </motion.div>
  );
};

export default Feedback;
