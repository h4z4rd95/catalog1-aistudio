import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, Trash2, Tag, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl bg-zinc-900/95 border border-white/20 text-white shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-300"
        >
          <div className="mt-0.5 shrink-0">
            {toast.type === 'add' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            {toast.type === 'remove' && <Trash2 className="w-4 h-4 text-rose-400" />}
            {toast.type === 'coupon' && <Tag className="w-4 h-4 text-amber-400" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-cyan-400" />}
          </div>

          <div className="flex-1 min-w-0">
            <h5 className="font-mono text-xs font-bold text-zinc-100 uppercase tracking-wider">
              {toast.title}
            </h5>
            <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed break-words font-light">
              {toast.message}
            </p>
          </div>

          <button
            onClick={() => dismissToast(toast.id)}
            className="text-zinc-500 hover:text-white transition-colors p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
