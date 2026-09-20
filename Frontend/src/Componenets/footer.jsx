import React from 'react';

const Footer = () => {
    // Generate 24 film holes programmatically
    const filmHoles = Array.from({ length: 24 });

    return (
        <footer className="w-full bg-zinc-800 text-white font-serif border-t-2 border-zinc-800 mt-10">
            {/* Top Film Strip */}
            <div className="h-[22px] bg-zinc-950 flex items-center overflow-hidden">
                <div className="flex gap-[10px] px-[6px] w-full justify-around">
                    {filmHoles.map((_, index) => (
                        <div
                            key={`top-${index}`}
                            className="w-[12px] h-[9px] bg-[#e50914] rounded-[2px] opacity-80 shrink-0"
                        />
                    ))}
                </div>
            </div>

            {/* Main Footer Grid */}
            <div className="bg-[var(--page)] px-6 py-10 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 border-b border-zinc-900">
                {/* Brand + Address Column */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold tracking-wider text-[#e50914] uppercase mb-2 font-serif">
                        Movie Menia
                    </h2>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4 font-sans max-w-sm">
                        Your premier destination for the ultimate cinematic experience.
                    </p>
                    <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-3 flex gap-3 items-start max-w-md">
                        <div className="w-[38px] h-[22px] bg-zinc-800 border border-zinc-700 rounded flex items-center justify-center shrink-0 mt-[2px]">
                            <svg viewBox="0 0 26 16" fill="none" className="w-[26px] h-[16px]">
                                <rect x="1" y="1" width="24" height="14" rx="2" fill="#000000" stroke="#a1a1aa" strokeWidth="1" />
                                <path d="M8 1v14" stroke="#a1a1aa" strokeWidth="0.8" strokeDasharray="2,2" />
                                <path d="M18 1v14" stroke="#a1a1aa" strokeWidth="0.8" strokeDasharray="2,2" />
                                <text x="13" y="10" textAnchor="middle" fill="#ffffff" fontSize="4.5" fontFamily="Georgia,serif" fontWeight="bold">
                                    Movie Menia
                                </text>
                            </svg>
                        </div>
                        <div className="text-[0.7rem] text-gray-400 leading-relaxed font-sans">
                            <strong className="block text-[#e50914] text-xs mb-[2px]">
                                Movie Menia Studios Ltd.
                            </strong>
                            Ga-11B, Dallas GoFlan, Mohakhali School Road, Dhaka-1200 &bull; info@moviemenia.com
                        </div>
                    </div>
                </div>

                {/* Movie Booking */}
                <div className="font-sans">
                    <h4 className="text-xs uppercase tracking-widest text-[#e50914] font-bold mb-4">
                        Movie Booking
                    </h4>
                    <ul className="space-y-2 text-xs">
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Now Showing</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Coming Soon</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Book Tickets</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Offers and Promotions</a></li>
                    </ul>
                </div>

                {/* My Account */}
                <div className="font-sans">
                    <h4 className="text-xs uppercase tracking-widest text-[#e50914] font-bold mb-4">
                        My Account
                    </h4>
                    <ul className="space-y-2 text-xs">
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Booking History</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Sign In</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Register</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Favorites</a></li>
                    </ul>
                </div>

                {/* Policies */}
                <div className="font-sans">
                    <h4 className="text-xs uppercase tracking-widest text-[#e50914] font-bold mb-4">
                        Policies
                    </h4>
                    <ul className="space-y-2 text-xs">
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms and Conditions</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Data Safety</a></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="px-6 py-4 md:px-12 flex flex-wrap items-center justify-between gap-4 font-sans bg-[var(--page)]">
                {/* Social Icons */}
                <div className="flex gap-2">
                    {/* Facebook */}
                    <a
                        href="#"
                        className="w-8 h-8 rounded-full border border-[#e50914] bg-zinc-900 flex items-center justify-center text-gray-400 hover:bg-[#e50914] hover:border-white hover:text-black transition-colors duration-200"
                        aria-label="Facebook"
                    >
                        <svg className="w-[14px] h-[14px] fill-current" viewBox="0 0 24 24">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                    </a>

                    {/* Instagram */}
                    <a
                        href="#"
                        className="w-8 h-8 rounded-full border border-[#e50914] bg-zinc-900 flex items-center justify-center text-gray-400 hover:bg-[#e50914] hover:border-white hover:text-black transition-colors duration-200"
                        aria-label="Instagram"
                    >
                        <svg className="w-[14px] h-[14px] fill-current" viewBox="0 0 24 24">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                            <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                            <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                        </svg>
                    </a>

                    {/* LinkedIn */}
                    <a
                        href="#"
                        className="w-8 h-8 rounded-full border border-[#e50914] bg-zinc-900 flex items-center justify-center text-gray-400 hover:bg-[#e50914] hover:border-white hover:text-black transition-colors duration-200"
                        aria-label="LinkedIn"
                    >
                        <svg className="w-[14px] h-[14px] fill-current" viewBox="0 0 24 24">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                            <rect x="2" y="9" width="4" height="12" />
                            <circle cx="4" cy="4" r="2" />
                        </svg>
                    </a>

                    {/* YouTube */}
                    <a
                        href="#"
                        className="w-8 h-8 rounded-full border border-[#e50914] bg-zinc-900 flex items-center justify-center text-gray-400 hover:bg-[#e50914] hover:border-white hover:text-black transition-colors duration-200"
                        aria-label="YouTube"
                    >
                        <svg className="w-[14px] h-[14px] fill-current" viewBox="0 0 24 24">
                            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                            <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" className="fill-black" />
                        </svg>
                    </a>

                    {/* Twitter / X */}
                    <a
                        href="#"
                        className="w-8 h-8 rounded-full border border-[#e50914] bg-zinc-900 flex items-center justify-center text-gray-400 hover:bg-[#e50914] hover:border-white hover:text-black transition-colors duration-200"
                        aria-label="Twitter"
                    >
                        <svg className="w-[14px] h-[14px] fill-current" viewBox="0 0 24 24">
                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                        </svg>
                    </a>
                </div>

                <span className="text-[0.7rem] text-[#e50914] font-sans">
                    2026 &copy; CINEHALL
                </span>
            </div>

            {/* Bottom Film Strip */}
            <div className="h-[22px] bg-zinc-950 flex items-center overflow-hidden">
                <div className="flex gap-[10px] px-[6px] w-full justify-around">
                    {filmHoles.map((_, index) => (
                        <div
                            key={`bottom-${index}`}
                            className="w-[12px] h-[9px] bg-[#e50914] rounded-[2px] opacity-80 shrink-0"
                        />
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;