import React from 'react';

export default function InputField({ label, value, onChange, error, required=false, placeholder, }: {
  label: string; value: string; onChange: (v:string)=>void; error?:string; required?:boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}{required && <span className="text-red-500"> *</span>}</label>
      <input
        className="block w-full mt-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#0f172a]"
        value={value}
        onChange={(e) => onChange(e.target.value)} 
        placeholder={placeholder}
      />
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}
