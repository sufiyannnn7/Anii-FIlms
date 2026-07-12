import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { profile } from '@/data/profile';

interface FormState {
  name: string;
  type: string;
  email: string;
  phone: string;
}

const EMPTY: FormState = { name: '', type: '', email: '', phone: '' };

/**
 * Collects a few details and hands them straight to WhatsApp as a
 * pre-filled message — no backend required, works with the
 * backend-ready data layer this site already uses.
 */
export function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [sent, setSent] = useState(false);

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    const lines = [
      `Hey, I'm ${form.name} 👋`,
      form.type && `Project type: ${form.type}`,
      `Email: ${form.email}`,
      form.phone && `Phone: ${form.phone}`,
      `I want to cook something genuine — let's talk.`,
    ].filter(Boolean);

    const message = encodeURIComponent(lines.join('\n'));
    const phoneDigits = profile.socials.whatsapp.match(/\d+/g)?.join('') ?? '';
    window.open(`https://wa.me/${phoneDigits}?text=${message}`, '_blank', 'noreferrer');

    setSent(true);
    setForm(EMPTY);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="glass rounded-sm p-8 md:p-12 max-w-3xl mx-auto mt-16 relative overflow-hidden"
    >
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#e0b86e]/10 rounded-full blur-[80px] pointer-events-none" />

      <h3 className="font-display text-3xl md:text-4xl text-white mb-2 text-center leading-tight">
        Want to cook something <span className="italic text-[#e0b86e]">genuine?</span>
      </h3>
      <p className="text-white/40 text-sm text-center mb-10 font-light">
        Fill this in — it lands straight in my WhatsApp.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">Name</label>
          <input
            required
            value={form.name}
            onChange={update('name')}
            placeholder="Your name"
            className="bg-transparent border-b border-white/15 focus:border-[#e0b86e]/70 outline-none py-3 text-white placeholder:text-white/25 font-light transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">Project Type</label>
          <input
            value={form.type}
            onChange={update('type')}
            placeholder="Brand film, campaign, strategy..."
            className="bg-transparent border-b border-white/15 focus:border-[#e0b86e]/70 outline-none py-3 text-white placeholder:text-white/25 font-light transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={update('email')}
            placeholder="you@email.com"
            className="bg-transparent border-b border-white/15 focus:border-[#e0b86e]/70 outline-none py-3 text-white placeholder:text-white/25 font-light transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-white/40">Phone No.</label>
          <input
            type="tel"
            value={form.phone}
            onChange={update('phone')}
            placeholder="+91 00000 00000"
            className="bg-transparent border-b border-white/15 focus:border-[#e0b86e]/70 outline-none py-3 text-white placeholder:text-white/25 font-light transition-colors"
          />
        </div>
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-3 mt-4 py-4 bg-gradient-to-r from-[#25D366] to-[#1ea952] text-black font-medium tracking-[0.15em] uppercase text-xs rounded-sm shadow-[0_0_30px_rgba(37,211,102,0.25)] hover:shadow-[0_0_40px_rgba(37,211,102,0.4)] transition-shadow"
      >
        <Send className="w-4 h-4" />
        {sent ? 'Sent — talk soon!' : 'Send to WhatsApp'}
      </motion.button>
    </motion.form>
  );
}
