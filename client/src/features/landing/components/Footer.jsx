import React from 'react';

const LINKS = [
    {
        heading: 'Shop',
        items: ['New Arrivals', 'Blazers', 'Tees', 'Trousers', 'Accessories'],
    },
    {
        heading: 'Company',
        items: ['Our Story', 'Careers', 'Press', 'Sustainability'],
    },
    {
        heading: 'Support',
        items: ['Size Guide', 'Track Order', 'Returns', 'Contact Us'],
    },
    {
        heading: 'Legal',
        items: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
    },
];

const SOCIALS = [
    { label: 'Instagram', href: 'https://instagram.com/snitch.co.in' },
    { label: 'Twitter / X', href: 'https://twitter.com/snitchco' },
    { label: 'YouTube', href: 'https://youtube.com' },
];

const Footer = () => (
    <footer className="footer" role="contentinfo">
        <div className="footer__top">
            {/* Brand */}
            <div className="footer__brand">
                <a href="/" className="footer__wordmark" aria-label="Snitch home">
                    Snitch
                </a>
                <p className="footer__tagline">
                    Premium menswear crafted for the bold Indian man.
                </p>
            </div>

            {/* Link columns */}
            <nav className="footer__links" aria-label="Footer navigation">
                {LINKS.map((col) => (
                    <div key={col.heading} className="footer__link-group">
                        <p className="footer__link-heading">{col.heading}</p>
                        {col.items.map((item) => (
                            <a key={item} href="#" className="footer__link">
                                {item}
                            </a>
                        ))}
                    </div>
                ))}
            </nav>

            {/* Social */}
            <div className="footer__social" aria-label="Social media links">
                {SOCIALS.map((s) => (
                    <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {s.label}
                    </a>
                ))}
            </div>
        </div>

        <div className="footer__bottom">
            <p className="footer__copy">
                © {new Date().getFullYear()} Snitch. All Rights Reserved.
            </p>
            <p className="footer__copy">Crafted with intention.</p>
        </div>
    </footer>
);

export default Footer;
