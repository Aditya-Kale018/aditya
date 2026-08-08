export interface SocialLink {
  key: 'github' | 'linkedin' | 'mail' | 'x'
  label: string
  href: string
}

// TODO: replace X with a real link.
export const socials: SocialLink[] = [
  { key: 'github', label: 'GitHub', href: 'https://github.com/Aditya-Kale018' },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/aditya-kale-6aa978314',
  },
  { key: 'mail', label: 'Email', href: 'mailto:aditya@aurelis-digital.com' },
  { key: 'x', label: 'X', href: '#' },
]

export const contactEmail = 'aditya@aurelis-digital.com'
