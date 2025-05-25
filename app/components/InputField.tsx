import React from 'react'

type InputFieldProps = {
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'date' | 'checkbox';
  value?: string;
  checked?: boolean;
  placeholder?: string;
  error?: string;
  minDate?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ label, type, value, placeholder, error, minDate, onChange }: InputFieldProps) => {
  const refId = `input-${label.toLowerCase()}`;

  return (
    <div className={`flex gap-2 ${type === 'checkbox' ? 'flex-row-reverse justify-end' : 'flex-col'}`}>
      <label htmlFor={refId} className={`font-bold text-sm ${error ? 'text-red-500' : ''}`}>{label}</label>
      <input
        id={refId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={type === 'date' ? minDate : undefined}
        className={`focus:border-gray-500 outline-none border rounded-lg p-2 ${type === 'checkbox' ? 'w-4 h-4 accent-green-700' : 'w-full'} ${error ? 'border-red-500' : 'border-gray-300'}`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}

    </div>
  )
}

export default InputField