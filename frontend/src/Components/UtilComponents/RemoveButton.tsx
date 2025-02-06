interface RemoveButtonProps {
  onClick: () => void;
}

const RemoveButton = ({ onClick }: RemoveButtonProps) => {
  return (
    <button
      className="text-red-500 bg-transparent hover:bg-red-500 hover:text-white py-1 px-3 rounded-lg transition-colors duration-300 focus:outline-none"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 inline-block mr-1"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M6 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm3 12a1 1 0 100-2 1 1 0 000 2zM8 9a1 1 0 00-1 1v5a1 1 0 002 0V10a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v5a1 1 0 102 0V10a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      Remove
    </button>
  );
};

export default RemoveButton;
