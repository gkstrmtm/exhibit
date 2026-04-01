import { Search } from "lucide-react";

export default function SwissInput() {
  return (
    <div className="p-12 bg-[#F5F5F5] flex flex-col gap-8 items-center justify-center min-h-[300px]">
      
      {/* Input 1 */}
      <div className="w-full max-w-md relative group">
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5 block">Email Address</label>
        <input 
            type="email" 
            placeholder="name@example.com" 
            className="w-full bg-transparent border-b-2 border-neutral-300 py-2 text-lg focus:outline-none focus:border-blue-600 transition-colors placeholder:text-neutral-400 font-medium"
        />
      </div>

      {/* Input 2 */}
      <div className="w-full max-w-md relative">
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5 block">Search Archive</label>
        <div className="relative">
            <input 
                type="text" 
                className="w-full bg-white border border-neutral-200 pl-3 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all placeholder:text-neutral-400 shadow-sm"
                placeholder="Type to search..."
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                <Search className="w-4 h-4" />
            </div>
        </div>
      </div>

    </div>
  );
}
