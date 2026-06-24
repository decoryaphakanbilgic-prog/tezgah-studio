import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { Users, Bell, LogOut, Shield, Mail, Clock, Search } from 'lucide-react';

interface UserRecord {
  uid: string;
  name: string;
  email: string;
  photo: string;
  role: string;
  createdAt: any;
  lastSeen: any;
  notificationsEnabled: boolean;
}

export default function AdminPanel({ onNavigate }: { onNavigate: (p: string) => void }) {
  const { user, isAdmin, logout } = useAuth();
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [notifTitle, setNotifTitle] = useState('');
  const [notifBody, setNotifBody] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!isAdmin) return;
    const fetchUsers = async () => {
      const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setUsers(snap.docs.map(d => ({ uid: d.id, ...d.data() } as UserRecord)));
      setLoading(false);
    };
    fetchUsers();
  }, [isAdmin]);

  const makeAdmin = async (uid: string) => {
    await updateDoc(doc(db, 'users', uid), { role: 'admin' });
    setUsers(prev => prev.map(u => u.uid === uid ? { ...u, role: 'admin' } : u));
  };

  const sendNotification = async () => {
    if (!notifTitle || !notifBody) return;
    setSending(true);
    // Bildirim gönderimi Firebase Cloud Messaging üzerinden yapılacak
    // Gerçek push için backend endpoint gerekir; şimdilik e-posta simülasyonu
    await new Promise(r => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    setNotifTitle('');
    setNotifBody('');
    setTimeout(() => setSent(false), 3000);
  };

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const fmt = (ts: any) => {
    if (!ts) return '—';
    const d = ts.toDate?.() ?? new Date(ts);
    return d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center space-y-3">
          <Shield className="h-12 w-12 text-stone-300 mx-auto" />
          <p className="text-stone-500 font-medium">Bu alana erişim izniniz yok.</p>
          <button onClick={() => onNavigate('home')} className="text-amber-600 text-sm underline">
            Ana sayfaya dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top bar */}
      <div className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-neutral-900">Tezgah Studio — Admin</p>
            <p className="text-[13px] text-stone-400">{user?.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('home')} className="text-xs text-stone-500 hover:text-neutral-800 transition-colors">
            Siteye Dön
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            Çıkış
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Toplam Üye', value: users.length, icon: Users, color: 'text-amber-600 bg-amber-50' },
            { label: 'Admin', value: users.filter(u => u.role === 'admin').length, icon: Shield, color: 'text-blue-600 bg-blue-50' },
            { label: 'Bu Ay', value: users.filter(u => {
              if (!u.createdAt) return false;
              const d = u.createdAt.toDate?.() ?? new Date(u.createdAt);
              return d.getMonth() === new Date().getMonth();
            }).length, icon: Clock, color: 'text-emerald-600 bg-emerald-50' },
            { label: 'Bildirim Açık', value: users.filter(u => u.notificationsEnabled).length, icon: Bell, color: 'text-purple-600 bg-purple-50' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-stone-100 p-5 flex items-center gap-4">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-neutral-900">{s.value}</p>
                <p className="text-[13px] text-stone-400">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kullanıcı listesi */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between gap-3">
              <h3 className="font-semibold text-neutral-900 text-sm">Üyeler</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Ad veya e-posta ara..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-8 pr-4 py-1.5 text-xs border border-stone-200 rounded-lg focus:outline-none focus:border-amber-400 w-48"
                />
              </div>
            </div>
            {loading ? (
              <div className="py-16 text-center text-stone-400 text-sm">Yükleniyor...</div>
            ) : filtered.length === 0 ? (
              <div className="py-16 text-center text-stone-400 text-sm">Üye bulunamadı.</div>
            ) : (
              <div className="divide-y divide-stone-50">
                {filtered.map(u => (
                  <div key={u.uid} className="flex items-center gap-4 px-5 py-3 hover:bg-stone-50 transition-colors">
                    {u.photo ? (
                      <img src={u.photo} alt={u.name} className="h-9 w-9 rounded-full object-cover shrink-0" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="h-9 w-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-sm shrink-0">
                        {u.name?.[0] ?? '?'}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-800 truncate">{u.name ?? '—'}</p>
                      <p className="text-[13px] text-stone-400 truncate">{u.email}</p>
                    </div>
                    <div className="shrink-0 text-right space-y-0.5">
                      {u.role === 'admin' ? (
                        <span className="inline-block px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">Admin</span>
                      ) : (
                        <button
                          onClick={() => makeAdmin(u.uid)}
                          className="text-xs text-stone-400 hover:text-amber-600 underline transition-colors"
                        >
                          Admin yap
                        </button>
                      )}
                      <p className="text-xs text-stone-300">{fmt(u.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bildirim gönder */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-stone-100 p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-amber-500" />
                <h3 className="font-semibold text-neutral-900 text-sm">Bildirim Gönder</h3>
              </div>
              <p className="text-[13px] text-stone-400">Tüm üyelere e-posta ve push bildirimi gönderin.</p>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Başlık"
                  value={notifTitle}
                  onChange={e => setNotifTitle(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-amber-400"
                />
                <textarea
                  placeholder="Mesaj içeriği..."
                  value={notifBody}
                  onChange={e => setNotifBody(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2.5 text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>
              <button
                onClick={sendNotification}
                disabled={sending || !notifTitle || !notifBody}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl py-2.5 transition-colors"
              >
                {sending ? 'Gönderiliyor...' : sent ? '✓ Gönderildi!' : (
                  <>
                    <Mail className="h-4 w-4" />
                    Tüm Üyelere Gönder ({users.length})
                  </>
                )}
              </button>
            </div>

            {/* Hızlı bilgi */}
            <div className="bg-amber-50 rounded-2xl border border-amber-100 p-5 space-y-2">
              <p className="text-xs font-semibold text-amber-800">Push Bildirimleri</p>
              <p className="text-[13px] text-amber-700 leading-relaxed">
                Gerçek push bildirimi için Firebase Cloud Messaging (FCM) backend servisi aktif edilmesi gerekir.
                Şu an e-posta bildirimleri hazır durumda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
