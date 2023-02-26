import Image from "next/image"
import Link from "next/link"

const Header = () => {
    return (
        <header className="flex items-center justify-between p-4 max-w-7xl mx-auto">
            <div className="flex items-center space-x-[29px]">
                <Link href='/'>
                    <Image width={35} height={50} className="object-contain cursor-pointer" src="https://www.veritas.edu.ng/images/logo-small.png" alt="" />
                </Link>
                {/* <ul className="hidden md:inline-flex space-x-5 items-center">
                    <li>About</li>
                    <li>Contact</li>
                </ul> */}
            </div>
            <div className="flex items-center space-x-5">
                <Link href='https://www.veritas.edu.ng/journals/vejoh.php' target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">Contact Us</Link>
                <div className="text-green-700 border border-green-900 hidden md:inline-flex px-4 py-1 rounded-lg hover:bg-green-900 hover:text-white">Submit a Manuscript</div>
            </div>
        </header>
    )
}

export default Header