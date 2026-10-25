import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSiteSettings } from '@/lib/settings';

interface FormState {
  name: string;
  type: string;
  email: string;
  phone: string;
}

const EMPTY: FormState = { name: '', type: '', email: '', phone: '' };

export function ContactForm() {
  const { data: settings } = useSiteSettings();
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
    
    const rawPhone = settings?.contact_phone;
    const phoneDigits = rawPhone ? rawPhone.replace(/\D/g, '') : '';
    
    if (phoneDigits) {
      window.open(`https://wa.me/${phoneDigits}?text=${message}`, '_blank', 'noreferrer');
    } else {
      const emailRecipient = settings?.contact_email || 'aniket24007@gmail.com';
      window.open(`mailto:${emailRecipient}?subject=Project Inquiry&body=${message}`, '_self');
    }

    setSent(true);
    setForm(EMPTY);
    setTimeout(() => setSent(false), 4000);
  };

  const actionText = settings?.contact_phone ? 'Submit to WhatsApp' : 'Submit via Email';

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="glass rounded-sm p-8 md:p-12 max-w-3xl mx-auto mt-16 relative overflow-hidden"
    >
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

      <h3 className="font-display text-3xl md:text-4xl text-foreground mb-2 text-center leading-tight">
        Want to cook something <span className="italic text-primary">genuine?</span>
      </h3>
      <p className="text-foreground/40 text-sm text-center mb-10 font-light">
        Fill this in — it lands straight in my inbox.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">Name</label>
          <input
            required
            value={form.name}
            onChange={update('name')}
            placeholder="Your name"
            className="bg-transparent border-b-2 border-foreground/15 hover:border-foreground/30 focus:border-primary outline-none py-3 text-foreground placeholder:text-foreground/25 font-light transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">Project Type</label>
          <input
            value={form.type}
            onChange={update('type')}
            placeholder="Brand film, campaign, strategy..."
            className="bg-transparent border-b-2 border-foreground/15 hover:border-foreground/30 focus:border-primary outline-none py-3 text-foreground placeholder:text-foreground/25 font-light transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={update('email')}
            placeholder="you@email.com"
            className="bg-transparent border-b-2 border-foreground/15 hover:border-foreground/30 focus:border-primary outline-none py-3 text-foreground placeholder:text-foreground/25 font-light transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">Phone No.</label>
          <input
            type="tel"
            value={form.phone}
            onChange={update('phone')}
            placeholder="Your phone number"
            className="bg-transparent border-b-2 border-foreground/15 hover:border-foreground/30 focus:border-primary outline-none py-3 text-foreground placeholder:text-foreground/25 font-light transition-colors"
          />
        </div>
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full flex items-center justify-center gap-2.5 mt-4 py-4 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold tracking-widest uppercase text-[10px] rounded shadow-md transition-all cursor-pointer"
      >
        <span className="tracking-widest uppercase font-bold text-[10px]">
          {sent ? 'Opening Mailer...' : actionText}
        </span>
      </motion.button>
    </motion.form>
  );
}
