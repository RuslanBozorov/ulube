import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2 } from 'lucide-react';
import { apiRequest, uploadImage } from '../../api';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminAbout() {
  const [form, setForm] = useState({ name: '', title: '', description: '', skills: '', imageUrl: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [aboutId, setAboutId] = useState(null);

  useEffect(() => {
    apiRequest('/about')
      .then((res) => {
        const arr = Array.isArray(res) ? res : [res];
        const item = arr[0];
        if (item) {
          setAboutId(item.id);
          setForm({
            name: item.name || '',
            title: item.title || '',
            description: item.description || '',
            skills: Array.isArray(item.skills) ? item.skills.join(', ') : item.skills || '',
            imageUrl: item.imageUrl || item.image || '',
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await uploadImage(file);
      const url = data?.url || data?.imageUrl || data;
      setForm((prev) => ({ ...prev, imageUrl: url }));
      toast.success('Rasm yuklandi');
    } catch (err) {
      toast.error('Rasm yuklashda xatolik');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = { ...form, skills: form.skills };
      if (aboutId) {
        await apiRequest(`/about/${aboutId}`, 'PATCH', body);
      } else {
        const data = await apiRequest('/about', 'POST', body);
        if (data?.id) setAboutId(data.id);
      }
      toast.success('Saqlandi!');
    } catch (err) {
      toast.error(err.message || 'Xatolik');
    } finally {
      setSaving(false);
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
        About — Tahrirlash
      </motion.h1>

      <form onSubmit={handleSave} className="max-w-2xl space-y-5">
        <div>
          <label className="block text-sm text-[var(--text-secondary)] mb-1">Ism</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl text-white text-sm focus:border-white/30 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-[var(--text-secondary)] mb-1">Lavozim</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl text-white text-sm focus:border-white/30 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-[var(--text-secondary)] mb-1">Tavsif</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={5}
            className="w-full px-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl text-white text-sm focus:border-white/30 focus:outline-none transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-sm text-[var(--text-secondary)] mb-1">Ko'nikmalar (vergul bilan)</label>
          <input
            value={form.skills}
            onChange={(e) => setForm({ ...form, skills: e.target.value })}
            placeholder="Premiere Pro, After Effects, Cinema 4D"
            className="w-full px-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl text-white text-sm focus:border-white/30 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-[var(--text-secondary)] mb-1">Profil rasmi</label>
          <div className="flex items-center gap-4">
            {form.imageUrl && (
              <img src={form.imageUrl} alt="Preview" className="w-16 h-16 rounded-lg object-cover border border-[var(--border-color)]" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="text-sm text-[var(--text-secondary)] file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white file:text-black file:font-medium file:text-sm file:cursor-pointer hover:file:bg-gray-200"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 text-sm"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Saqlash
        </button>
      </form>
    </div>
  );
}
