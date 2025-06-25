interface HeaderProps {
  name: string
  profileImage: string
}

const Header = ({ name, profileImage }: HeaderProps) => {
  return (
    <header className="header">
      <img src={profileImage} alt={name} className="profile-image" />
      <h1 className="name">{name}</h1>
    </header>
  )
}

export default Header