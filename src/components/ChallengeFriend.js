import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { FaWhatsapp, FaTimes } from "react-icons/fa";

if (typeof window !== "undefined") {
  Modal.setAppElement("#root");
}

const ChallengeFriend = () => {
  const [username, setUsername] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const inviteLink = `${process.env.REACT_APP_BACKEND_URL}/challenge/${username}`;

  const handleShareWhatsApp = () => {
    const whatsappMessage = `Hey! Join me in playing Globetrotter Trivia. Click here to accept the challenge: ${inviteLink}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <button
        className="btn btn-secondary"
        onClick={() => setIsModalOpen(true)}
      >
        Share Challenge
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg mx-auto text-center relative border border-gray-300"
        overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Invite Your Friend 🎉</h2>
        <p className="text-gray-600 mb-6">Scan the QR code or share the link:</p>
        <div className="flex justify-center mb-6">
          <QRCodeSVG value={inviteLink} size={180} className="border-2 border-gray-300 p-2 rounded-md" />
        </div>
        <p className="text-blue-500 font-semibold break-words mb-6 bg-gray-100 p-2 rounded-lg">{inviteLink}</p>

        <motion.button
          className="flex items-center justify-center bg-green-500 text-white px-6 py-3 rounded-lg shadow-md w-full font-semibold hover:bg-green-600 transition-all duration-300"
          onClick={handleShareWhatsApp}
          whileHover={{ scale: 1.05 }}
        >
          <FaWhatsapp className="mr-2" size={20} /> Share via WhatsApp
        </motion.button>

        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-all duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          <FaTimes size={24} />
        </button>
      </Modal>
    </div>
  );
};

export default ChallengeFriend;
