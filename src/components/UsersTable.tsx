import React, { useState } from "react";
import { User } from "../types";
import Tag from "./Tag";

export default function UsersTable({
  users,
  onView,
  onEdit,
  onDelete,
}: {
  users: User[];
  onView: (u: User) => void;
  onEdit: (u: User) => void;
  onDelete: (u: User) => void;
}) {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-semibold">Users</div>

        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-1.5 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#0f172a]"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-t">
          <thead className="text-sm text-gray-500 border-b bg-gray-50">
            <tr>
              <th className="p-3">User Name</th>
              <th className="p-3">User Code</th>
              <th className="p-3">Countries</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id} className="odd:bg-white even:bg-gray-50">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.code ?? "-"}</td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-2">
                    {u.countries.slice(0, 5).map((c) => (
                      <Tag key={c} text={c} />
                    ))}
                    {u.countries.length > 5 && (
                      <div className="text-xs text-gray-500 px-2 py-1 border rounded">
                        +{u.countries.length - 5} more
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 text-sm border rounded text-gray-700"
                      onClick={() => onView(u)}
                    >
                      View
                    </button>
                    <button
                      className="px-3 py-1 text-sm bg-[#0f172a] text-white rounded"
                      onClick={() => onEdit(u)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 text-sm border rounded text-red-600"
                      onClick={() => onDelete(u)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-gray-500 py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
