import React from 'react';

export default function Tag({ text }: { text: string }) {
  return <div className="px-2 py-1 border rounded text-sm bg-gray-50 text-gray-700">{text}</div>;
}
