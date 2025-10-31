import React from 'react';

export default function Toast({ type, text }: { type: 'success'|'error'; text:string }) {
  return (
    <div className={`fixed right-6 bottom-6 p-3 rounded shadow-lg ${type==='success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
      {text}
    </div>
  );
}
