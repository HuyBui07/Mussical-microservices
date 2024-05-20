const FormField = ({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        disabled={disabled ? true : false}
        className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm text-black border-2 bg-white rounded-md"
        style={disabled ? { backgroundColor: "#f3f4f6" } : {}}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormField;
