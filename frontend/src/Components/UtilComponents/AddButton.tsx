interface AddButtonProps {
  onClick: () => void;
}

const AddButton = ({ onClick }: AddButtonProps) => {
  return (
    <button
      className="text-white bg-red-500 hover:bg-red-600 py-1 px-3 rounded-lg transition-colors duration-300 focus:outline-none flex items-center space-x-2"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" />
      </svg>
    </button>
  );
};

export default AddButton;
