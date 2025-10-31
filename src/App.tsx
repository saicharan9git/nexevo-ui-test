import React, { useEffect, useState } from 'react';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import EmptyState from './components/EmptyState';
import UsersTable from './components/UsersTable';
import Modal from './components/Modal';
import InputField from './components/InputField';
import MultiSelect from './components/MultiSelect';
import Tag from './components/Tag';
import Toast from './components/Toast';
import { fetchUsers, createUser, updateUser, deleteUser } from './api';
import { User } from './types';

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [toast, setToast] = useState<{type:'success'|'error'; text:string} | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data);
      } catch {
        showToast('error','Failed to load users');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const showToast = (type:'success'|'error', text:string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreate = async (payload: User) => {
    try {
      const saved = await createUser(payload);
      setUsers(prev => [...prev, saved]);
      setShowAdd(false);
      showToast('success','User created');
    } catch {
      showToast('error','Failed to create user');
    }
  };

  const handleUpdate = async (id:number, payload: User) => {
    try {
      const updated = await updateUser(id, payload);
      setUsers(prev => prev.map(u => (u.id === id ? updated : u)));
      setShowView(false);
      setEditingUser(null);
      showToast('success','User updated');
    } catch {
      showToast('error','Update failed');
    }
  };

  const handleDelete = async (id:number) => {
    try {
      await deleteUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
      showToast('success','User deleted');
    } catch {
      showToast('error','Delete failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <TopBar onAdd={() => setShowAdd(true)} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Users & Partners</h1>
            <p className="text-sm text-gray-500 mt-1">Manage access and assign countries to each user.</p>
          </div>

          {!loading && users.length === 0 && (
            <EmptyState onNew={() => setShowAdd(true)} />
          )}

          {!loading && users.length > 0 && (
            <div className="bg-white border rounded-lg shadow-sm p-6">
              <UsersTable
                users={users}
                onView={(u) => { setEditingUser(u); setShowView(true); }}
                onEdit={(u) => { setEditingUser(u); setShowView(true); }}
                onDelete={(u) => {
                  const ok = confirm(`Delete user "${u.name}"? This cannot be undone.`);
                  if (ok && u.id) handleDelete(u.id);
                }}
              />
            </div>
          )}
        </main>
      </div>

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="New User">
        <AddEditForm
          onCancel={() => setShowAdd(false)}
          onSave={(payload) => handleCreate(payload)}
        />
      </Modal>

      <Modal open={showView} onClose={() => { setShowView(false); setEditingUser(null); }} title="View Details">
        {editingUser && (
          <ViewEditForm
            user={editingUser}
            onCancel={() => { setShowView(false); setEditingUser(null); }}
            onSave={(payload) => handleUpdate(editingUser.id!, payload)}
          />
        )}
      </Modal>

      {toast && <Toast type={toast.type} text={toast.text} />}
    </div>
  );
}

function AddEditForm({ onCancel, onSave, initial }: { onCancel: ()=>void; onSave: (u:User)=>void; initial?: User }) {
  const [name, setName] = useState(initial?.name ?? '');
  const [code, setCode] = useState(initial?.code ?? '');
  const [countries, setCountries] = useState<string[]>(initial?.countries ?? []);
  const [errors, setErrors] = useState<{name?:string; countries?:string}>({});

  const countryOptions = ['India','Korea','Argentina','Belgium','Denmark','Egypt','Finland','Germany','Japan','Iceland','Norway','Sweden'];

  const validate = () => {
    const err: typeof errors = {};
    if (!name.trim()) err.name = 'User name required';
    if (countries.length === 0) err.countries = 'Select at least one country';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    onSave({ name: name.trim(), code: code.trim() || undefined, countries });
  };

  return (
    <div className="space-y-4">
      <InputField label="User Name" value={name} onChange={setName} error={errors.name} required placeholder='Enter a User Name'/>
      <InputField label="User Code (Optional)" value={code} onChange={setCode} placeholder='Short code for reference (e.g., NA, EU)'/>
      <MultiSelect options={countryOptions} value={countries} onChange={setCountries} label="Select Countries" error={errors.countries}/>
      <div className="flex justify-end gap-3 pt-4">
        <button className="px-4 py-2 rounded bg-white border text-gray-700" onClick={onCancel}>Cancel</button>
        <button className="px-4 py-2 rounded bg-brand text-white" style={{background:'#0f172a'}} onClick={submit}>Save</button>
      </div>
    </div>
  );
}

function ViewEditForm({ user, onCancel, onSave }: { user: User; onCancel: ()=>void; onSave: (u:User)=>void }) {
  const [editing, setEditing] = useState(false);
  return (
    <div>
      {!editing ? (
        <>
          <div className="mb-4">
            <div className="text-sm text-gray-500">User Name</div>
            <div className="font-medium text-lg">{user.name}</div>

            <div className="text-sm text-gray-500 mt-3">User Code</div>
            <div className="font-medium">{user.code ?? '-'}</div>

            <div className="text-sm text-gray-500 mt-3">Countries</div>
            <div className="flex flex-wrap gap-2 mt-2">
              {user.countries.map(c => <Tag key={c} text={c} />)}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button className="px-4 py-2 bg-white border rounded" onClick={onCancel}>Close</button>
            <button className="px-4 py-2 bg-brand text-white rounded" style={{background:'#0f172a'}} onClick={() => setEditing(true)}>Edit</button>
          </div>
        </>
      ) : (
        <AddEditForm
          initial={user}
          onCancel={() => setEditing(false)}
          onSave={(payload) => onSave(payload)}
        />
      )}
    </div>
  );
}

