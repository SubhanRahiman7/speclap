import { XIcon } from "lucide-react";

function PinnedMessagesModal({ pinnedMessages, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-linear-to-br from-slate-900/95 via-indigo-900/95 to-purple-900/95 backdrop-blur-xl border border-indigo-500/20 rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[85vh] overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h2 className="text-xl font-bold text-white ml-2">Pinned Messages</h2>
          <button 
            onClick={onClose} 
            className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-200 mr-2"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* MESSAGES LIST */}
        <div className="px-6 py-4 max-h-96 overflow-y-auto">
          {pinnedMessages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-3 py-4 border-b border-white/10 last:border-b-0">
              <img
                src={msg.user.image}
                alt={msg.user.name}
                className="w-9 h-9 rounded-full object-cover mt-1 border border-white/20"
              />
              <div className="flex-1">
                <div className="text-sm font-semibold text-white/90 mb-1">{msg.user.name}</div>
                <div className="text-sm text-white/80 whitespace-pre-line">{msg.text}</div>
              </div>
            </div>
          ))}

          {pinnedMessages.length === 0 && (
            <div className="text-center text-white/60 py-8">No pinned messages</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PinnedMessagesModal;