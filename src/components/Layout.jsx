import { ShoppingCart, Menu } from "lucide-react";
import { useState } from "react";

export default function Layout({ children, cartCount, onCartClick }){
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-stone-50 text-zinc-800">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={()=>setOpen(v=>!v)}><Menu className="h-6 w-6"/></button>
            <a href="#" className="text-xl font-semibold tracking-tight">Drago Decor</a>
          </div>
          <nav className={`absolute md:static left-0 right-0 top-16 md:top-0 bg-white md:bg-transparent border-b md:border-0 ${open?"block":"hidden"} md:block`}>
            <ul className="flex flex-col md:flex-row md:items-center gap-4 p-4 md:p-0">
              <li><a href="#catalogo" className="hover:underline">Catalogo</a></li>
              <li><a href="#visualizer" className="hover:underline">Visualizer</a></li>
              <li><a href="#blog" className="hover:underline">Blog</a></li>
              <li><a href="#contatti" className="hover:underline">Contatti</a></li>
              <li><a href="#area-pro" className="hover:underline">Area Pro</a></li>
            </ul>
          </nav>
          <button onClick={onCartClick} className="relative">
            <ShoppingCart className="h-6 w-6"/>
            {cartCount>0 && <span className="absolute -top-1 -right-2 bg-zinc-900 text-white text-xs rounded-full px-2 py-0.5">{cartCount}</span>}
          </button>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-20 border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 grid md:grid-cols-3 gap-8 text-sm text-zinc-600">
          <div>
            <p className="font-medium text-zinc-800">Drago Decor</p>
            <p>Qualità, artigianalità e competenza.</p>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-zinc-800">Categorie</p>
            <p>Pitture murali · Smalti · Resine decorative · Carte da parati · Accessori</p>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-zinc-800">Contatti</p>
            <p>info@dragodecor.it</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
