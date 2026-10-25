import re

with open('src/components/sections/ContactForm.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace all text-white and text-white/XX with text-foreground and text-foreground/XX
# Change border-white/15 to border-foreground/15, bg-transparent is fine but let's make it bg-background/5 for slightly better input visibility
# Also change placeholder:text-white/25 to placeholder:text-foreground/40

replacements = {
    'text-white': 'text-foreground',
    'text-white/40': 'text-foreground/60',
    'text-white/25': 'text-foreground/40',
    'border-white/15': 'border-foreground/15',
    'placeholder:text-white/25': 'placeholder:text-foreground/40',
    'bg-[#e0b86e]': 'bg-primary',
    'hover:bg-[#e0b86e]/95': 'hover:bg-primary/95',
    'text-[#e0b86e]': 'text-primary',
    'text-black': 'text-primary-foreground',
    'border-b border-foreground/15': 'border-b-2 border-foreground/15 hover:border-foreground/30',
    'focus:border-[#e0b86e]/70': 'focus:border-primary',
    'focus:border-primary': 'focus:border-primary', # avoid double focus
}

for old, new in replacements.items():
    if old != new:
        content = content.replace(old, new)

# Fix duplicate focus:border-primary focus:border-primary
content = content.replace('focus:border-primary focus:border-primary', 'focus:border-primary')

with open('src/components/sections/ContactForm.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
