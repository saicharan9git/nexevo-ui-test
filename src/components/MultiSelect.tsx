import React, { useState, useRef, useEffect } from 'react';

export default function MultiSelect({ options, value, onChange, label, error, }: {
  options: string[]; value: string[]; onChange: (v:string[])=>void; label?: string; error?: string; 
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement|null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const toggle = (opt: string) => {
    if (value.includes(opt)) onChange(value.filter(v => v !== opt));
    else onChange([...value, opt]);
  };

  return (
    <div ref={ref}>
      {label && <div className="text-sm text-gray-600 mb-1">{label}</div>}
      <div className="border rounded p-2" onClick={() => setOpen(!open)}>
        <div className="min-h-[44px] flex items-center gap-2 flex-wrap">
          {value.length === 0 && <div className="text-sm text-gray-400">Assign one or more countries to include in this user.</div>}
          {value.map(v => <span key={v} className="px-2 py-1 border rounded text-sm">{v}</span>)}
        </div>
      </div>
      {open && (
        <div className="mt-2 border rounded bg-white max-h-56 overflow-auto z-50 shadow-lg p-2">
          {options.map(opt => (
            <label key={opt} className="flex items-center gap-2 p-1 cursor-pointer hover:bg-gray-50 rounded">
              <input type="checkbox" checked={value.includes(opt)} onChange={() => toggle(opt)}/>
              <span className="ml-1">{opt}</span>
            </label>
          ))}
        </div>
      )}
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}
