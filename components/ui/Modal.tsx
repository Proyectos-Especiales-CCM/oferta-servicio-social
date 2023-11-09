import React from 'react';

interface ModalProps {
  className?: string;
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ className, children, open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-4/5 max-h-full overflow-auto">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 px-2 rounded-full hover:bg-gray-300"
          onClick={onClose}
        >
          X
        </button>
        <div className={className}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
