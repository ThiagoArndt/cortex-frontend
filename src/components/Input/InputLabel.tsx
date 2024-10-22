interface InputLabelProps {
  label: string;
  htmlFor: string | undefined;
}

function InputLabel({ label, htmlFor }: Readonly<InputLabelProps>) {
  return (
    <label className="relative block text-sm text-dark-grey mb-2" htmlFor={htmlFor}>
      {label}
    </label>
  );
}

export default InputLabel;
