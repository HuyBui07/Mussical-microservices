import React from "react";

interface ConfirmPopupProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmPopup: React.FC<ConfirmPopupProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-white p-4 rounded-lg z-50">
        <p className="text-center text-black">{message}</p>
        <div className="flex justify-center mt-4">
          <button
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={(e) => {
              onCancel();
              e.stopPropagation();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
