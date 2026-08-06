export interface SocialLink {
  key: 'github' | 'linkedin' | 'mail' | 'x'
  label: string
  href: string
}

// TODO: replace with real links.
export const socials: SocialLink[] = [
  { key: 'github', label: 'GitHub', href: '#' },
  { key: 'linkedin', label: 'LinkedIn', href: '#' },
  { key: 'mail', label: 'Email', href: 'mailto:adityakale4507@gmail.com' },
  { key: 'x', label: 'X', href: '#' },
]

export const contactEmail = 'adityakale4507@gmail.com'
