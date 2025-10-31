import React from 'react';

export default function EmptyState({ onNew }: { onNew: ()=>void }) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
      <div className="w-40 h-40 rounded-full bg-gradient-to-b from-gray-100 to-white mb-6 flex items-center justify-center shadow-inner">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" className="opacity-50">
          <path d="M12 2v20" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M2 12h20" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-900">Create a new user</h2>
      <p className="text-sm text-gray-500 mt-2">Add users and assign countries to get started.</p>
      <button onClick={onNew} className="mt-6 px-4 py-2 rounded bg-[#0f172a] text-white">+ New User</button>
    </div>
  );
}
