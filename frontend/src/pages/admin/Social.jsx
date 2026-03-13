import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Save, Loader2 } from 'lucide-react';
import { apiRequest } from '../../api';
import toast, { Toaster } from 'react-hot-toast';

const PLATFORMS = ['Instagram', 'YouTube', 'Telegram', 'Facebook', 'TikTok'];

export default function Social() {
  const [socials, setSocials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPlatform, setNewPlatform] = useState('Instagram');
  const [newUrl, setNewUrl] = useState('');
  const [adding, setAdding] = useState(false);

  const fetchSocials = () => {
    apiRequest('/social')
      .then((res) => {
        const arr = Array.isArray(res) ? res : [];
        setSocials(arr);
      })
      .catch(() => setSocials([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSocials();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newUrl.trim()) return;
    setAdding(true);
    try {
      await apiRequest('/social', 'POST', { platform: newPlatform, url: newUrl });
      toast.success('Qo\'shildi!');
      setNewUrl('');
      fetchSocials();
    } catch (err) {
      toast.error(err.message || 'Xatolik');
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('O\'chirilsinmi?')) return;
    try {
      await apiRequest(`/social/${id}`, 'DELETE');
      toast.success('O\'chirildi');
      fetchSocials();
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
        Ijtimoiy tarmoqlar
      </motion.h1>

      {/* Add form */}
      <form onSubmit={handleAdd} className="flex flex-wrap gap-3 mb-8 max-w-2xl">
        <select
          value={newPlatform}
          onChange={(e) => setNewPlatform(e.target.value)}
          className="px-3 py-2.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl text-white text-sm focus:border-white/30 focus:outline-none"
        >
          {PLATFORMS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <input
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="https://..."
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
      <div className="space-y-3 max-w-2xl">
        {socials.length === 0 && (
          <p className="text-[var(--text-secondary)] text-sm">Hech qanday ijtimoiy tarmoq topilmadi</p>
        )}
        {socials.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between gap-4 p-4 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-white">{s.platform || s.name}</p>
              <p className="text-xs text-[var(--text-secondary)] truncate">{s.url || s.link}</p>
            </div>
            <button
              onClick={() => handleDelete(s.id)}
              className="flex-shrink-0 p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
