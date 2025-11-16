import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Catalog from './components/Catalog'
import Visualizer from './components/Visualizer'
import Layout from './components/Layout'

const API = import.meta.env.VITE_BACKEND_URL || ''

function App() {
  const [cart, setCart] = useState([])
  const [blog, setBlog] = useState([])

  useEffect(() => {
    fetch(API + '/api/blog').then(r=>r.json()).then(setBlog).catch(()=>setBlog([]))
  }, [])

  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(p => (p._id?.$oid || p.title) === (item._id?.$oid || item.title))
      if (exists) return prev.map(p => p===exists ? {...p, qty: p.qty+1} : p)
      return [...prev, { ...item, qty: 1 }]
    })
  }

  return (
    <Layout cartCount={cart.reduce((a,b)=>a+b.qty,0)} onCartClick={()=>alert('Checkout demo – integrazione futura con Shopify/WooCommerce')}>
      <Hero />
      <Catalog onAdd={addToCart} />
      <Visualizer />

      <section id="blog" className="bg-stone-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-2xl font-semibold text-zinc-800">Consigli e ispirazioni</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blog.map(post => (
              <article key={post._id?.$oid || post.slug} className="rounded-xl border border-zinc-200 bg-white p-5">
                <img src={post.cover || 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop'} alt="" className="rounded-md mb-3 aspect-video object-cover"/>
                <h3 className="font-medium text-zinc-800">{post.title}</h3>
                <p className="text-sm text-zinc-600 line-clamp-2">{post.content}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contatti" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-2xl font-semibold text-zinc-800">Contattaci</h2>
          <ContactForm />
        </div>
      </section>

      <section id="area-pro" className="bg-stone-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-2xl font-semibold text-zinc-800">Area Professionisti</h2>
          <p className="text-zinc-600 max-w-2xl">Registrati per accedere a listini dedicati e consulenza tecnica personalizzata.</p>
          <ProForm />
        </div>
      </section>
    </Layout>
  )
}

function ContactForm(){
  const API = import.meta.env.VITE_BACKEND_URL || ''
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [message,setMessage] = useState('')
  const [sent,setSent] = useState(false)

  const submit = async (e)=>{
    e.preventDefault()
    await fetch(API+'/api/contact',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({name,email,message})})
    setSent(true)
  }

  if(sent) return <p className="text-zinc-700">Messaggio inviato. Ti risponderemo al più presto.</p>

  return (
    <form onSubmit={submit} className="mt-6 grid sm:grid-cols-2 gap-4 max-w-2xl">
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nome" className="px-4 py-2 rounded-md border border-zinc-300"/>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="px-4 py-2 rounded-md border border-zinc-300"/>
      <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="Messaggio" rows={4} className="px-4 py-2 rounded-md border border-zinc-300 sm:col-span-2"/>
      <button className="px-4 py-2 bg-zinc-900 text-white rounded-md sm:col-span-2">Invia</button>
    </form>
  )
}

function ProForm(){
  const API = import.meta.env.VITE_BACKEND_URL || ''
  const [business_name,setBusiness] = useState('')
  const [email,setEmail] = useState('')
  const [tier,setTier] = useState('standard')
  const [ok,setOk] = useState(false)

  const submit = async (e)=>{
    e.preventDefault()
    await fetch(API+'/api/professionals',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({business_name,email,tier})})
    setOk(true)
  }

  if(ok) return <p className="text-zinc-700">Richiesta inviata. Riceverai il listino riservato via email.</p>

  return (
    <form onSubmit={submit} className="mt-6 grid sm:grid-cols-2 gap-4 max-w-2xl">
      <input value={business_name} onChange={e=>setBusiness(e.target.value)} placeholder="Ragione sociale" className="px-4 py-2 rounded-md border border-zinc-300"/>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="px-4 py-2 rounded-md border border-zinc-300"/>
      <select value={tier} onChange={e=>setTier(e.target.value)} className="px-4 py-2 rounded-md border border-zinc-300">
        <option value="standard">Standard</option>
        <option value="pro">Pro</option>
        <option value="elite">Elite</option>
      </select>
      <button className="px-4 py-2 bg-zinc-900 text-white rounded-md">Richiedi accesso</button>
    </form>
  )
}

export default App
