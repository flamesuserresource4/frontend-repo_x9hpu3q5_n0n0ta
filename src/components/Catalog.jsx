import { useEffect, useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "";

const categories = [
  { name: "Pitture murali", slug: "pitture" },
  { name: "Smalti", slug: "smalti" },
  { name: "Resine decorative", slug: "resine" },
  { name: "Carte da parati", slug: "carte" },
  { name: "Accessori", slug: "accessori" },
];

function ProductCard({ item, onAdd }) {
  const first = item.variants?.[0];
  return (
    <div className="rounded-xl border border-zinc-200 p-4 bg-white shadow-sm">
      <div className="aspect-video rounded-lg overflow-hidden mb-3 bg-stone-100">
        <img src={item.images?.[0] || "https://images.unsplash.com/photo-1523419409543-a7ea0c57b6b3?q=80&w=1200&auto=format&fit=crop"} alt={item.title} className="w-full h-full object-cover"/>
      </div>
      <h3 className="font-medium text-zinc-800">{item.title}</h3>
      <p className="text-sm text-zinc-600 line-clamp-2">{item.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {item.variants?.slice(0,5).map(v => (
            <span key={v.hex} className="h-5 w-5 rounded-full ring-1 ring-black/10" style={{backgroundColor: v.hex}}/>
          ))}
        </div>
        <div className="text-zinc-900 font-semibold">€ {item.base_price?.toFixed(2)}</div>
      </div>
      <button onClick={() => onAdd(item)} className="mt-4 w-full px-4 py-2 bg-zinc-900 text-white rounded-md hover:bg-zinc-800">Aggiungi al carrello</button>
    </div>
  );
}

export default function Catalog({ onAdd }) {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState({ color: "", finish: "", usage: "" });

  useEffect(() => {
    const url = new URL(API + "/api/products");
    if (q) url.searchParams.set("q", q);
    if (filters.color) url.searchParams.set("color", filters.color);
    if (filters.finish) url.searchParams.set("finish", filters.finish);
    if (filters.usage) url.searchParams.set("usage", filters.usage);
    fetch(url.toString()).then(r => r.json()).then(setItems).catch(() => setItems([]));
  }, [q, filters]);

  return (
    <section id="catalogo" className="bg-stone-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-800">Catalogo prodotti</h2>
            <p className="text-zinc-600">Selezione curata di finiture professionali</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cerca..." className="px-4 py-2 rounded-md border border-zinc-300 bg-white"/>
            <input value={filters.color} onChange={e=>setFilters(f=>({...f,color:e.target.value}))} placeholder="#HEX" className="px-4 py-2 rounded-md border border-zinc-300 bg-white w-24"/>
            <select value={filters.finish} onChange={e=>setFilters(f=>({...f,finish:e.target.value}))} className="px-3 py-2 rounded-md border border-zinc-300 bg-white">
              <option value="">Finitura</option>
              <option>opaco</option>
              <option>seta</option>
              <option>lucido</option>
              <option>satinato</option>
            </select>
            <select value={filters.usage} onChange={e=>setFilters(f=>({...f,usage:e.target.value}))} className="px-3 py-2 rounded-md border border-zinc-300 bg-white">
              <option value="">Uso</option>
              <option value="interno">Interno</option>
              <option value="esterno">Esterno</option>
              <option value="entrambi">Entrambi</option>
            </select>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(it => (
            <ProductCard key={it._id?.$oid || it.title} item={it} onAdd={onAdd}/>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.map(c => (
            <a key={c.slug} href={`#${c.slug}`} className="px-4 py-2 rounded-full bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 text-sm text-center">{c.name}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
