import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="block mb-6">
                            <img src="/logo.png" alt="Chigozie Media House" className="h-16 w-auto object-contain" />
                        </Link>
                        <p className="text-gray-400 text-sm mb-6">
                            Your ultimate destination for premium football news, transfer updates, and expert betting predictions.
                        </p>
                        <div className="flex space-x-4">
                            <SocialLink href="https://www.facebook.com/share/1CEcTbwBCj/?mibextid=wwXIfr" icon={<Facebook className="w-5 h-5" />} />
                            <SocialLink href="https://www.youtube.com/@chigoziemediahousesports" icon={<Youtube className="w-5 h-5" />} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-primary font-bold uppercase tracking-wider mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            <FooterLink href="/news" label="News" />
                            <FooterLink href="/live-scores" label="Live Scores" />
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-primary font-bold uppercase tracking-wider mb-6">Support</h3>
                        <ul className="space-y-3">
                            <FooterLink href="/contact" label="Contact Us" />
                            <FooterLink href="/membership" label="Membership" />
                            <FooterLink href="/terms" label="Terms of Service" />
                            <FooterLink href="/privacy" label="Privacy Policy" />
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-primary font-bold uppercase tracking-wider mb-6">Newsletter</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Subscribe to get the latest news and predictions delivered to your inbox.
                        </p>
                        <form className="flex flex-col space-y-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="bg-white/5 border border-white/10 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-primary text-black font-bold uppercase py-2 px-4 rounded hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
                            >
                                <Mail className="w-4 h-4" />
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Chigozie Media House. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            className="text-gray-400 hover:text-primary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
        >
            {icon}
        </a>
    );
}

function FooterLink({ href, label }: { href: string; label: string }) {
    return (
        <li>
            <Link href={href} className="text-gray-400 hover:text-white transition-colors text-sm">
                {label}
            </Link>
        </li>
    );
}
