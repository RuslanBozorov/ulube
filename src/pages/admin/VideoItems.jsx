import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit, Loader2, X } from 'lucide-react';
import { apiRequest } from '../../api';
import toast, { Toaster } from 'react-hot-toast';

export default function VideoItems() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [form, setForm] = useState({ title: '', url: '', categoryId: '' });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    apiRequest('/video-categories')
      .then((res) => {
        const cats = Array.isArray(res) ? res : [];
        setCategories(cats);
        if (cats.length > 0) {
          setSelectedCategory(cats[0].id);
          setForm((prev) => ({ ...prev, categoryId: cats[0].id }));
        }
      })
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;
    setLoading(true);
    apiRequest(`/video-items?categoryId=${selectedCategory}`)
      .then((res) => setItems(Array.isArray(res) ? res : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.url.trim()) return;
    setAdding(true);
    try {
      await apiRequest('/video-items', 'POST', { ...form, categoryId: selectedCategory });
      toast.success('Qo\'shildi!');
      setForm({ title: '', url: '', categoryId: selectedCategory });
      // Refetch
      const res = await apiRequest(`/video-items?categoryId=${selectedCategory}`);
      setItems(Array.isArray(res) ? res : []);
    } catch (err) {
      toast.error(err.message || 'Xatolik');
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('O\'chirilsinmi?')) return;
    try {
      await apiRequest(`/video-items/${id}`, 'DELETE');
      toast.success('O\'chirildi');
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      toast.error(err.message || 'Xatolik');
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-8"
      >
        Video itemlar
      </motion.h1>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 ${
              selectedCategory === cat.id
                ? 'bg-white text-black border-white'
                : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:text-white hover:border-white/30'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Add form */}
      <form onSubmit={handleAdd} className="flex flex-wrap gap-3 mb-8 max-w-2xl">
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Video nomi..."
          required
          className="flex-1 min-w-[150px] px-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl text-white text-sm focus:border-white/30 focus:outline-none"
        />
        <input
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
          placeholder="YouTube URL..."
          required
          className="flex-1 min-w-[200px] px-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl text-white text-sm focus:border-white/30 focus:outline-none"
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

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <Loader2 className="w-6 h-6 animate-spin text-[var(--text-secondary)]" />
        </div>
      ) : (
        <div className="space-y-3 max-w-2xl">
          {items.length === 0 && (
            <p className="text-[var(--text-secondary)] text-sm">Video topilmadi</p>
          )}
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between gap-4 p-4 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white truncate">{item.title}</p>
                <p className="text-xs text-[var(--text-secondary)] truncate">{item.url || item.videoUrl || item.link}</p>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="flex-shrink-0 p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
