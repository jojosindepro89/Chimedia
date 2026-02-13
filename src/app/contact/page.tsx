"use client";

import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="bg-black min-h-screen pb-20">
            <div className="bg-zinc-900 border-b border-white/10 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold uppercase tracking-tighter text-white mb-4">Contact <span className="text-primary">Us</span></h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl">

                {/* Contact Form */}
                <div className="bg-zinc-900 border border-white/10 p-8 rounded-sm">
                    <h2 className="text-2xl font-bold text-white uppercase mb-6">Send a Message</h2>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Name</label>
                                <input type="text" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Your Name" />
                            </div>
                            <div>
                                <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Email</label>
                                <input type="email" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="your@email.com" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Subject</label>
                            <input type="text" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="How can we help?" />
                        </div>
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Message</label>
                            <textarea rows={6} className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Write your message here..."></textarea>
                        </div>
                        <button className="bg-primary text-black font-bold uppercase px-8 py-3 rounded hover:bg-yellow-500 transition-colors flex items-center gap-2">
                            <Send className="w-4 h-4" /> Send Message
                        </button>
                    </form>
                </div>

                {/* Info */}
                <div className="space-y-8">
                    <div className="bg-zinc-900 border border-white/10 p-8 rounded-sm flex items-start gap-6">
                        <div className="bg-primary/10 p-4 rounded-full">
                            <Mail className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white uppercase mb-2">Email Us</h3>
                            <p className="text-gray-400 mb-2">For general inquiries and support.</p>
                            <a href="mailto:support@chigoziemedia.com" className="text-primary font-bold hover:underline">support@chigoziemedia.com</a>
                        </div>
                    </div>

                    <div className="bg-zinc-900 border border-white/10 p-8 rounded-sm flex items-start gap-6">
                        <div className="bg-primary/10 p-4 rounded-full">
                            <Phone className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white uppercase mb-2">Call Us</h3>
                            <p className="text-gray-400 mb-2">Mon-Fri from 9am to 6pm GMT.</p>
                            <a href="tel:+1234567890" className="text-primary font-bold hover:underline">+234 (0) 123 456 7890</a>
                        </div>
                    </div>

                    <div className="bg-zinc-900 border border-white/10 p-8 rounded-sm flex items-start gap-6">
                        <div className="bg-primary/10 p-4 rounded-full">
                            <MapPin className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white uppercase mb-2">Visit Us</h3>
                            <p className="text-gray-400">
                                123 Victoria Island,<br />
                                Lagos, Nigeria.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
