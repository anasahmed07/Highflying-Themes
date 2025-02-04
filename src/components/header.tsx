import { Circle, CircleUserRound, MenuIcon } from "lucide-react"
import Link from "next/link"

const Header = () => {
  return (
    <header className="flex justify-between p-5">
      <MenuIcon className="md:hidden"/>
      <Link href="/" className="text-xl sm:text-2xl font-bold hover:text-gray-300">Highflying Themes</Link>
      <nav className="hidden md:flex gap-7">
        <Link className="hover:text-gray-300" href="/themes">Themes</Link>
        <Link className="hover:text-gray-300" href="/upload-theme">Upload Theme</Link>
        <Link className="hover:text-gray-300" href="/about-us">About Us</Link>
        <Link className="hover:text-gray-300" href="/contact-us">Contact</Link>
      </nav>
      <Link className="hover:text-gray-300" href="/login-signup">
      <div className="hidden sm:flex">Signup/Login</div>
      <CircleUserRound className="sm:hidden"/>
      </Link>
    </header>
  )
}

export default Header