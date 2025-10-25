import { XIcon } from "lucide-react";

function MembersModal({ members, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-linear-to-br from-slate-900/95 via-indigo-900/95 to-purple-900/95 backdrop-blur-xl border border-indigo-500/20 rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[85vh] overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-white/10 px-8 py-5">
          <h2 className="text-xl font-bold text-white">Channel Members</h2>
          <button 
            onClick={onClose} 
            className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-200"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* MEMBERS LIST */}
        <div className="px-8 py-6 max-h-96 overflow-y-auto">
          {members.map((member) => (
            <div
              key={member.user.id}
              className="flex items-center gap-4 py-4 border-b border-white/10 last:border-b-0 mx-2"
            >
              {member.user?.image ? (
                <img
                  src={member.user.image}
                  alt={member.user.name}
                  className="size-9 rounded-full object-cover border border-white/20"
                />
              ) : (
                <div className="size-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center border border-white/20">
                  <span className="text-white font-semibold">
                    {(member.user.name || member.user.id).charAt(0).toUpperCase()}
                  </span>
                </div>
              )}

              <div className="text-sm font-semibold text-white/90">
                {member.user.name || member.user.id}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MembersModal;