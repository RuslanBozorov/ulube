import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import { apiRequest, uploadImage } from '../../api';
import toast, { Toaster } from 'react-hot-toast';

export default function ImageItems() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [form, setForm] = useState({ title: '', imageUrl: '' });
  const [adding, setAdding] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    apiRequest('/img-categories')
      .then((res) => {
        const cats = Array.isArray(res) ? res : [];
        setCategories(cats);
        if (cats.length > 0) setSelectedCategory(cats[0].id);
      })
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;
    setLoading(true);
    apiRequest(`/img-items?categoryId=${selectedCategory}`)
      .then((res) => setItems(Array.isArray(res) ? res : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const data = await uploadImage(file);
      const url = data?.url || data?.imageUrl || data;
      setForm((prev) => ({ ...prev, imageUrl: url }));
      toast.success('Rasm yuklandi');
    } catch (err) {
      toast.error('Rasm yuklashda xatolik');
    } finally {
      setUploading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.imageUrl) {
      toast.error('Rasmni yuklang');
      return;
    }
    setAdding(true);
    try {
      await apiRequest('/img-items', 'POST', {
        title: form.title,
        imageUrl: form.imageUrl,
        categoryId: selectedCategory,
      });
      toast.success('Qo\'shildi!');
      setForm({ title: '', imageUrl: '' });
      // Refetch
      const res = await apiRequest(`/img-items?categoryId=${selectedCategory}`);
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
      await apiRequest(`/img-items/${id}`, 'DELETE');
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
        Rasm itemlar
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
      <form onSubmit={handleAdd} className="flex flex-wrap gap-3 mb-8 max-w-2xl items-end">
        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs text-[var(--text-secondary)] mb-1">Nomi</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Rasm nomi..."
            className="w-full px-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl text-white text-sm focus:border-white/30 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs text-[var(--text-secondary)] mb-1">Rasm</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="text-sm text-[var(--text-secondary)] file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-white file:text-black file:font-medium file:text-xs file:cursor-pointer"
          />
        </div>
        {form.imageUrl && (
          <img src={form.imageUrl} alt="Preview" className="w-12 h-12 rounded-lg object-cover border border-[var(--border-color)]" />
        )}
        <button
          type="submit"
          disabled={adding || uploading}
          className="flex items-center gap-2 px-5 py-2.5 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-all text-sm disabled:opacity-50"
        >
          {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Qo'shish
        </button>
      </form>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <Loader2 className="w-6 h-6 animate-spin text-[var(--text-secondary)]" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.length === 0 && (
            <p className="col-span-full text-[var(--text-secondary)] text-sm">Rasm topilmadi</p>
          )}
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group relative overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.imageUrl || item.url || item.image}
                  alt={item.title || 'Rasm'}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              {item.title && (
                <p className="p-2 text-xs font-medium truncate">{item.title}</p>
              )}
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-2 right-2 p-1.5 bg-black/60 text-red-400 hover:text-red-300 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
