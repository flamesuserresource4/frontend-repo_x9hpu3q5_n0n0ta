import { useEffect, useRef, useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function Visualizer() {
  const [file, setFile] = useState(null);
  const [color, setColor] = useState("#BFAE9F");
  const [finish, setFinish] = useState("opaco");
  const [preview, setPreview] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    if (!color) return;
    fetch(`${API}/api/visualizer/complementary?color=${encodeURIComponent(color)}`)
      .then(r => r.json())
      .then(d => setSuggestions([d.complementary, ...(d.suggestions||[])]))
      .catch(()=> setSuggestions([]));
  }, [color]);

  const handleApply = async () => {
    if (!file) return;
    const form = new FormData();
    form.append("image", file);
    form.append("color", color);
    form.append("finish", finish);
    const res = await fetch(`${API}/api/visualizer/apply`, { method: "POST", body: form });
    const blob = await res.blob();
    setPreview(URL.createObjectURL(blob));
  };

  return (
    <section id="visualizer" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-800">Color Visualizer</h2>
            <p className="text-zinc-600">Carica una foto, scegli un colore e guarda l'anteprima.</p>
          </div>
          <div className="flex items-center gap-3">
            <input type="color" value={color} onChange={e=>setColor(e.target.value)} className="w-12 h-10 rounded cursor-pointer"/>
            <select value={finish} onChange={e=>setFinish(e.target.value)} className="px-3 py-2 rounded-md border border-zinc-300 bg-white">
              <option>opaco</option>
              <option>seta</option>
              <option>lucido</option>
              <option>satinato</option>
            </select>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <div className="rounded-xl border border-zinc-200 p-6 bg-stone-50">
            <div className="aspect-video rounded-lg overflow-hidden bg-white flex items-center justify-center">
              {preview ? (
                <img src={preview} alt="preview" className="w-full h-full object-contain"/>
              ) : (
                <div className="text-center text-zinc-500">
                  <p>Trascina una foto qui o seleziona un file</p>
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <input ref={inputRef} onChange={e=>setFile(e.target.files?.[0]||null)} type="file" accept="image/*" className="hidden"/>
              <button onClick={()=>inputRef.current?.click()} className="px-4 py-2 bg-zinc-900 text-white rounded-md">Carica foto</button>
              <button onClick={handleApply} className="px-4 py-2 border border-zinc-300 rounded-md">Applica colore</button>
            </div>
            {preview && (
              <div className="mt-3 flex gap-3">
                <a href={preview} download className="px-3 py-2 text-sm rounded-md bg-zinc-900 text-white">Scarica</a>
                <button onClick={()=>navigator.share && navigator.share({title:"Drago Decor", url: preview})} className="px-3 py-2 text-sm rounded-md border border-zinc-300">Condividi</button>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-medium text-zinc-800">Suggerimenti colore</h3>
            <div className="mt-3 flex flex-wrap gap-3">
              {suggestions.map((s,i)=> (
                <button key={s+i} onClick={()=>setColor(s)} className="px-3 py-2 rounded-md border border-zinc-200 bg-white flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full ring-1 ring-black/10" style={{backgroundColor: s}}/>
                  <span className="text-sm">{s}</span>
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-zinc-200 p-6">
              <h4 className="font-medium text-zinc-800">Calcolo litri necessari</h4>
              <CoverageForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoverageForm(){
  const API = import.meta.env.VITE_BACKEND_URL || "";
  const [mq, setMq] = useState(50);
  const [mano, setMano] = useState(2);
  const [resa, setResa] = useState(10);
  const [litri, setLitri] = useState(null);

  const calc = async () => {
    const res = await fetch(`${API}/api/coverage`, {method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({mq, mano, resa_mq_litro: resa})});
    const data = await res.json();
    setLitri(data.litri);
  };

  return (
    <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
      <label className="flex flex-col gap-1">Metri quadri<input type="number" value={mq} onChange={e=>setMq(parseFloat(e.target.value)||0)} className="px-3 py-2 rounded-md border border-zinc-300"/></label>
      <label className="flex flex-col gap-1">Mani<input type="number" value={mano} onChange={e=>setMano(parseInt(e.target.value)||1)} className="px-3 py-2 rounded-md border border-zinc-300"/></label>
      <label className="flex flex-col gap-1">Resa mq/L<input type="number" value={resa} onChange={e=>setResa(parseFloat(e.target.value)||0)} className="px-3 py-2 rounded-md border border-zinc-300"/></label>
      <div className="flex items-end"><button onClick={calc} className="px-4 py-2 bg-zinc-900 text-white rounded-md w-full">Calcola</button></div>
      {litri !== null && <div className="col-span-2 text-zinc-700">Litri consigliati: <span className="font-semibold">{litri}</span></div>}
    </div>
  );
}
