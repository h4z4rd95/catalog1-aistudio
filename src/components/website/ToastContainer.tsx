import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, Trash2, Tag, Info, X, RotateCcw } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast, direction, language } = useStore();

  if (toasts.length === 0) return null;

  const isRtl = direction === 'rtl';
  const isFa = language === 'fa';

  return (
    <div
      dir={direction}
      className={`fixed bottom-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0 ${
        isRtl ? 'left-6' : 'right-6'
      }`}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl bg-zinc-950/95 border border-white/20 text-white shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-300 ring-1 ring-white/10"
        >
          {toast.image ? (
            <img
              src={toast.image}
              alt=""
              className="w-10 h-10 rounded-lg object-cover bg-black/50 border border-white/10 shrink-0"
            />
          ) : (
            <div className="mt-0.5 shrink-0">
              {toast.type === 'add' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {toast.type === 'remove' && <Trash2 className="w-5 h-5 text-rose-400" />}
              {toast.type === 'coupon' && <Tag className="w-5 h-5 text-amber-400" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-cyan-400" />}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              {toast.image && (
                <>
                  {toast.type === 'add' && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
                  {toast.type === 'remove' && <span className="w-2 h-2 rounded-full bg-rose-400" />}
                </>
              )}
              <h5 className="font-['Syne'] text-xs font-bold text-zinc-100 uppercase tracking-wider">
                {toast.title}
              </h5>
            </div>
            <p className="text-xs text-zinc-300 mt-1 leading-relaxed break-words font-light">
              {toast.message}
            </p>

            {toast.undoAction && (
              <button
                onClick={() => {
                  toast.undoAction?.();
                  dismissToast(toast.id);
                }}
                className="mt-2.5 px-2.5 py-1 rounded-md bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-[11px] font-bold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{isFa ? 'بازگردانی به سبد خرید' : 'Undo & Restore Item'}</span>
              </button>
            )}
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
