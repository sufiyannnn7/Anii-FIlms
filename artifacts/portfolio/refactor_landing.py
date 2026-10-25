import re

with open('src/pages/Landing.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the hardcoded cards with the dynamic ones
cards_pattern = r'\<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"\>.*?\<\!-- 5\. CONTACT SECTION --\>'
new_cards = """<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            
            {[
              settings?.home_cards_config?.filmmaking,
              settings?.home_cards_config?.marketing
            ]
              .filter(card => card && card.show_card)
              .sort((a, b) => (a?.card_order || 0) - (b?.card_order || 0))
              .map((card, i) => {
                if (!card) return null;
                
                // Determine styling based on text_alignment
                const textAlignClass = card.text_alignment === 'center' ? 'text-center' : card.text_alignment === 'right' ? 'text-right' : 'text-left';
                const flexAlignClass = card.text_alignment === 'center' ? 'items-center' : card.text_alignment === 'right' ? 'items-end' : 'items-start';
                const justifyClass = card.text_alignment === 'center' ? 'justify-center' : card.text_alignment === 'right' ? 'justify-end' : 'justify-start';
                
                // Hover animation handling
                let hoverClasses = "hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]";
                let imgHoverClass = "group-hover:scale-105 group-hover:brightness-[0.5]";
                
                if (card.hover_animation === 'lift') {
                  hoverClasses = "hover:-translate-y-4 shadow-md hover:shadow-2xl";
                  imgHoverClass = "group-hover:scale-100";
                } else if (card.hover_animation === 'glow') {
                  hoverClasses = "hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:border-white/30";
                  imgHoverClass = "group-hover:scale-105";
                } else if (card.hover_animation === 'none') {
                  hoverClasses = "";
                  imgHoverClass = "";
                }

                return (
                  <Link href={card.button_link} key={i} className={`group block cursor-pointer transition-all duration-500 ${hoverClasses} ${card.border_radius} overflow-hidden h-full`}>
                    <TiltCard maxTilt={4} glare={true} className={`${card.border_radius} overflow-hidden h-full`}>
                      <div className={`relative w-full ${card.card_height} overflow-hidden flex flex-col justify-end p-8 border border-foreground/10 shadow-md bg-secondary/20`}>
                        {/* Background Image */}
                        <div className="absolute inset-0 z-0">
                          {card.bg_image ? (
                            <img 
                              src={card.bg_image} 
                              alt={card.title} 
                              className={`w-full h-full object-cover transition-transform duration-1000 filter brightness-[0.4] ${imgHoverClass}`}
                            />
                          ) : (
                            <div className="w-full h-full bg-secondary/50" />
                          )}
                          <div 
                            className="absolute inset-0 transition-opacity duration-500" 
                            style={{ 
                              background: `linear-gradient(to top, ${card.overlay_color} 0%, transparent 100%)`, 
                              opacity: card.overlay_opacity / 100 
                            }} 
                          />
                        </div>
                        
                        {/* Card Content */}
                        <div className={`relative z-10 space-y-4 flex flex-col ${flexAlignClass}`}>
                          <div className={`flex flex-wrap gap-2 ${justifyClass} w-full`}>
                            {card.subtitle.split('•').map((sub, idx) => (
                              <span key={idx} className={`${idx === 0 ? 'bg-primary text-white shadow-md' : 'bg-black/60 text-white/95 border border-white/15'} text-[9px] uppercase tracking-widest px-3 py-1 rounded-full font-bold`}>
                                {idx === 0 ? 'i.' : 'ii.'} {sub.trim()}
                              </span>
                            ))}
                          </div>
                          
                          <div className={`space-y-1 ${textAlignClass} w-full`}>
                            <h3 className="font-display text-4xl md:text-5xl leading-tight" style={{ color: card.text_color }}>{card.title}</h3>
                            <p className="text-xs font-light tracking-[0.1em] uppercase transition-colors flex items-center gap-1.5" style={{ color: `${card.text_color}b3` }}>
                              {card.button_text} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                            </p>
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </Link>
                );
              })}

          </div>
        </div>
      </section>

      {/* 5. CONTACT SECTION */}"""
content = re.sub(cards_pattern, new_cards, content, flags=re.DOTALL)

with open('src/pages/Landing.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
