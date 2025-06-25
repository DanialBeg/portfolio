interface SocialLink {
  href: string
  label: string
  icon: React.ReactNode
}

interface SocialLinksProps {
  links: SocialLink[]
}

const SocialLinks = ({ links }: SocialLinksProps) => {
  return (
    <div className="links-grid">
      {links.map((link, index) => (
        <a 
          key={index}
          href={link.href} 
          className="link"
          target={link.href.startsWith('mailto:') ? undefined : "_blank"}
          rel={link.href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
        >
          {link.icon}
          {link.label}
        </a>
      ))}
    </div>
  )
}

export default SocialLinks