import { useState } from "react";
import { Trash2, ShieldCheck } from "lucide-react";

export const TrashApp = () => {
  const [cleared, setCleared] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[300px] p-6 text-center select-none space-y-4">
      <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
        <Trash2 className="w-8 h-8 text-amber-400" />
      </div>

      <div>
        <h1 className="text-lg font-bold text-white">
          Recycle Bin is Clean
        </h1>
        <p className="text-xs text-gray-400 mt-1 max-w-sm">
          0 bytes of memory leaks, spaghetti code, or unchecked exceptions found in Vishnu's codebase.
        </p>
      </div>

      <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>100% Verified Production Quality Code</span>
      </div>

      <button
        onClick={() => setCleared(true)}
        className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-gray-300 transition-colors"
      >
        {cleared ? "Trash Already Pristine ✨" : "Empty Trash (Again)"}
      </button>
    </div>
  );
};
