import { User } from "lucide-react";

export default function GlassCard() {
  return (
    <div className="p-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center min-h-[300px]">
      <div className="relative w-80 h-48 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-xl overflow-hidden p-6 text-white flex flex-col justify-between group hover:bg-white/15 transition-colors duration-300">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors" />
        
        <div className="flex justify-between items-start">
            <div className="p-2 bg-white/20 rounded-lg">
                <User className="w-5 h-5 text-white" />
            </div>
            <div className="text-xs font-mono opacity-60 tracking-widest">MEMBER</div>
        </div>
        
        <div className="space-y-1">
            <div className="text-sm opacity-80">Total Balance</div>
            <div className="text-3xl font-bold tracking-tight">$12,450.00</div>
        </div>
        
        <div className="text-xs opacity-50 font-mono">
            **** **** **** 4291
        </div>
      </div>
    </div>
  );
}
