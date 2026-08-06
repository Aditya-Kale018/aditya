import { identity } from '../data/content'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="content-container flex flex-wrap items-center justify-between gap-3 px-3 py-6 text-[11.5px] tracking-[.06em] text-ink/40 uppercase sm:px-5 lg:px-7">
      <span>
        © {year} {identity.name}
      </span>
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="transition-colors duration-200 hover:text-ink"
      >
        Back to top ↑
      </a>
    </footer>
  )
}
