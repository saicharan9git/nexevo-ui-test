import React from 'react';

export default function Modal({ open, onClose, title, children }: {
  open: boolean;
  onClose: ()=>void;
  title?: string;
  children?: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex">
      <div className="absolute inset-0 bg-black/30" onClick={onClose}></div>

      <div className="ml-auto relative bg-white h-full drawer shadow-lg p-6 overflow-auto">
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <div>
            <div className="text-lg font-semibold">Add User</div>
          </div>
          <button onClick={onClose} aria-label="close" className="text-2xl text-gray-400">×</button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}
