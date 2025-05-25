import React from 'react'

type TextFieldProps = {
  label: string;
  value?: string;
  placeholder?: string;
  rows?: number;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextField = ({ label, value, placeholder, rows, error, onChange }: TextFieldProps) => {
  const refId = `input-${label.toLowerCase()}`;

  return (
    <div className='flex gap-2 flex-col'>
      <label htmlFor={refId} className={`font-bold text-sm ${error ? 'text-red-500' : ''}`}>{label}</label>
      <textarea
        id={refId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`focus:border-gray-500 outline-none min-h-40 max-h-40 resize-none border rounded-lg p-2 ${error ? 'border-red-500' : 'border-gray-300'}`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}

    </div>
  )
}

export default TextField