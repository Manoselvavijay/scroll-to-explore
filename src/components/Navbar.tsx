import Link from 'next/link';
import Image from 'next/image';

export function Navbar() {
    const links = [
        { name: 'Overview', href: '#intro' },
        { name: 'Internal', href: '#inside' },
        { name: 'Control', href: '#precision' },
        { name: 'Form', href: '#comfort' },
        { name: 'Specs', href: '#technology' },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference px-6 py-6 flex justify-between items-center pointer-events-none">
            <div className="pointer-events-auto">
                <Link href="/">
                    <Image
                        src="/scroll-logo.svg"
                        alt="Scroll Logo"
                        width={155}
                        height={60}
                        className="h-12 w-auto object-contain"
                        priority
                    />
                </Link>
            </div>

            <div className="hidden md:flex gap-8 pointer-events-auto">
                {links.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="text-white/70 hover:text-white text-sm uppercase tracking-wide transition-colors"
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
