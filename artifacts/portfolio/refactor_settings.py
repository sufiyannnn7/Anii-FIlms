import re

with open('src/pages/admin/Settings.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Logo block
logo_pattern = r'\{\/\* Logo file \*\/\}.*?(?=\{\/\* Favicon file \*\/\})'
logo_replacement = """{/* Logo file */}
                      <BannerImageUpload 
                        label="Brand Logo" 
                        value={logoUrl} 
                        onChange={setLogoUrl} 
                        bucket="thumbnails" 
                        aspectRatio="aspect-square w-20 h-20"
                      />
"""
content = re.sub(logo_pattern, logo_replacement, content, flags=re.DOTALL)

# Replace Favicon block
favicon_pattern = r'\{\/\* Favicon file \*\/\}.*?(?=\<\/div\>\s*\<\/div\>\s*\{\/\* 2\. HOMEPAGE TAB \*\/\})'
favicon_replacement = """{/* Favicon file */}
                      <BannerImageUpload 
                        label="Browser Tab Favicon" 
                        value={faviconUrl} 
                        onChange={setFaviconUrl} 
                        bucket="thumbnails" 
                        aspectRatio="aspect-square w-20 h-20"
                      />
"""
content = re.sub(favicon_pattern, favicon_replacement, content, flags=re.DOTALL)

# Replace Hero BG block
hero_bg_pattern = r'\{\/\* Hero BG \*\/\}.*?(?=\<\/div\>\s*\<\/div\>\s*\<\/div\>\s*\{\/\* 3\. ABOUT TAB \*\/\})'
# Actually, the comment for Hero BG in Settings.tsx is not "Hero BG", it's "<div className=\"flex flex-col gap-2\">\n                        <label className=\"text-[9px] uppercase tracking-[0.25em] text-foreground/60 font-bold\">Hero Background Image"
hero_bg_pattern = r'\<div className="flex flex-col gap-2"\>\s*\<label className="text-\[9px\] uppercase tracking-\[0\.25em\] text-foreground\/60 font-bold"\>Hero Background Image \(Optional override\)\<\/label\>.*?(?=\<\/div\>\s*\<\/div\>\s*\<\/div\>\s*\{\/\* 3\. ABOUT TAB \*\/\})'
hero_bg_replacement = """<BannerImageUpload 
                        label="Hero Background Image (Optional override)" 
                        value={heroBgUrl} 
                        onChange={setHeroBgUrl} 
                        bucket="hero-images" 
                        aspectRatio="aspect-[21/9]"
                      />"""
content = re.sub(hero_bg_pattern, hero_bg_replacement, content, flags=re.DOTALL)

# Replace Profile Photo block
profile_pattern = r'\{\/\* Profile Photo \*\/\}.*?(?=\{\/\* Resume file \*\/\})'
profile_replacement = """{/* Profile Photo */}
                      <BannerImageUpload 
                        label="Profile Photo Image" 
                        value={profilePhotoUrl} 
                        onChange={setProfilePhotoUrl} 
                        bucket="thumbnails" 
                        aspectRatio="aspect-square w-28 h-28"
                      />
"""
content = re.sub(profile_pattern, profile_replacement, content, flags=re.DOTALL)

# Replace Resume block
resume_pattern = r'\{\/\* Resume file \*\/\}.*?(?=\<\/div\>\s*\<\/div\>\s*\{\/\* 4\. CONTACT TAB \*\/\})'
resume_replacement = """{/* Resume file */}
                      <BannerImageUpload 
                        label="Resume (PDF/DOC/Image)" 
                        value={resumeUrl} 
                        onChange={setResumeUrl} 
                        bucket="gallery" 
                        aspectRatio="aspect-[3/4] w-24"
                      />
"""
content = re.sub(resume_pattern, resume_replacement, content, flags=re.DOTALL)

# Replace OG Image block
og_pattern = r'\{\/\* OG Image \*\/\}.*?(?=\<\/div\>\s*\<\/div\>\s*\{\/\* 7\. BANNERS \& SECTIONS TAB \*\/\})'
og_replacement = """{/* OG Image */}
                      <BannerImageUpload 
                        label="Open Graph Image (1200x630)" 
                        value={ogImageUrl} 
                        onChange={setOgImageUrl} 
                        bucket="thumbnails" 
                        aspectRatio="aspect-[1200/630] max-w-sm"
                      />
"""
content = re.sub(og_pattern, og_replacement, content, flags=re.DOTALL)


with open('src/pages/admin/Settings.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
