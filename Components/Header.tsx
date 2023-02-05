import Link from "next/link"

const Header = () => {
    return (
        <header className="flex items-center justify-between p-4 max-w-7xl mx-auto">
            <div className="flex items-center space-x-[29px]">
                <Link href='/'>
                    <img className="w-44 object-contain cursor-pointer" src="https://links.papareact.com/yvf" alt="" />
                </Link>
                <ul className="hidden md:inline-flex space-x-5 items-center">
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </div>
            <div className="flex items-center space-x-5">
                <div className="text-blue-700">Website</div>
                <div className="text-blue-700 border border-blue-900 px-4 py-1 rounded-full hover:bg-blue-900 hover:text-white">Support</div>
            </div>
        </header>
    )
}

export default Header