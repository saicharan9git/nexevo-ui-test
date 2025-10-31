import React from "react";

export default function TopBar({ onAdd }: { onAdd: () => void }) {
  const userInitial = "S";

  return (
    <div className="w-full bg-white border-b shadow-sm flex justify-between items-center px-6 py-4">
      <div className="flex items-center gap-3 text-lg font-semibold text-gray-800">
        <div className="h-9 w-9 flex items-center justify-center rounded-full bg-[#0f172a] text-white text-base font-bold">
          {userInitial}
        </div>

        <span>
          Users & Partners <span className="text-gray-500">{"> Users"}</span>
        </span>
      </div>

      <button
        onClick={onAdd}
        className="px-4 py-2 rounded bg-[#0f172a] text-white hover:opacity-90 transition"
      >
        + New
      </button>
    </div>
  );
}
