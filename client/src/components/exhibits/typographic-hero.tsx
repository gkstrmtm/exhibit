export default function TypographicHero() {
  return (
    <div className="bg-[#f0f0f0] text-black min-h-[400px] flex flex-col justify-between p-8 md:p-16 border border-black">
      <div className="border-b border-black pb-4 flex justify-between items-end">
        <span className="font-mono text-xs tracking-widest uppercase">Volume 01</span>
        <span className="font-mono text-xs tracking-widest uppercase">2024—25</span>
      </div>
      
      <div className="py-12">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.85] uppercase break-words">
          Digital<br/>
          Archival<br/>
          Systems
        </h1>
      </div>

      <div className="flex justify-between items-start border-t border-black pt-4">
        <p className="font-mono text-xs max-w-[200px]">
          EXPLORING THE INTERSECTION OF UTILITARIAN DESIGN AND DIGITAL EPHEMERA.
        </p>
        <button className="bg-black text-white px-6 py-2 font-mono text-xs uppercase hover:bg-transparent hover:text-black border border-black transition-colors">
          Read Manifesto
        </button>
      </div>
    </div>
  );
}
