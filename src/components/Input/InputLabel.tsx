interface InputLabelProps {
  label: string;
}

function InputLabel({ label }: Readonly<InputLabelProps>) {
  return (
    <label className="relative block text-sm text-dark-grey mb-2" htmlFor="username">
      {label}
    </label>
  );
}

export default InputLabel;
