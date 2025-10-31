import React from "react";
import {
  Home,
  Settings,
  Bell,
  FileText,
  User,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-20 border-r bg-white min-h-[calc(100vh-64px)] hidden md:flex flex-col items-center justify-between py-6">
      <div className="space-y-6">
        <Home className="text-gray-500 hover:text-[#0f172a] cursor-pointer" size={26} />
        <Settings className="text-gray-500 hover:text-[#0f172a] cursor-pointer" size={26} />
        <Bell className="text-gray-500 hover:text-[#0f172a] cursor-pointer" size={26} />
        <FileText className="text-gray-500 hover:text-[#0f172a] cursor-pointer" size={26} />
      </div>
      <div
        className="mt-auto"
        onClick={() => (window.location.href = "/")}
        title="Users"
      >
        <User
          className="text-gray-700 hover:text-[#0f172a] cursor-pointer transition"
          size={28}
        />
      </div>
    </aside>
  );
}

