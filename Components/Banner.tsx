
const Banner = () => {
    return (
        <div className="bg-green-100 relative flex flex-col items-center w-full justify-center h-screen md:h-[400px] border-t border-b border-green-400">
            <div className="space-y-5 px-10">
                <h4 className="text-[14px] text-green-600 text-center">Unlocking Potential, Changing Lives</h4>
                <h2 className="text-6xl text-center">Journal of Humanities</h2>
                <p className="text-[19px] text-center">Discover our mission, impact, and stories as we strive to promote literacy and education for all.</p>
            </div>
            <a href="#posts" className="md:hidden absolute bottom-20 mx-auto border-2 border-black hover:border-green-800 hover:text-green-800 py-4 px-2 rounded-full text-black font-extrabold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                </svg>
            </a>
        </div>
    );
};

export default Banner;
