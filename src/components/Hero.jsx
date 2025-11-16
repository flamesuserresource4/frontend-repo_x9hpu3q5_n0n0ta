import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-zinc-50 to-stone-100"/>
      <div className="relative mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}} className="text-4xl md:text-6xl font-semibold tracking-tight text-zinc-800">
            Drago Decor
          </motion.h1>
          <p className="mt-4 text-zinc-600 text-lg max-w-xl">
            Pitture murali professionali, smalti e resine decorative. Qualità artigianale e competenza tecnica per progetti d'interni premium.
          </p>
          <div className="mt-8 flex gap-4">
            <a href="#catalogo" className="px-5 py-3 bg-zinc-900 text-white rounded-md hover:bg-zinc-800 transition">Esplora catalogo</a>
            <a href="#visualizer" className="px-5 py-3 border border-zinc-300 text-zinc-800 rounded-md hover:bg-white transition">Color Visualizer</a>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-video rounded-xl overflow-hidden shadow-2xl ring-1 ring-black/5">
            <img src="https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1600&auto=format&fit=crop" alt="Parete dipinta" className="w-full h-full object-cover"/>
          </div>
        </div>
      </div>
    </section>
  );
}
