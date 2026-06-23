import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

export default function AdminSetup({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { user } = useAuth();
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const makeAdmin = async () => {
    if (!user || !db) return;
    setStatus('loading');
    try {
      await setDoc(doc(db, 'users', user.uid), { role: 'admin' }, { merge: true });
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-sm w-full text-center space-y-4">
        <h1 className="text-xl font-bold text-neutral-900">Admin Kurulumu</h1>
        {!user && <p className="text-stone-500 text-sm">Önce giriş yapın.</p>}
        {user && status === 'idle' && (
          <>
            <p className="text-stone-600 text-sm">{user.email}</p>
            <button
              onClick={makeAdmin}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl py-3 transition-colors"
            >
              Beni Admin Yap
            </button>
          </>
        )}
        {status === 'loading' && <p className="text-stone-500 text-sm">Kaydediliyor...</p>}
        {status === 'done' && (
          <>
            <p className="text-green-600 font-semibold">Admin olarak atandınız!</p>
            <button
              onClick={() => onNavigate('home')}
              className="w-full bg-neutral-900 text-white font-semibold rounded-xl py-3 transition-colors"
            >
              Ana Sayfaya Dön
            </button>
          </>
        )}
        {status === 'error' && <p className="text-red-500 text-sm">Hata oluştu. Lütfen tekrar deneyin.</p>}
      </div>
    </div>
  );
}
