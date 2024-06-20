'use client';

import React from 'react';

interface ModalProps {
  onClose: () => void; // Function to call when closing the modal
  children: React.ReactNode; // The content to display inside the modal
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  // Close the modal when the overlay or the close button is clicked
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-lg p-8 relative md:w-96">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-800 focus:outline-none border-none"
          onClick={onClose}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
