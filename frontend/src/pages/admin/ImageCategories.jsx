import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit, Loader2, X } from 'lucide-react';
import { apiRequest } from '../../api';
import toast, { Toaster } from 'react-hot-toast';

export default function ImageCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [adding, setAdding] = useState(false);

  const fetchCategories = () => {
    apiRequest('/img-categories')
      .then((res) => setCategories(Array.isArray(res) ? res : []))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setAdding(true);
    try {
      await apiRequest('/img-categories', 'POST', { name });
      toast.success('Qo\'shildi!');
      setName('');
      fetchCategories();
    } catch (err) {
      toast.error(err.message || 'Xatolik');
    } finally {
      setAdding(false);
    }
  };

  const handleUpdate = async (id) => {
    if (!editName.trim()) return;
    try {
      await apiRequest(`/img-categories/${id}`, 'PATCH', { name: editName });
      toast.success('Yangilandi!');
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      toast.error(err.message || 'Xatolik');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('O\'chirilsinmi?')) return;
    try {
      await apiRequest(`/img-categories/${id}`, 'DELETE');
      toast.success('O\'chirildi');
      fetchCategories();
    } catch (err) {
      toast.error(err.message || 'Xatolik');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  return (
    <div>
      <Toaster position="top-right" />
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-8"
      >
        Rasm kategoriyalar
      </motion.h1>

      <form onSubmit={handleAdd} className="flex gap-3 mb-8 max-w-lg">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Kategoriya nomi..."
          required
          className="flex-1 px-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl text-white text-sm focus:border-white/30 focus:outline-none"
        />
        <button
          type="submit"
          disabled={adding}
          className="flex items-center gap-2 px-5 py-2.5 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-all text-sm disabled:opacity-50"
        >
          {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Qo'shish
        </button>
      </form>

      <div className="space-y-3 max-w-lg">
        {categories.length === 0 && (
          <p className="text-[var(--text-secondary)] text-sm">Kategoriya topilmadi</p>
        )}
        {categories.map((cat) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between gap-3 p-4 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl"
          >
            {editingId === cat.id ? (
              <div className="flex items-center gap-2 flex-1">
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-white text-sm focus:outline-none"
                  autoFocus
                />
                <button onClick={() => handleUpdate(cat.id)} className="text-green-400 hover:text-green-300 p-1">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => setEditingId(null)} className="text-[var(--text-secondary)] hover:text-white p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <span className="text-sm font-medium">{cat.name}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => { setEditingId(cat.id); setEditName(cat.name); }}
                    className="p-2 text-[var(--text-secondary)] hover:text-white hover:bg-white/5 rounded-lg transition-all"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
